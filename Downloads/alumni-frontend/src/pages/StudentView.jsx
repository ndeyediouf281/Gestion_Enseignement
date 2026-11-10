import { Link, useParams } from 'react-router-dom';
import { students } from '../data/mock.js';
import { useStored } from '../data/store.js';
import { useApp, ALUMNI_ME } from '../context.js';
import CvPreview from '../components/CvPreview.jsx';

export default function StudentView() {
  const { id } = useParams();
  const { role } = useApp();
  const [me] = useStored('al48.myProfile', null);
  const isMe = id === 'me';
  const student = isMe
    ? me && me.publishCv
      ? { id: 'me', name: me.name, promo: me.promo, skills: me.publishSkills ? me.skills || [] : [], interests: me.interests || [], availability: me.availability, summary: me.summary }
      : null
    : students.find((s) => s.id === id);
  // { [studentId]: [alumniId, ...] }
  const [recos, setRecos] = useStored('al48.recommendations', {});

  if (!student) return <p>Étudiant introuvable. <Link to="/annuaire">Retour à l'annuaire</Link></p>;

  const list = recos[student.id] || [];
  const done = list.includes(ALUMNI_ME);
  const toggle = () =>
    setRecos({ ...recos, [student.id]: done ? list.filter((a) => a !== ALUMNI_ME) : [...list, ALUMNI_ME] });

  return (
    <article className="panel narrow">
      <Link to="/annuaire">← Annuaire</Link>
      <h1>{student.name}</h1>
      <p className="muted">{student.promo} · {student.availability}</p>
      <p>{student.summary}</p>
      <h3>Compétences</h3>
      <div className="tags">{student.skills.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      <h3>Centres d'intérêt</h3>
      <div className="tags">{student.interests.map((t) => <span className="tag" key={t}>{t}</span>)}</div>

      {isMe && (
        <>
          <h3>CV</h3>
          <div className="sheet"><CvPreview profile={me} /></div>
        </>
      )}

      <div className="actions">
        {role === 'alumni' ? (
          <button className={`btn ${done ? 'ghost' : 'accent'}`} onClick={toggle} aria-pressed={done}>
            {done ? 'Recommandation envoyée – annuler' : 'Recommander'}
          </button>
        ) : (
          <p className="muted">Seuls les alumni peuvent recommander un étudiant.</p>
        )}
        <span className="muted">{list.length} recommandation{list.length > 1 ? 's' : ''}</span>
      </div>
    </article>
  );
}
