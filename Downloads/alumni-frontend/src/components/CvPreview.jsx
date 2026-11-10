import { forwardRef } from 'react';

export const LANGS = [
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
  { id: 'zh', label: '中文 (chinois)' },
];

export const TEMPLATES = [
  { id: 'classique', label: 'Classique' },
  { id: 'moderne', label: 'Moderne' },
  { id: 'sobre', label: 'Sobre' },
];

const T = {
  fr: { name: 'Votre nom', profile: 'Profil', exp: 'Expériences', edu: 'Formation', skills: 'Compétences', interests: "Centres d'intérêt", avail: 'Disponibilité' },
  en: { name: 'Your name', profile: 'Profile', exp: 'Experience', edu: 'Education', skills: 'Skills', interests: 'Interests', avail: 'Availability' },
  zh: { name: '您的姓名', profile: '个人简介', exp: '工作经历', edu: '教育背景', skills: '技能', interests: '兴趣爱好', avail: '可用时间' },
};

// Aperçu du CV au format A4. C'est cet élément qui est exporté en PDF.
const CvPreview = forwardRef(function CvPreview({ profile }, ref) {
  const {
    name, email, promo, availability, summary,
    skills = [], interests = [], experiences = [], education = [],
    lang = 'fr', template = 'classique',
  } = profile;
  const t = T[lang] || T.fr;

  return (
    <div className={`cv cv-${template}`} lang={lang} ref={ref}>
      <header>
        <h1>{name || t.name}</h1>
        <p className="cv-meta">{[email, promo, availability && `${t.avail} : ${availability}`].filter(Boolean).join('  |  ')}</p>
      </header>

      {summary && (
        <section>
          <h2>{t.profile}</h2>
          <p>{summary}</p>
        </section>
      )}
      {experiences.length > 0 && (
        <section>
          <h2>{t.exp}</h2>
          {experiences.map((e) => (
            <div className="cv-item" key={e.id}>
              <strong>{e.title}</strong> – {e.org} <span>{e.period}</span>
              {e.desc && <p>{e.desc}</p>}
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section>
          <h2>{t.edu}</h2>
          {education.map((e) => (
            <div className="cv-item" key={e.id}>
              <strong>{e.title}</strong> – {e.org} <span>{e.period}</span>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section>
          <h2>{t.skills}</h2>
          <p>{skills.join(', ')}</p>
        </section>
      )}
      {interests.length > 0 && (
        <section>
          <h2>{t.interests}</h2>
          <p>{interests.join(', ')}</p>
        </section>
      )}
    </div>
  );
});

export default CvPreview;
