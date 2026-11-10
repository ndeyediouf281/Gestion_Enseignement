import { createContext, useContext } from 'react';

export const AppContext = createContext({ role: 'student' });
export const useApp = () => useContext(AppContext);

// Identifiant de l'alumni "connecté" dans la démo
export const ALUMNI_ME = 'a1';
