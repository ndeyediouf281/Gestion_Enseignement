import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { students as baseStudents, alumni, companies, PROMOS } from '../data/mock.js';
import { useStored } from '../data/store.js';

const TABS = [
  { id: 'students', label: 'Étudiants' },
  { id: 'alumni', label: 'Alumni' },
  { id: 'companies', label: 'Entreprises' },
];

const uniq = (arr) => [...new Set(arr)].sort();

export default function Directory() {
  const [me] = useStored('al48.myProfile', null);
  const students = useMemo(
    () => [
      ...baseStudents,
      ...(me && me.publishCv && me.name
        ? [{ id: 'me', name: me.name, promo: me.promo, skills: me.publishSkills ? me.skills || [] : [], interests: me.interests || [], availability: me.availability || 'Disponibilité non précisée', summary: me.summary }]
        : []),
    ],
    [me]
  );
  const [tab, setTab] = useState('students');
  const [q, setQ] = useState('');
  const [f1, setF1] = useState(''); // promo (étudiants/alumni) ou secteur (entreprises)
  const [f2, setF2] = useState(''); // compétence (étudiants), secteur (alumni), ville (entreprises)

  const switchTab = (id) => { setTab(id); setQ(''); setF1(''); setF2(''); };

  const filters = {
    students: [
      { label: 'Promotion', value: f1, set: setF1, options: PROMOS },
      { label: 'Compétence', value: f2, set: setF2, options: uniq(students.flatMap((s) => s.skills)) },
    ],
    alumni: [
      { label: 'Promotion', value: f1, set: setF1, options: uniq(alumni.map((a) => a.promo)) },
      { label: 'Secteur', value: f2, set: setF2, options: uniq(alumni.map((a) => a.sector)) },
    ],
    companies: [
      { label: 'Secteur', value: f1, set: setF1, options: uniq(companies.map((c) => c.sector)) },
      { label: 'Ville', value: f2, set: setF2, options: uniq(companies.map((c) => c.city)) },
    ],
  }[tab];

  const results = useMemo(() => {
    const text = q.trim().toLowerCase();
    const has = (...parts) => !text || parts.join(' ').toLowerCase().includes(text);
    if (tab === 'students')
      return students
        .filter((s) => has(s.name, s.skills.join(' '), s.interests.join(' ')) && (!f1 || s.promo === f1) && (!f2 || s.skills.includes(f2)))
        .map((s) => ({ id: s.id, to: `/etudiants/${s.id}`, title: s.name, sub: `${s.promo} · ${s.availability}`, tags: s.skills }));
    if (tab === 'alumni')
      return alumni
        .filter((a) => has(a.name, a.company, a.role) && (!f1 || a.promo === f1) && (!f2 || a.sector === f2))
        .map((a) => ({ id: a.id, to: `/alumni/${a.id}`, title: a.name, sub: `${a.role} · ${a.company}`, tags: [a.promo, a.sector] }));
    return companies
      .filter((c) => has(c.name, c.description) && (!f1 || c.sector === f1) && (!f2 || c.city === f2))
      .map((c) => ({ id: c.id, to: `/entreprises/${c.id}`, title: c.name, sub: c.description, tags: [c.sector, c.city] }));
  }, [tab, q, f1, f2, students]);

  return (
    <section className="panel">
      <h1>Annuaire</h1>
      <div role="tablist" className="tabs">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'on' : ''} onClick={() => switchTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="row filters">
        <input type="search" aria-label="Rechercher" placeholder="Rechercher par nom, entreprise, compétence…" value={q} onChange={(e) => setQ(e.target.value)} className="grow" />
        {filters.map((f) => (
          <select key={f.label} aria-label={f.label} value={f.value} onChange={(e) => f.set(e.target.value)}>
            <option value="">{f.label} : toutes</option>
            {f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      <p className="muted" role="status">{results.length} résultat{results.length > 1 ? 's' : ''}</p>
      {results.length === 0 && <p>Aucun résultat. Retirez un filtre ou modifiez votre recherche.</p>}
      <ul className="cards">
        {results.map((r) => (
          <li key={r.id}>
            <Link to={r.to}><strong>{r.title}</strong></Link>
            <span className="muted">{r.sub}</span>
            <div className="tags">{r.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
