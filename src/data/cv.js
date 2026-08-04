export const cvContent = {
  header: {
    professionalTitle:
      'Machine Learning Research Scientist | Graph Machine Learning | Spatio-temporal AI | Explainable AI',
    location: 'São Carlos, Brazil',
  },

  professionalProfile: {
    title: 'Professional Profile',
    summary:
      'AI and Machine Learning researcher specializing in Graph Machine Learning, spatio-temporal AI, and Explainable AI. My research focuses on developing interpretable machine learning methods for complex real-world systems by combining Graph Neural Networks, representation learning, multimodal data integration, explainable AI, and visual analytics. I hold a Ph.D. in Computer Science (Data Science) from the University of São Paulo (USP) and currently work as a Postdoctoral Researcher at USP. My experience spans both academic research and industry-scale data engineering, including large-scale data processing and machine-learning integration. I have published in international venues including IEEE ICDM, IJCAI, IEEE DSAA, BRACIS, and SIBGRAPI, and received the IEEE DSAA 2020 Best Paper Award.',
  },

  download: {
    label: 'Download Full CV PDF',
    filePath: '/cv/Waqar_Hassan_CV.pdf',
    expectedPublicPath: 'public/cv/Waqar_Hassan_CV.pdf',
  },

  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'University of São Paulo',
      location: 'Brazil',
      period: 'Mar. 2018--Jul. 2022',
      details: ['Research area: Data Science'],
    },
    {
      degree: 'M.Sc. in Electronics Engineering',
      institution: 'International Islamic University Islamabad',
      location: 'Pakistan',
      period: 'Feb. 2014--Sep. 2016',
      details: ['Specialization: Machine Learning', 'CGPA: 3.90/4.00'],
    },
    {
      degree: 'B.Sc. in Electrical Engineering',
      institution: 'COMSATS Institute of Information Technology, Islamabad',
      location: 'Pakistan',
      period: 'Feb. 2008--Feb. 2012',
      details: ['Specialization: Telecommunications', 'CGPA: 3.28/4.00'],
    },
  ],

  experience: [
    {
      id: 'postdoctoral-research',
      role: 'Postdoctoral Researcher',
      organization: 'University of São Paulo',
      period: 'Feb. 2024--Present',
      location: 'São Carlos, Brazil',
      relatedResearchIds: [
        'graph-machine-learning',
        'spatio-temporal-ai',
        'visual-analytics',
        'explainable-ai',
      ],
      relatedProjectIds: [
        'graph-based-crime-prediction',
        'dimensionality-reduction-distortion-cues',
      ],
      highlights: [
        'Developed Graph Neural Network models for spatio-temporal prediction over large-scale urban street networks.',
        'Designed a scalable graph-construction framework integrating street topology, socioeconomic variables, and temporally evolving event data into heterogeneous graph representations.',
        'Proposed multimodal representation-learning methods using Graph Autoencoders to combine static and dynamic urban information.',
        'Designed explainable-AI techniques based on dimensionality reduction, inverse projection, and latent-space analysis to interpret graph embeddings and model behavior.',
        'Built interactive visual analytics tools for exploring graph embeddings, feature relationships, and spatio-temporal prediction results.',
        'Implemented reusable software frameworks for graph-based machine learning research and experimentation across multiple urban prediction tasks.',
      ],
    },
    {
      id: 'software-engineer-ii',
      role: 'Software Engineer II',
      organization: 'LexisNexis Risk Solutions',
      period: 'Dec. 2021--Mar. 2023',
      location: 'São Paulo, Brazil',
      relatedResearchIds: [],
      relatedProjectIds: [],
      highlights: [
        'Developed distributed ETL pipelines using HPCC Systems, processing more than 100 million records per day and improving data throughput by approximately 30%.',
        'Automated data-cleaning and parsing workflows, reducing manual processing effort by approximately 40%.',
        'Integrated machine-learning models into ETL workflows, improving trend-detection accuracy by up to 25%.',
      ],
    },
    {
      id: 'graduate-researcher',
      role: 'Graduate Researcher',
      organization: 'University of São Paulo',
      period: 'Mar. 2018--Jul. 2022',
      location: 'São Carlos, Brazil',
      relatedResearchIds: ['graph-machine-learning'],
      relatedProjectIds: [],
      highlights: [
        'Investigated quantification and classification methods for dengue mosquito prediction using sensor-equipped mosquito traps.',
        'Designed and implemented a lightweight, memory-efficient quantification framework for high-speed data streams and large-scale data environments.',
        'Proposed a fast and accurate quantification method with applications in public-health monitoring; the work received the Best Paper Award at IEEE DSAA 2020.',
        'Developed deployment-oriented methods with low memory and computational requirements to support scalable field use.',
      ],
    },
  ],

  researchExpertise: {
    title: 'Research Expertise',
    areaIds: ['graph-machine-learning', 'spatio-temporal-ai', 'visual-analytics', 'explainable-ai'],
    items: [
      'Graph Machine Learning',
      'Spatio-temporal Learning',
      'Graph Neural Networks',
      'Representation Learning',
      'Explainable AI',
      'Visual Analytics',
      'Heterogeneous Data Integration',
      'Urban Data Science',
    ],
  },

  selectedPublications: {
    publicationIds: [
      'modeling-predicting-crimes-sao-paulo',
      'exploring-urban-factors-autoencoders',
      'accurately-quantifying-billion-instances',
      'enriching-dimensionality-reduction-distortion-cues',
    ],
  },

  awards: [
    {
      label: 'FAPESP Postdoctoral Fellowship',
      organization: 'São Paulo Research Foundation',
      category: 'Postdoctoral',
    },
    {
      label: 'TWAS--CNPq Doctoral Fellowship',
      organization: 'TWAS / CNPq',
      category: 'Ph.D.',
    },
    {
      label: 'Best Paper Award',
      organization: 'IEEE DSAA',
      publicationId: 'accurately-quantifying-billion-instances',
      year: 2020,
    },
  ],

  technicalExpertise: [
    {
      category: 'Graph Learning',
      items: [
        'Graph Neural Networks',
        'Graph Autoencoders',
        'representation learning',
        'multimodal learning',
      ],
    },
    {
      category: 'Machine Learning',
      items: [
        'Classification',
        'regression',
        'clustering',
        'statistical learning',
        'quantification',
        'ensemble Learning',
        'cross-validation',
        'hyperparameter optimization',
      ],
    },
    {
      category: 'Spatio-temporal Modeling',
      items: [
        'Graph-based prediction',
        'urban network analysis',
        'time-series forecasting',
        'temporal modeling',
        'ARIMA',
      ],
    },
    {
      category: 'Explainable AI and Visual Analytics',
      items: [
        'Dimensionality reduction',
        'inverse projection',
        'latent representation analysis',
        'interactive visualization',
        'Matplotlib',
        'Plotly',
        'Tableau',
      ],
    },
    {
      category: 'Programming',
      items: [
        'Python',
        'PyTorch',
        'PyTorch Geometric',
        'TensorFlow',
        'Scikit-learn',
        'Pandas',
        'NumPy',
        'SQL',
        'ECL',
      ],
    },
    {
      category: 'Scientific Computing & Development Tools',
      items: [
        'Git',
        'Poetry',
        'MLflow',
        'Jupyter Notebook',
        'VS Code',
        'Overleaf',
        'Jira',
        'HPCC Systems',
        'Apache Spark',
      ],
    },
  ],

  academicService: {
    title: 'Academic Service',
    points: ['Mentored one Ph.D. student and one M.Sc. student in graph machine learning research.'],
  },

  languages: {
    title: 'Languages',
    items: [
      'English — Fluent',
      'Portuguese — Intermediate',
      'Urdu — Native',
    ],
  },

  academicProfiles: [
    { label: 'Google Scholar', socialKey: 'googleScholar' },
    { label: 'ORCID', socialKey: 'orcid' },
    { label: 'GitHub', socialKey: 'github' },
    { label: 'LinkedIn', socialKey: 'linkedin' },
  ],
}
