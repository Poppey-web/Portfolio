export const portfolioData = {
  profile: {
    name: "Nils Cattiaux-Truelle",
    role: "Chargé de Production Événementielle & Régie Générale",
    heroTitle: "PILOTAGE DE PRODUCTION ÉVÉNEMENTIELLE.",
    heroSubtitle: "Expertise technique et rigueur opérationnelle pour projets complexes. Orienté résultats, je transforme les contraintes logistiques en succès d'exécution.",
    bioTitle: "FIABILITÉ & VISION LONG TERME.",
    bioText: [
      "Ma rigueur opérationnelle s'appuie sur une discipline personnelle que j'applique au quotidien, notamment dans la gestion de mes investissements. Cette habitude de l'analyse et de la gestion du risque, consolidée par l'exigence de mentors comme Ambroise Soulé et Maxime Hernandez, me permet d'aborder chaque projet avec méthode. Mon objectif est simple : transformer la complexité logistique en une exécution fluide, en plaçant la sécurité et l'optimisation des ressources au cœur de ma démarche."
    ],
    professionalEngagement: [
      { label: "Disponibilité", value: "Europe / International" },
      { label: "Formation", value: "Mentorat Soulé & Hernandez" },
      { label: "Terrain", value: "Melbourne Convention Center" }
    ],
    expertise: {
      title: "RIGUEUR TECHNIQUE.",
      description: "Précision technique et rigueur opérationnelle au service de la production. Je privilégie une organisation structurée pour gérer les flux et les imprévus, garantissant ainsi une exécution impeccable du montage à l'exploitation.",
      skills: [
        { label: "Crisis Management" },
        { label: "Budget Oversight" },
        { label: "Technical Rigor" },
        { label: "Risk Mitigation" },
        { label: "Stakeholder Management" },
        { label: "Operational Excellence" }
      ]
    },
    technicalSkills: [
      { label: "AutoCAD (CAO)" },
      { label: "Gestion des flux (10k m²+)" },
      { label: "Protocoles OH&S / Sécurité" },
      { label: "White Card & RSA (Australie)" },
      { label: "Suite Adobe" }
    ],
    highlightTerms: ["AutoCAD", "OH&S", "Melbourne", "White Card", "RSA"],
    mentors: [
      { name: "Ambroise Soulé" },
      { name: "Maxime Hernandez" }
    ],
    projectsTitle: "PROJETS",
    projectsSubtitle: "Sélection de réalisations // 2023-2026",
    contact: {
      title: "REJOINDRE LE RÉSEAU.",
      email: "nilscattiauxtruelle@gmail.com",
      linkedin: "https://www.linkedin.com/in/nils-cattiaux-truelle-b37964187/",
      phone: "+33 7 63 35 63 63",
      cvUrl: "#"
    },
    ui: {
      nav: {
        projects: "Projets",
        expertise: "Expertise",
        about: "Bio",
        cv: "CV"
      },
      hero: {
        cta: "Voir les projets"
      },
      projects: {
        filterAll: "Tous",
        viewProject: "Voir le projet",
        roleLabel: "Rôle:",
        statsTitle: "En chiffres",
        jaugeLabel: "Jauge",
        budgetLabel: "Budget",
        staffLabel: "Staff"
      },
      about: {
        mentorsTitle: "Formé par",
        mentorPrefix: "Mentor // 0"
      },
      footer: {
        emailLabel: "Email",
        linkedinLabel: "LinkedIn",
        copyrightPrefix: "© 2026",
        adminLabel: "Admin"
      },
      common: {
        imageNotAvailable: "Image non disponible",
        loginTitle: "Accès Administrateur",
        loginSubtitle: "Nils Cattiaux-Truelle // Portfolio",
        loginEmailLabel: "Email",
        loginPasswordLabel: "Mot de passe",
        loginButton: "Se connecter",
        loginError: "Identifiants incorrects. Veuillez réessayer.",
        loginBack: "Retour au site"
      }
    }
  },
  projects: [
    {
      id: '1',
      title: 'Planit Installation',
      category: 'Exposition',
      image: 'https://images.unsplash.com/photo-1582653280643-e395af6195aa?q=80&w=2070&auto=format&fit=crop',
      description: "8 mois à Melbourne au sein de Planit Installation. Rigging technique et logistique de site pour des expositions internationales de grande envergure au Melbourne Convention Center.\n\n• Montage de structures 10 000m²+\n• Lecture de plans AutoCAD complexes\n• Application stricte des protocoles OH&S",
      role: 'Responsable Logistique & Montage',
      link: '#',
      kpis: { jauge: '7000+ Visiteurs', budget: 'Optimisé -10%', staff: '25 Techniciens' },
      year: '2025',
      location: 'Melbourne, Australie'
    },
    {
      id: '2',
      title: 'Némésis',
      category: 'Grand Public',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
      description: 'Régie générale et ingénierie des flux pour un événement à forte affluence. Mise en place d\'un plan de sécurité civile et coordination des secours.',
      role: 'Régisseur Général',
      link: '#',
      kpis: { jauge: '7000+ Personnes', budget: 'Budget Oversight', staff: '40 Staff' },
      year: '2024',
      location: 'France'
    },
    {
      id: '3',
      title: 'Spring Break Timevent',
      category: 'Logistique Étudiante',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
      description: "Représentant École & Relais Opérationnel. Point de contact stratégique entre l'organisation logistique et les participants (milliers d'étudiants). Gestion des flux, réactivité terrain et coordination des imprévus.",
      role: 'Représentant École & Relais Opérationnel',
      link: '#',
      kpis: { jauge: 'Milliers d\'étudiants', budget: 'Coordination', staff: 'Relais Terrain' },
      year: '2023',
      location: 'Espagne / France'
    }
  ]
};
