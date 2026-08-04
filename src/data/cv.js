export const cvContent = {
  header: {
    summary:
      'Academic researcher focused on graph machine learning, spatio-temporal AI, visual analytics, and interpretable data-driven modeling.',
  },

  download: {
    label: 'Download Full CV PDF',
    filePath: '/cv/Waqar_Hassan_CV.pdf',
    expectedPublicPath: 'public/cv/Waqar_Hassan_CV.pdf',
  },

  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'COMSATS University Islamabad',
      location: 'Islamabad, Pakistan',
      period: 'Completed',
      focus:
        'Machine learning, quantification, and data-driven analysis methods for complex datasets.',
    },
  ],

  experience: [
    {
      id: 'postdoctoral-research',
      role: 'Postdoctoral Researcher',
      organization: 'Academic Research Environment',
      period: 'Current',
      location: 'Research-focused role',
      summary:
        'Developing machine learning and visual analytics research with emphasis on interpretable modeling workflows.',
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
        'Designing research workflows that connect predictive models with visual interpretation.',
        'Bridging graph-based learning with spatio-temporal analysis for urban and relational data.',
      ],
    },
  ],

  researchInterests: {
    areaIds: [
      'graph-machine-learning',
      'spatio-temporal-ai',
      'visual-analytics',
      'explainable-ai',
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
      label: 'Best Paper Award',
      publicationId: 'accurately-quantifying-billion-instances',
      year: 2020,
    },
  ],

  skills: [
    {
      category: 'Machine Learning',
      items: [
        'Graph Neural Networks',
        'Representation Learning',
        'Spatio-temporal Modeling',
        'Model Interpretation',
      ],
    },
    {
      category: 'Programming & Libraries',
      items: ['Python', 'PyTorch', 'PyTorch Geometric', 'Scikit-learn'],
    },
    {
      category: 'Research Tooling',
      items: ['Data Analysis', 'Visual Analytics', 'Scientific Writing'],
    },
  ],

  academicProfiles: [
    { label: 'Google Scholar', socialKey: 'googleScholar' },
    { label: 'ORCID', socialKey: 'orcid' },
    { label: 'GitHub', socialKey: 'github' },
    { label: 'LinkedIn', socialKey: 'linkedin' },
  ],
}
