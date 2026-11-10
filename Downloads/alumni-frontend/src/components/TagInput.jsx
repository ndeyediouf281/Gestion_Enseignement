import { useState } from 'react';

export default function TagInput({ label, value, onChange, placeholder }) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft('');
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className="tags">
        {value.map((t) => (
          <span className="tag" key={t}>
            {t}
            <button type="button" aria-label={`Retirer ${t}`} onClick={() => onChange(value.filter((x) => x !== t))}>×</button>
          </span>
        ))}
      </div>
      <div className="row">
        <input
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn ghost" onClick={add}>Ajouter</button>
      </div>
    </div>
  );
}
