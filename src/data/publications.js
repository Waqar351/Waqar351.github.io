/**
 * Publication metadata.
 *
 * To add a new publication:
 * 1. Add a new object to the array.
 * 2. Keep the same field structure.
 * 3. Add only links that actually exist.
 */

export const publications = [
  {
    id: "exploring-urban-factors-autoencoders",

    year: 2025,

    title:
      "Exploring Urban Factors with Autoencoders: Relationship Between Static and Dynamic Features",

    authors: ["Waqar Hassan"],

    venue:
      "Conference on Graphics, Patterns and Images (SIBGRAPI)",

    type: "Conference",

    description:
      "Research investigating relationships between static and dynamic urban features using autoencoder-based representations.",

    links: {
      doi: "https://doi.org/10.1109/SIBGRAPI67909.2025.11223351",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: ["spatio-temporal-ai"],
    relatedProjects: [],

    featured: true,
  },

  {
    id: "modeling-predicting-crimes-sao-paulo",

    year: 2024,

    title:
      "Modeling and Predicting Crimes in the City of São Paulo Using Graph Neural Networks",

    authors: ["Waqar Hassan"],

    venue:
      "Brazilian Conference on Intelligent Systems (BRACIS)",

    type: "Conference",

    description:
      "Graph neural network methods for modeling and predicting crime patterns in the city of São Paulo.",

    links: {
      doi: "https://doi.org/10.1007/978-3-031-79035-5_26",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: ["graph-machine-learning", "spatio-temporal-ai"],
    relatedProjects: ["graph-based-crime-prediction"],

    featured: true,
  },

  {
    id: "accurately-quantifying-score-variability",

    year: 2021,

    title: "Accurately Quantifying under Score Variability",

    authors: ["Waqar Hassan"],

    venue:
      "IEEE International Conference on Data Mining (ICDM)",

    type: "Conference",

    description:
      "Research on accurate quantification under variability in model scores.",

    links: {
      doi: "https://doi.org/10.1109/ICDM51629.2021.00149",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: [],
    relatedProjects: [],

    featured: false,
  },

  {
    id: "pitfalls-quantification-assessment",

    year: 2021,

    title: "Pitfalls in Quantification Assessment",

    authors: ["Waqar Hassan"],

    venue:
      "First International Workshop on Learning to Quantify: Methods and Applications, CIKM",

    type: "Workshop",

    description:
      "Research examining potential pitfalls and considerations in the assessment of quantification methods.",

    links: {
      doi: "",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: [],
    relatedProjects: [],

    featured: false,
  },

  {
    id: "accurately-quantifying-billion-instances",

    year: 2020,

    title: "Accurately Quantifying a Billion Instances per Second",

    authors: ["Waqar Hassan"],

    venue:
      "IEEE International Conference on Data Science and Advanced Analytics (DSAA)",

    type: "Conference",

    description:
      "A high-performance quantification approach designed to process very large-scale data efficiently.",

    award: "Best Paper Award",

    links: {
      doi: "https://doi.org/10.1109/DSAA49011.2020.00012",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: [],
    relatedProjects: [],

    featured: true,
  },

  {
    id: "importance-test-set-size-quantification",

    year: 2020,

    title:
      "The Importance of the Test Set Size in Quantification Assessment",

    authors: ["Waqar Hassan"],

    venue:
      "International Joint Conference on Artificial Intelligence (IJCAI)",

    type: "Conference",

    description:
      "Research investigating the role of test-set size when assessing quantification methods.",

    links: {
      doi: "https://doi.org/10.24963/ijcai.2020/366",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: [],
    relatedProjects: [],

    featured: false,
  },

  {
    id: "enriching-dimensionality-reduction-distortion-cues",

    year: null,

    title:
      "Enriching Dimensionality Reduction with Distortion Cues",

    authors: ["Waqar Hassan"],

    venue: "SSRN Preprint",

    type: "Preprint",

    status: "Under review",

    description:
      "Research on enriching dimensionality-reduction visualizations with cues that help users understand distortion in projected data.",

    links: {
      doi: "https://doi.org/10.2139/ssrn.6604227",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: ["visual-analytics"],
    relatedProjects: ["dimensionality-reduction-distortion-cues"],

    featured: true,
  },

];