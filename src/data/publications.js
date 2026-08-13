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

    authors: ["Ximena Pocco","Waqar Hassan", "Karelia Salinas", "Vladimir Molchanov", "Luis G. Nonato"],

    venue:
      "Conference on Graphics, Patterns and Images (SIBGRAPI)",

    type: "Conference",

    description:
      "A visualization-assisted framework for analyzing fused latent representations of heterogeneous static and dynamic urban data. The study shows that combined representations can reveal more structured patterns, while separate representations remain useful in specific cases.",

    links: {
      doi: "https://doi.org/10.1109/SIBGRAPI67909.2025.11223351",
      paper: "",
      code: "https://github.com/giva-lab/sib_data_fusion",
      project: "",
    },

    relatedResearch: ["spatio-temporal-ai", "visual-analytics", "graph-machine-learning"],
    relatedProjects: ["graph-based-crime-prediction"],

    featured: true,
  },

  {
    id: "modeling-predicting-crimes-sao-paulo",

    year: 2024,

    title:
      "Modeling and Predicting Crimes in the City of São Paulo Using Graph Neural Networks",

    authors: ["Waqar Hassan", "Marvin M. Cabral", "Thiago R. Ramos", "Antonio C. Filho", "Luis G. Nonato"],

    venue:
      "Brazilian Conference on Intelligent Systems (BRACIS)",

    type: "Conference",

    description:
      "This work investigates spatio-temporal Graph Neural Networks for crime prediction by comparing DySAT and EvolveGCN architectures. It introduces a data modeling framework that integrates crime data, street map graphs, and urban information, providing a consolidated approach for representing heterogeneous urban data in GNN-based crime prediction.",

    links: {
      doi: "https://doi.org/10.1007/978-3-031-79035-5_26",
      paper: "",
      code: "https://github.com/giva-lab/BRACIS2024_GNN",
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

    authors: ["André Maletzke", "Denis Dos Reis", "Waqar Hassan", "Gustavo Batista"],

    venue:
      "IEEE International Conference on Data Mining (ICDM)",

    type: "Conference",

    description:
      "A study of concept drift in score-based quantification, introducing MoSS for modeling synthetic classification scores and DySyn, a drift-resilient quantifier for binary classes. Experiments show that DySyn outperforms state-of-the-art quantifiers under concept drift.",

    links: {
      doi: "https://doi.org/10.1109/ICDM51629.2021.00149",
      paper: "",
      code: "https://github.com/andregustavom/icdm21_paper",
      project: "",
    },

    relatedResearch: ["quantification"],
    relatedProjects: ["quantification-assessment"],

    featured: false,
  },

  {
    id: "pitfalls-quantification-assessment",

    year: 2021,

    title: "Pitfalls in Quantification Assessment",

    authors: ["Waqar Hassan", "André Maletzke", "Gustavo Batista"],

    venue:
      "International Workshop on Learning to Quantify: Methods and Applications, CIKM",

    type: "Workshop",

    description:
      "Examines the limitations of the artificial-prevalence protocol (APP) for evaluating quantification methods, focusing on the effects of synthetic class prevalence in test sets. It introduces the Lazy baseline quantifier and radar charts as complementary tools for identifying situations in which quantifiers may achieve artificially improved performance.",

    links: {
      doi: "https://ceur-ws.org/Vol-3052/paper23.pdf",
      paper: "",
      code: "",
      project: "",
    },

    relatedResearch: ["quantification"],
    relatedProjects: ["quantification-assessment"],

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
      "Introduces Sample Mean Matching (SMM), a highly efficient quantification algorithm designed to estimate class distributions at very large scale. An empirical evaluation across 25 benchmark and real-world datasets shows that SMM achieves competitive counting accuracy while being orders of magnitude faster than most established and state-of-the-art quantifiers.",

    award: "Best Paper Award",

    links: {
      doi: "https://doi.org/10.1109/DSAA49011.2020.00012",
      paper: "",
      code: "https://github.com/Waqar351/SMM_Journal_Paper",
      project: "",
    },

    relatedResearch: ["quantification"],
    relatedProjects: ["quantification-assessment"],

    featured: true,
  },

  {
    id: "importance-test-set-size-quantification",

    year: 2020,

    title:
      "The Importance of the Test Set Size in Quantification Assessment",

    authors: ["André Maletzke", "Waqar Hassan", "Denis Reis", "Gustavo Batista"],

    venue:
      "International Joint Conference on Artificial Intelligence (IJCAI)",

    type: "Conference",

    description:
      "Investigates the impact of test set size on the evaluation and performance of quantification methods. Through a broad experimental evaluation, it demonstrates the importance of test set size, identifies performance limitations on small test sets, and proposes a meta-learning scheme for selecting the most suitable quantifier based on test set size.",

    links: {
      doi: "https://doi.org/10.24963/ijcai.2020/366",
      paper: "",
      code: "https://github.com/Waqar351/SMM_Journal_Paper",
      project: "",
    },

    relatedResearch: ["quantification"],
    relatedProjects: ["quantification-assessment"],

    featured: false,
  },

  {
    id: "enriching-dimensionality-reduction-distortion-cues",

    year: 2026,

    title:
      "Enriching Dimensionality Reduction with Distortion Cues",

    authors: ["Waqar Hassan", "Antonia Schlieder", "Filip Sadlo", "Luis G. Nonato"],

    venue: "Computers & Graphics",

    type: "Journal",

    status: "",

   description:
      "Addresses the risk of misinterpreting dimensionality-reduction layouts by enriching 2D projections with information about true high-dimensional distances. It presents a Delaunay-based layout enrichment approach that helps users identify distortion-related visual artifacts, with a user evaluation showing fewer analytical errors compared with established visualization baselines.",

    links: {
      doi: "https://doi.org/10.1016/j.cag.2026.104724",
      paper: "",
      code: "https://github.com/Waqar351/dr_layout_enrichment_cues",
      project: "",
    },

    relatedResearch: ["visual-analytics", "explainable-ai"],
    relatedProjects: ["dimensionality-reduction-distortion-cues"],

    featured: true,
  },

];
