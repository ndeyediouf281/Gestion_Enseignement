import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { alumni } from '../data/mock.js';
import { useStored, uid } from '../data/store.js';
import { useApp, ALUMNI_ME } from '../context.js';

export default function AlumniProfile() {
  const { id } = useParams();
  const { role } = useApp();
  const base = alumni.find((a) => a.id === id);
  const [extra, setExtra] = useStored('al48.extraSteps', {});
  const [draft, setDraft] = useState({ year: '', title: '', company: '' });

  if (!base) return <p>Alumni introuvable. <Link to="/annuaire">Retour à l'annuaire</Link></p>;

  const path = [...base.path, ...(extra[id] || [])].sort((a, b) => a.year.localeCompare(b.year));
  const canEdit = role === 'alumni' && id === ALUMNI_ME;

  const add = (e) => {
    e.preventDefault();
    if (!draft.year || !draft.title) return;
    setExtra({ ...extra, [id]: [...(extra[id] || []), { id: uid(), ...draft }] });
    setDraft({ year: '', title: '', company: '' });
  };

  return (
    <article className="panel narrow">
      <Link to="/annuaire">← Annuaire</Link>
      <h1>{base.name}</h1>
      <p className="muted">
        {base.role} chez <Link to={`/entreprises/${base.companyId}`}>{base.company}</Link> · promotion {base.promo}
      </p>
      <p>{base.bio}</p>

      <h2>Parcours professionnel</h2>
      <ol className="timeline">
        {path.map((s) => (
          <li key={s.id}>
            <span className="year">{s.year}</span>
            <strong>{s.title}</strong>
            {s.company && <span className="muted"> – {s.company}</span>}
          </li>
        ))}
      </ol>

      {canEdit && (
        <form className="item" onSubmit={add}>
          <h3>Ajouter une étape</h3>
          <input aria-label="Année" placeholder="Année" value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} />
          <input aria-label="Poste" placeholder="Poste" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <input aria-label="Entreprise" placeholder="Entreprise" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
          <button className="btn">Ajouter au parcours</button>
        </form>
      )}
    </article>
  );
}
