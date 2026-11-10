# Alumni – Frontend (AL-48)

Écrans profils, éditeur de CV, annuaire et fiches entreprise.

## Lancer

    npm install
    npm run dev

## Écrans

- `/profil` : profil étudiant (compétences, intérêts, disponibilité) + éditeur de CV avec aperçu et téléchargement PDF
- `/alumni/:id` : profil Alumni et parcours professionnel
- `/annuaire` : recherche étudiants / alumni / entreprises avec filtres
- `/entreprises/:id` : fiche entreprise, gestion des promotions (rôle admin)
- `/etudiants/:id` : bouton « Recommander » (rôle alumni)

Les données sont simulées (`src/data`) et stockées en localStorage. Le rôle se change en haut à droite.
Pour brancher le backend `alumni-student-company-service`, remplacer `useStored` par des appels API (`VITE_API_URL`).
