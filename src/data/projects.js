export const projects = [
  {
    id: "graph-based-crime-prediction",
    title: "Graph-Based Crime Prediction",
    shortDescription:
      "Graph-based machine learning for modeling and predicting crime patterns using spatial and temporal information.",
    category: "Graph Machine Learning",
    year: 2024,

    description:
      "Investigates crime prediction with spatio-temporal Graph Neural Networks, including DySAT and EvolveGCN, using a data modeling framework that integrates crime data, street-map graphs, and urban information to represent spatial and temporal dependencies in crime patterns.",

    technologies: [
      "Python",
      "PyTorch",
      "PyTorch Geometric",
      "Graph Neural Networks",
    ],

    links: {
      github: "",
      paper: "",
      demo: "",
    },

    image: "/images/projects/graph-crime-prediction.webp",
    imageAlt:
      "Abstract city street graph with glowing nodes and layered crime hotspot predictions over time",
    relatedResearch: ["graph-machine-learning", "spatio-temporal-ai", "visual-analytics", "explainable-ai"],
    relatedPublications: [
      "modeling-predicting-crimes-sao-paulo",
      "exploring-urban-factors-autoencoders",
    ],

    featured: true,
  },

  {
    id: "dimensionality-reduction-distortion-cues",
    title: "Projection Analysis",
    shortDescription:
      "Research on dimensionality reduction and visual cues for understanding distortion in projected data.",
    category: "Dimensionality Reduction",
    year: 2025,

    description:
      "Investigates how dimensionality-reduction layouts can misrepresent relationships in high-dimensional data. The work enriches 2D projections with Delaunay-based visual cues that communicate true high-dimensional distances and evaluates whether those cues reduce analytical errors relative to established visualization baselines.",

    technologies: [
      "Python",
      "Scikit-learn",
      "t-SNE",
      "UMAP",
      "Plotly",
      "Dimensionality Reduction",
    ],

    links: {
      github: "",
      paper: "",
      demo: "",
    },

    image: "/images/projects/dimensionality-reduction-distortion.webp",
    imageAlt:
      "Point clusters connected by a geometric mesh with colored edges revealing projection distortion",
    relatedResearch: ["visual-analytics", "explainable-ai"],
    relatedPublications: ["enriching-dimensionality-reduction-distortion-cues"],

    featured: true,
  },

  {
    id: "quantification-assessment",
    title: "Quantification",
    shortDescription:
      "Research on quantification assessment and the role of test-set size in evaluating quantification methods.",
    category: "Supervised Learning",
    year: 2019,

    description:
      "Brings together research on class-prevalence estimation and quantification assessment across test-set size, score variability, concept drift, and large-scale settings. The related studies examine evaluation protocols and efficient methods such as Sample Mean Matching (SMM) without treating them as a single experimental methodology.",

    technologies: [
      "Python",
      "Scikit-learn",
      "SciPy",
      "Plotly",
      "matplotlib",
    ],

    links: {
      github: "",
      paper: "",
      demo: "",
    },

    image: "/images/projects/quantification-assessment.webp",
    imageAlt:
      "Streams of class-colored data points flowing into prevalence rings and changing distributions",
    relatedResearch: ["quantification"],
    relatedPublications: [
      "importance-test-set-size-quantification",
      "accurately-quantifying-billion-instances",
      "accurately-quantifying-score-variability",
      "pitfalls-quantification-assessment",
    ],

    featured: true,
  },
];
