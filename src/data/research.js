export const researchAreas = [
  {
    id: "graph-machine-learning",
    title: "Graph Machine Learning",
    shortDescription:
      "Learning representations and predictive models for structured data using graph-based machine learning.",
    description:
      "This area focuses on representation learning and predictive modeling for relational and structured data, including settings where entities and interactions evolve over time.",
    topics: [
      "Graph Neural Networks",
      "Graph Representation Learning",
      "Graph Autoencoders",
      "Graph-based Prediction",
      "Static and Dynamic Graphs",
    ],
    methods: ["Graph Neural Networks", "Graph Representation Learning"],
    relatedProjects: ["graph-based-crime-prediction"],
    relatedPublications: ["exploring-urban-factors-autoencoders",
      "modeling-predicting-crimes-sao-paulo",
    ],
    featured: true,
  },

  {
    id: "spatio-temporal-ai",
    title: "Spatio-temporal AI",
    shortDescription:
      "Modeling spatial and temporal patterns in complex real-world systems.",
    description:
      "This area investigates how spatial context and temporal dynamics can be modeled jointly for improved understanding and prediction in real-world urban and complex systems.",
    topics: [
      "Spatio-temporal Modeling",
      "Temporal Dynamics",
      "Spatial Relationships",
      "Urban Data Analysis",
    ],
    relatedProjects: ["graph-based-crime-prediction"],
    relatedPublications: [
      "exploring-urban-factors-autoencoders",
      "modeling-predicting-crimes-sao-paulo",
    ],
    featured: true,
  },

  {
    id: "visual-analytics",
    title: "Visual Analytics",
    shortDescription:
      "Combining computational analysis with interactive visualization to support understanding and exploration of complex data.",
    description:
      "This area combines analytical modeling and visual interfaces to help interpret high-dimensional structure, projection behavior, and complex data relationships.",
    topics: [
      "Interactive Visualization",
      "Visual Analytics",
      "Projection Analysis",
      "Dimensionality Reduction",
    ],
    methods: ["Projection Analysis", "Dimensionality Reduction"],
    relatedProjects: ["dimensionality-reduction-distortion-cues"],
    relatedPublications: ["enriching-dimensionality-reduction-distortion-cues",
      "exploring-urban-factors-autoencoders",
    ],
    featured: true,
  },

  {
    id: "explainable-ai",
    title: "Explainable AI",
    shortDescription:
      "Understanding machine learning models and their decisions through interpretable representations and visual analysis.",
    description:
      "Examines interpretability and explanation workflows that connect model behavior, feature effects, and visual analysis to support trustworthy machine learning use.",
    topics: [
      "Model Interpretability",
      "Feature Contribution",
      "Model Analysis",
      "Visual Explanation",
    ],
    methods: ["Model Analysis", "Visual Explanation"],
    relatedProjects: ["dimensionality-reduction-distortion-cues"],
    relatedPublications: ["enriching-dimensionality-reduction-distortion-cues"],
    featured: true,
  },

  {
    id: "quantification",
    title: "Traditional Machine Learning",
    shortDescription:
      "Quantification, a supervised learning task to estimate class prevalence.",
    description:
      "Focuses on quantification methods that estimate class prevalence in datasets, particularly in scenarios where class distributions may shift between training and deployment.",
    topics: [
      "Supervised Learning",
      "Class Prevalence Estimation",
      "Distribution Shift",
      "Quantification Methods",
    ],
    methods: ["Quantification Methods", "Distribution Shift Analysis"],
    relatedProjects: ["quantification-assessment"],
    relatedPublications: [
      "importance-test-set-size-quantification",
      "accurately-quantifying-billion-instances",
      "accurately-quantifying-score-variability",
      "pitfalls-quantification-assessment",
    ],
    featured: true,
  },
];