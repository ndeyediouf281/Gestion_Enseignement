import { useRef, useState } from 'react';
import { useStored, uid } from '../data/store.js';
import { PROMOS } from '../data/mock.js';
import TagInput from '../components/TagInput.jsx';
import CvPreview, { LANGS, TEMPLATES } from '../components/CvPreview.jsx';

const EMPTY = {
  name: '', email: '', promo: 'M2 2026', availability: '', summary: '',
  skills: [], interests: [], experiences: [], education: [],
  lang: 'fr', template: 'classique', publishCv: false, publishSkills: false, updatedAt: '',
};

export default function StudentProfile() {
  const [stored, setProfile] = useStored('al48.myProfile', EMPTY);
  const profile = { ...EMPTY, ...stored }; // complète les anciens profils enregistrés
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const cvRef = useRef(null);

  const set = (patch) => {
    setProfile((p) => ({ ...p, ...patch }));
    setStatus('');
  };
  const setItem = (list, id, patch) =>
    set({ [list]: profile[list].map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  const addItem = (list, blank) => set({ [list]: [...profile[list], { id: uid(), ...blank }] });
  const removeItem = (list, id) => set({ [list]: profile[list].filter((i) => i.id !== id) });

  const missing = !profile.name.trim() || !/^\S+@\S+\.\S+$/.test(profile.email);

  const downloadPdf = async () => {
    if (missing) {
      setStatus('Renseignez votre nom et un e-mail valide pour télécharger le CV.');
      return;
    }
    setBusy(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `CV-${profile.name.trim().replace(/\s+/g, '-')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(cvRef.current)
        .save();
      setStatus('CV téléchargé.');
    } catch {
      setStatus("Le téléchargement a échoué. Réessayez dans un instant.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="split">
      <form className="panel" onSubmit={(e) => {
        e.preventDefault();
        setProfile((p) => ({ ...p, updatedAt: new Date().toISOString() }));
        setStatus('CV mis à jour.');
      }}>
        <h1>Mon profil et mon CV</h1>

        <fieldset>
          <legend>Profil étudiant</legend>
          <div className="field">
            <label htmlFor="name">Nom complet</label>
            <input id="name" value={profile.name} onChange={(e) => set({ name: e.target.value })} required />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" value={profile.email} onChange={(e) => set({ email: e.target.value })} required />
          </div>
          <div className="row">
            <div className="field grow">
              <label htmlFor="promo">Promotion</label>
              <select id="promo" value={profile.promo} onChange={(e) => set({ promo: e.target.value })}>
                {PROMOS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field grow">
              <label htmlFor="avail">Disponibilité</label>
              <input id="avail" value={profile.availability} placeholder="Stage dès avril 2027" onChange={(e) => set({ availability: e.target.value })} />
            </div>
          </div>
          <TagInput label="Compétences" value={profile.skills} onChange={(skills) => set({ skills })} placeholder="React, SQL…" />
          <TagInput label="Centres d'intérêt" value={profile.interests} onChange={(interests) => set({ interests })} placeholder="IA, fintech…" />
        </fieldset>

        <fieldset>
          <legend>Modèle du CV</legend>
          <div className="row">
            <div className="field grow">
              <label htmlFor="lang">Langue du CV</label>
              <select id="lang" value={profile.lang} onChange={(e) => set({ lang: e.target.value })}>
                {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
            <div className="field grow">
              <label htmlFor="tpl">Template</label>
              <select id="tpl" value={profile.template} onChange={(e) => set({ template: e.target.value })}>
                {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <p className="muted">Les titres de section du CV suivent la langue choisie. Le contenu reste celui que vous saisissez.</p>
        </fieldset>

        <fieldset>
          <legend>Contenu du CV</legend>
          <div className="field">
            <label htmlFor="summary">Résumé</label>
            <textarea id="summary" rows="3" value={profile.summary} onChange={(e) => set({ summary: e.target.value })} />
          </div>

          <h3>Expériences</h3>
          {profile.experiences.map((x) => (
            <div className="item" key={x.id}>
              <input aria-label="Poste" placeholder="Poste" value={x.title} onChange={(e) => setItem('experiences', x.id, { title: e.target.value })} />
              <input aria-label="Organisation" placeholder="Organisation" value={x.org} onChange={(e) => setItem('experiences', x.id, { org: e.target.value })} />
              <input aria-label="Période" placeholder="Période (2025 – 2026)" value={x.period} onChange={(e) => setItem('experiences', x.id, { period: e.target.value })} />
              <textarea aria-label="Description" rows="2" placeholder="Missions et résultats" value={x.desc} onChange={(e) => setItem('experiences', x.id, { desc: e.target.value })} />
              <button type="button" className="btn link" onClick={() => removeItem('experiences', x.id)}>Supprimer cette expérience</button>
            </div>
          ))}
          <button type="button" className="btn ghost" onClick={() => addItem('experiences', { title: '', org: '', period: '', desc: '' })}>Ajouter une expérience</button>

          <h3>Formation</h3>
          {profile.education.map((x) => (
            <div className="item" key={x.id}>
              <input aria-label="Diplôme" placeholder="Diplôme" value={x.title} onChange={(e) => setItem('education', x.id, { title: e.target.value })} />
              <input aria-label="Établissement" placeholder="Établissement" value={x.org} onChange={(e) => setItem('education', x.id, { org: e.target.value })} />
              <input aria-label="Période" placeholder="Période" value={x.period} onChange={(e) => setItem('education', x.id, { period: e.target.value })} />
              <button type="button" className="btn link" onClick={() => removeItem('education', x.id)}>Supprimer cette formation</button>
            </div>
          ))}
          <button type="button" className="btn ghost" onClick={() => addItem('education', { title: '', org: '', period: '' })}>Ajouter une formation</button>
        </fieldset>

        <fieldset>
          <legend>Publication</legend>
          <label className="check">
            <input type="checkbox" checked={profile.publishCv} onChange={(e) => set({ publishCv: e.target.checked })} />
            Publier mon CV (visible dans l'annuaire)
          </label>
          <label className="check">
            <input type="checkbox" checked={profile.publishSkills} onChange={(e) => set({ publishSkills: e.target.checked })} />
            Publier mes compétences
          </label>
          <p className="muted">
            {profile.publishCv ? 'Votre CV est publié.' : 'Votre CV est privé.'}{' '}
            {profile.updatedAt && `Dernière mise à jour : ${new Date(profile.updatedAt).toLocaleString('fr-FR')}.`}
          </p>
        </fieldset>

        <div className="actions">
          <button type="submit" className="btn">Mettre à jour mon CV</button>
          <button type="button" className="btn accent" onClick={downloadPdf} disabled={busy}>
            {busy ? 'Génération…' : 'Télécharger le CV en PDF'}
          </button>
        </div>
        <p role="status" className="status">{status}</p>
      </form>

      <aside className="preview" aria-label="Aperçu du CV">
        <h2>Aperçu</h2>
        <div className="sheet"><CvPreview ref={cvRef} profile={profile} /></div>
      </aside>
    </div>
  );
}
