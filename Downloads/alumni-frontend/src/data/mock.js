export const students = [
  { id: 's1', name: 'Awa Diallo', promo: 'M2 2026', skills: ['React', 'Node.js', 'SQL'], interests: ['Fintech', 'IA'], availability: 'Stage dès avril 2027', summary: 'Étudiante en M2 informatique, passionnée par les produits web utiles.' },
  { id: 's2', name: 'Moussa Sow', promo: 'M2 2026', skills: ['Java', 'Spring', 'Docker'], interests: ['Cloud', 'DevOps'], availability: 'Disponible immédiatement', summary: 'Profil backend orienté industrialisation et déploiement.' },
  { id: 's3', name: 'Fatou Ndiaye', promo: 'M1 2027', skills: ['Python', 'Pandas', 'Power BI'], interests: ['Data', 'Santé'], availability: 'Alternance dès septembre', summary: 'Je cherche une alternance en analyse de données.' },
  { id: 's4', name: 'Ibrahima Faye', promo: 'L3 2027', skills: ['HTML/CSS', 'JavaScript', 'Figma'], interests: ['UX', 'Mobile'], availability: 'Stage été 2027', summary: "À l'aise entre design et intégration." },
];

export const alumni = [
  {
    id: 'a1', name: 'Mariama Camara', promo: 'M2 2021', company: 'Orange Digital', companyId: 'c1', role: 'Ingénieure logiciel senior', sector: 'Télécoms',
    bio: 'Je mentore les étudiants qui visent les métiers du développement.',
    path: [
      { id: 'p1', year: '2021', title: 'Développeuse junior', company: 'Orange Digital' },
      { id: 'p2', year: '2023', title: 'Développeuse confirmée', company: 'Orange Digital' },
      { id: 'p3', year: '2025', title: 'Ingénieure logiciel senior', company: 'Orange Digital' },
    ],
  },
  {
    id: 'a2', name: 'Cheikh Ba', promo: 'M2 2019', company: 'Wave', companyId: 'c2', role: 'Data engineer', sector: 'Fintech',
    bio: 'Passé par le conseil avant de rejoindre la fintech.',
    path: [
      { id: 'p4', year: '2019', title: 'Consultant data', company: 'Capgemini' },
      { id: 'p5', year: '2022', title: 'Data engineer', company: 'Wave' },
    ],
  },
  {
    id: 'a3', name: 'Aïssatou Gueye', promo: 'M2 2020', company: 'Sonatel', companyId: 'c3', role: 'Cheffe de projet SI', sector: 'Télécoms',
    bio: 'Gestion de projets SI et transformation digitale.',
    path: [
      { id: 'p6', year: '2020', title: 'Analyste SI', company: 'Sonatel' },
      { id: 'p7', year: '2024', title: 'Cheffe de projet SI', company: 'Sonatel' },
    ],
  },
];

export const companies = [
  { id: 'c1', name: 'Orange Digital', sector: 'Télécoms', city: 'Dakar', description: 'Services numériques et innovation pour le groupe Orange.', promotions: ['M2 2021', 'M2 2023'] },
  { id: 'c2', name: 'Wave', sector: 'Fintech', city: 'Dakar', description: 'Paiement mobile et services financiers.', promotions: ['M2 2019', 'M2 2022'] },
  { id: 'c3', name: 'Sonatel', sector: 'Télécoms', city: 'Dakar', description: 'Opérateur de télécommunications.', promotions: ['M2 2020'] },
];

export const PROMOS = ['L3 2027', 'M1 2027', 'M2 2026', 'M2 2023', 'M2 2022', 'M2 2021', 'M2 2020', 'M2 2019'];
