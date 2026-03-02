export const portfolioData = {
  profile: {
    name: "Nils Cattiaux-Truelle",
    role: "ASSISTANCE À LA COORDINATION OPÉRATIONNELLE.",
    heroTitle: "Chargé de Production Événementielle & Régisseur Junior",
    heroSubtitle: "Expertise en coordination logistique et sécurité des flux. De l'implantation technique en Australie (10 000 m²) à l'exigence du luxe à Paris, je sécurise chaque étape de vos projets complexes.",
    bioTitle: "FIABILITÉ & VISION LONG TERME.",
    bioText: [
      "Formé à l'exigence du terrain par des mentors reconnus, je combine une rigueur opérationnelle stricte à une vision stratégique de la gestion. Cette discipline, que j'applique quotidiennement dans le pilotage de mes investissements, me permet de garantir une gestion budgétaire et sécuritaire optimale pour chaque projet."
    ],
    expertise: {
      title: "EXIGENCE OPÉRATIONNELLE & CONFORMITÉ.",
      description: "Formé à l'exigence du terrain, je privilégie une gestion rigoureuse de la production. En plaçant l'anticipation et la sécurité au cœur de ma démarche, je transforme les contraintes logistiques en succès d'exécution maîtrisés.",
      skills: [
        { label: "Ingénierie des Flux & Logistique Terrain" },
        { label: "Implantation & Régie Technique" },
        { label: "Sécurité Événementielle (OH&S)" },
        { label: "Sécurité & Maîtrise des Risques" },
      ]
    },
    technicalSkills: [
      { label: "AutoCAD (CAO) (en formation)" },
      { label: "White Card & RSA (Australie)" },
      { label: "Suite Adobe et Microsoft" }
    ],
    highlightTerms: ["AutoCAD", "OH&S", "Melbourne", "White Card", "RSA"],
    mentors: [
      { name: "Ambroise Soulé" },
      { name: "Maxime Hernandez" },
      { name: "Olivier Genest" }, 
      { name: "Christophe Pascal" }
    ],
    projectsTitle: "PROJETS",
    projectsSubtitle: "Sélection de réalisations // 2023-2026",
    contact: {
      title: "REJOINDRE LE RÉSEAU.",
      email: "nilscattiauxtruelle@gmail.com",
      linkedin: "https://www.linkedin.com/in/nils-cattiaux-truelle-b37964187/",
      phone: "+33 7 63 35 63 63",
      cvUrl: "https://drive.google.com/file/d/1ZoC0Niu-BoI44wqcWicqj9UUf9SaH-Sj/view?usp=sharing"
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
      title: 'AusRAil 2026 - Melbourne Convention Center (MCEC)',
      category: 'Exposition',
      image: 'https://ausrail.com/wp-content/uploads/2024/04/YellowDinner2023.webp',
      description: "Coordination opérationnelle et logistique de site dans un environnement 100% anglophone pour des salons internationaux au Melbourne Convention Center (MCEC). En appui direct à la régie générale, j'ai assuré la conformité des installations techniques sur des surfaces de grande envergure.\n\n•  Implantation & Montage : Supervision du déploiement de structures événementielles sur des zones de plus de 10 000 m².\n• Expertise Plans : Interprétation et application de plans AutoCAD complexes pour l'implantation millimétrée des stands et infrastructures.\n• Sécurité & Conformité : Application rigoureuse des protocoles OH&S (Australie), garantissant un environnement de travail sans incident (Détenteur White Card & RSA).\n• Rigging & Technique : Assistance aux opérations de levage et montage de structures scéniques et d'exposition.",
      role: 'Assistant Régisseur | Implantation & Infrastructures',
      link: '#',
      kpis: { jauge: '7000+ Visiteurs', budget: 'X', staff: '50' },
      year: '2025',
      location: 'Melbourne, Australie'
    },
    {
      id: '2',
      title: 'Night Club - Némésis Entertainment',
      category: 'Grand Public',
      image: 'https://www.rollingstone.com/wp-content/uploads/2022/10/Post-Pandemic-and-Beyond-Looking-Ahead-to-the-Future-of-Live-Concerts.jpg',
      description: "Régie générale pour des événements musicaux. En plus de la gestion générale de l\'évènement ma mission portait sur la sécurisation du site et l\ optimisation des déplacements du public pour garantir une exploitation fluide et sécurisée.\n\n• Ingénierie des Flux : Conception et mise en œuvre du plan de circulation pour prévenir les points de congestion et fluidifier les accès.\n• Dispositif de Sécurité Civile : Collaboration à l\ élaboration du plan de sécurité et coordination opérationnelle des postes de secours sur site.\n• Gestion de l\ Affluence : Pilotage des équipes d\ accueil et de sécurité pour le contrôle des flux en temps réel lors des pics de fréquentation.\n• Rigueur Opérationnelle : Application des procédures d\ urgence et interface directe avec les services de secours et d\ incendie.",
      role: 'Régisseur général',
      link: '#',
      kpis: { jauge: '150', budget: '12 000 €', staff: '3' },
      year: '2025',
      location: 'France'
    },
    {
      id: '3',
      title: 'Spring Break - Timevent',
      category: 'Logistique Étudiante',
      image: 'https://res.cloudinary.com/shotgun/image/upload/c_limit,w_1200,h_630/f_jpg/q_auto/production/artworks/46a084ff-970c-4d75-ac42-0cacfaa2b2e6_ezfrxw.jpg',
      description: "Interface stratégique entre la direction de production et un public de plusieurs milliers de participants. Ma mission consistait à fluidifier l'expérience client tout en garantissant le respect des procédures logistiques sur le terrain.\n\n• Gestion des Flux de Masse : Supervision de l'acheminement et de l'accueil de flux étudiants massifs, garantissant une coordination fluide entre les transports et le site.\n•  Relais Opérationnel : Point de contact direct pour la résolution de problèmes en temps réel, agissant comme interface entre les besoins des participants et les contraintes de l'organisation.\n• Coordination des Imprévus : Gestion opérationnelle des situations d'urgence et des aléas logistiques avec une forte réactivité terrain.\n• Médiation & Communication : Déploiement des consignes de sécurité et d'organisation auprès des responsables de groupes pour maintenir l'ordre et la sécurité du site.",
      role: 'Représentant École & Relais Opérationnel',
      link: '#',
      kpis: { jauge: '1 000', budget: '35 000 €', staff: '15' },
      year: '2024',
      location: 'Espagne / France'
    },
    {
      id: '4',
      title: 'Gala - sup de pub paris',
      category: 'Grand Public',
      image: 'https://res.cloudinary.com/shotgun/image/upload/c_limit,w_1200,h_630/f_jpg/q_auto/production/artworks/WhatsApp_Image_2024-05-30_%C3%A0_17.22.20_abf884de_vgipto.jpg',
      description: "Appui à l'organisation d'un événement de prestige réunissant un public exigeant. Ma mission portait sur la coordination des espaces et la garantie d'une expérience fluide, de l'accueil à l'exploitation. \n\n• Aménagement & Scénographie : Supervision de la mise en place des espaces réceptifs en conformité avec le cahier des charges esthétique et technique.\n•  Coordination des Flux VIP : Gestion des accès et des parcours clients pour assurer une fluidité optimale lors des temps forts de la soirée.\n• Interface Prestataires : Relais opérationnel auprès des équipes traiteur et technique pour l'ajustement des besoins en temps réel.\n• Maîtrise de l'Image : Veille constante sur la qualité de l'environnement (propreté, signalétique, éclairage) pour maintenir les standards d'un événement haut de gamme.",
      role: 'Régisseur Général',
      link: '#',
      kpis: { jauge: '500', budget: '17 000 €', staff: '15' },
      year: '2024',
      location: 'France'
    },
    {
      id: '5',
      title: '2000\'s fever - sup de pub paris',
      category: 'Grand Public',
      image: 'https://res.cloudinary.com/shotgun/image/upload/c_limit,w_1200,h_630/f_jpg/q_auto/production/artworks/ECRAN_-_AVEC_COLONEL_pbe5ey.png',
      description: "Pilotage opérationnel de l'événement et gestion technique du showcase de l'artiste Colonel Reyel. J'ai assuré la coordination globale du site tout en garantissant le bon déroulement de la prestation artistique.\n\n• Régie Générale : Coordination complète du montage, de l'exploitation et du démontage dans le respect des contraintes de sécurité.\n•  Management de Showcase : Responsable de l'accueil de l'artiste (Colonel Reyel), de la gestion des besoins techniques (backline) et du respect du conducteur de scène.\n• Coordination Technique : Interface directe entre l'artiste, la technique (son/lumière) et l'organisation pour garantir la qualité du show.\n• Gestion des Flux & Sécurité : Supervision des équipes de sécurité et de l'accès à la scène pour assurer la protection de l'artiste et la fluidité du public.",
      role: 'Régisseur Général',
      link: '#',
      kpis: { jauge: '900', budget: '17 000 €', staff: '20' },
      year: '2024',
      location: 'France'
    },
    {
      id: '6',
      title: 'DYptique - map of stars',
      category: 'Evènement privé ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqdJJboqGf30i9pLx9e-zKnhI54Izb3B1MGA&s',
      description: "Soutien opérationnel lors de la phase de montage pour un événement de haute parfumerie. Ma mission consistait à accompagner le déploiement technique et scénographique dans le respect des standards d'excellence de l'agence Black Lemon.\n\n• Aide au Montage Scénographique : Participation à l'installation d'éléments de décor complexes et haut de gamme, exigeant une grande minutie.\n•  Logistique de Terrain : Manutention et déploiement des ressources techniques sous la direction du régisseur général.\n• Maintien des Standards Luxe : Veille constante à la propreté du site et au soin apporté aux matériaux précieux durant toute la phase de préparation.\n• Efficacité Opérationnelle : Exécution rapide des consignes logistiques pour respecter les délais de livraison extrêmement courts propres à l'événementiel de prestige.",
      role: 'Auxiliaire Logistique & Montage',
      link: '#',
      kpis: { jauge: 'x', budget: 'x', staff: 'x' },
      year: '2024',
      location: 'France'
    },
    {
      id: '7',
      title: 'möet & chandon - effervescence',
      category: 'Evènement privé ',
      image: 'https://www.moet.com/sites/default/files/2022-12/Effervescence-1920x1100.jpg',
      description: "Soutien technique et logistique pour le lancement de la campagne 'Effervescence'. Contribution active à la mise en place d'un dispositif événementiel de haut standing, où la précision du montage est au service de l'image de marque.\n\n•  Installation Scénographique : Participation au déploiement des structures décoratives et techniques dans le respect strict de la charte esthétique de la Maison.\n•  Manutention de Précision : Manipulation et installation de mobiliers et d'éléments de décor fragiles, exigeant un soin particulier et une grande minutie.\n• Support à la Régie : Exécution des missions logistiques de terrain pour assurer la préparation du site avant l'arrivée des invités VIP.\n• Discipline & Discrétion : Respect des protocoles opérationnels propres aux événements de luxe (propreté du chantier, discrétion des équipes, efficacité).",
      role: 'Auxiliaire Logistique & Montage',
      link: '#',
      kpis: { jauge: 'x', budget: 'x', staff: 'x' },
      year: '2024',
      location: 'France'
    }
    ]
};
