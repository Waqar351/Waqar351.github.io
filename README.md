# Waqar Hassan - Academic Research Portfolio

## Overview
This repository contains the source code for a personal academic research portfolio website. It presents research themes, projects, publications, professional background, CV access, and contact information in a structured, data-driven React application.

## Research
The portfolio highlights research areas currently represented in the repository data:

- Graph Machine Learning
- Spatio-temporal AI
- Visual Analytics
- Explainable AI

These areas are connected to projects and publications through explicit ID-based relationships.

## Website Sections
- Home: high-level introduction, research overview, featured projects, and selected publications.
- Research: detailed research areas with linked projects and publications.
- Projects: project-focused view with metadata and research/publication relationships.
- Publications: filterable and year-grouped scholarly outputs.
- About: professional profile, research perspective, and related links.
- CV: concise academic overview and downloadable full CV PDF.
- Contact: professional email and academic/professional profile links.

## Technology
This repository currently uses:

- React
- Vite
- React Router
- JavaScript (ES modules)
- CSS
- Oxlint (linting)

## Data-Driven Architecture
Core portfolio content is maintained in structured data files and rendered by reusable components.

- Site metadata/navigation/social links: src/data/site.js
- Research areas: src/data/research.js
- Projects: src/data/projects.js
- Publications: src/data/publications.js
- About page content: src/data/about.js
- CV page content: src/data/cv.js
- Contact page content: src/data/contact.js

In most cases, adding or updating a publication, project, or research area should be done in the corresponding data file rather than by creating new page logic.

## Repository Structure
```text
.
|- public/
|  |- cv/
|  |  \- Waqar_Hassan_CV.pdf
|  \- favicon.svg
|- src/
|  |- assets/
|  |- components/
|  |  |- Footer/
|  |  |- Navbar/
|  |  |- ProjectCard/
|  |  |- PublicationCard/
|  |  |- ResearchCard/
|  |  \- SectionTitle/
|  |- data/
|  |  |- about.js
|  |  |- contact.js
|  |  |- cv.js
|  |  |- projects.js
|  |  |- publications.js
|  |  |- research.js
|  |  \- site.js
|  |- pages/
|  |  |- About/
|  |  |- Contact/
|  |  |- CV/
|  |  |- Home/
|  |  |- Projects/
|  |  |- Publications/
|  |  \- Research/
|  |- App.css
|  |- App.jsx
|  |- index.css
|  \- main.jsx
|- index.html
|- package.json
|- vite.config.js
\- README.md
```

## Local Development
Use npm.cmd in this Windows environment.

```bash
npm.cmd install
npm.cmd run dev
```

Available project scripts:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## Deployment
The site is configured for GitHub Pages hosting. The Vite build includes an SPA fallback by generating dist/404.html from dist/index.html, which supports deep-link access to nested client-side routes.

## CV
The full CV PDF is served from:

- public/cv/Waqar_Hassan_CV.pdf

## License
No license file is currently present in this repository.
