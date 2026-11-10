import { useState, useEffect } from 'react';

// Persistance locale en attendant le backend (alumni-student-company-service).
// Pour brancher l'API : remplacer ces hooks par des appels fetch(`${import.meta.env.VITE_API_URL}/...`).
export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [key, value]);
  return [value, setValue];
}

export const uid = () => Math.random().toString(36).slice(2, 9);
