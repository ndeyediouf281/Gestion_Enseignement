import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { alumni, companies, PROMOS } from '../data/mock.js';
import { useStored } from '../data/store.js';
import { useApp } from '../context.js';

export default function CompanyPage() {
  const { id } = useParams();
  const { role } = useApp();
  const company = companies.find((c) => c.id === id);
  // { [companyId]: [promo, ...] } – surcharge locale de la liste des promotions
  const [promos, setPromos] = useStored('al48.companyPromos', {});
  const [pick, setPick] = useState('');

  if (!company) return <p>Entreprise introuvable. <Link to="/annuaire">Retour à l'annuaire</Link></p>;

  const list = promos[id] || company.promotions;
  const employees = alumni.filter((a) => a.companyId === id);
  const isAdmin = role === 'admin';
  const available = PROMOS.filter((p) => !list.includes(p));

  const save = (next) => setPromos({ ...promos, [id]: next });

  return (
    <article className="panel narrow">
      <Link to="/annuaire">← Annuaire</Link>
      <h1>{company.name}</h1>
      <p className="muted">{company.sector} · {company.city}</p>
      <p>{company.description}</p>

      <h2>Alumni dans l'entreprise</h2>
      {employees.length === 0 ? (
        <p className="muted">Aucun alumni renseigné pour le moment.</p>
      ) : (
        <ul className="plain">
          {employees.map((a) => (
            <li key={a.id}><Link to={`/alumni/${a.id}`}>{a.name}</Link> – {a.role}</li>
          ))}
        </ul>
      )}

      <h2>Promotions liées</h2>
      <div className="tags">
        {list.map((p) => (
          <span className="tag" key={p}>
            {p}
            {isAdmin && <button type="button" aria-label={`Retirer ${p}`} onClick={() => save(list.filter((x) => x !== p))}>×</button>}
          </span>
        ))}
        {list.length === 0 && <span className="muted">Aucune promotion liée.</span>}
      </div>

      {isAdmin && (
        <div className="row">
          <select aria-label="Promotion à ajouter" value={pick} onChange={(e) => setPick(e.target.value)}>
            <option value="">Choisir une promotion</option>
            {available.map((p) => <option key={p}>{p}</option>)}
          </select>
          <button className="btn" disabled={!pick} onClick={() => { save([...list, pick]); setPick(''); }}>Ajouter la promotion</button>
        </div>
      )}
    </article>
  );
}
