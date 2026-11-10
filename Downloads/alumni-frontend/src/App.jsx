import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './context.js';
import { useStored } from './data/store.js';
import StudentProfile from './pages/StudentProfile.jsx';
import StudentView from './pages/StudentView.jsx';
import AlumniProfile from './pages/AlumniProfile.jsx';
import Directory from './pages/Directory.jsx';
import CompanyPage from './pages/CompanyPage.jsx';

export default function App() {
  // En attendant l'authentification : le rôle est simulé ici.
  const [role, setRole] = useStored('al48.role', 'student');

  return (
    <AppContext.Provider value={{ role }}>
      <header className="topbar">
        <strong className="brand">Alumni</strong>
        <nav aria-label="Navigation principale">
          <NavLink to="/profil">Mon profil et CV</NavLink>
          <NavLink to="/annuaire">Annuaire</NavLink>
        </nav>
        <label className="role">
          Vue en tant que
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Étudiant</option>
            <option value="alumni">Alumni</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/profil" replace />} />
          <Route path="/profil" element={<StudentProfile />} />
          <Route path="/annuaire" element={<Directory />} />
          <Route path="/etudiants/:id" element={<StudentView />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/entreprises/:id" element={<CompanyPage />} />
          <Route path="*" element={<p>Page introuvable.</p>} />
        </Routes>
      </main>
    </AppContext.Provider>
  );
}
