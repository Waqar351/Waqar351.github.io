import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import ResearchCard from '../../components/ResearchCard/ResearchCard'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import PublicationCard from '../../components/PublicationCard/PublicationCard'
import { siteConfig } from '../../data/site'
import { researchAreas } from '../../data/research'
import { projects } from '../../data/projects'
import { publications } from '../../data/publications'
import './Home.css'

function Home() {
  const heroKeywords = [
    'Graph Machine Learning',
    'Visual Analytics',
    'Spatio-temporal AI',
    'Explainable AI',
    'Dimensionality Reduction',
  ]

  const quickLinkPaths = ['/research', '/projects', '/cv']
  const quickLinks = quickLinkPaths
    .map((path) => siteConfig.navigation.find((item) => item.path === path))
    .filter(Boolean)

  const featuredProjects = projects.filter((project) => project.featured === true)
  const selectedPublications = publications.filter(
    (publication) => publication.featured === true,
  )

  return (
    <div className="home-page">
      <section className="home-hero page-section">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Postdoctoral Researcher</p>
          <h1 className="home-hero__title">{siteConfig.name}</h1>
          <p className="home-hero__role">{siteConfig.title}</p>
          <p className="home-hero__summary">{siteConfig.description}</p>
          <ul className="home-hero__keywords" aria-label="Research keywords">
            {heroKeywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>

          <nav aria-label="Home quick links">
            <ul className="home-hero__actions">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="button-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <aside className="home-hero__visual" aria-hidden="true">
          <div className="home-hero__graph"></div>
        </aside>
      </section>

      <section className="page-section">
        <SectionTitle
          title="Research Overview"
          subtitle="Core research directions"
          level="h2"
        />
        {researchAreas.length ? (
          <div className="research-grid">
            {researchAreas.map((research, index) => (
              <ResearchCard key={research.id} research={research} index={index} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No research areas are currently available.</p>
        )}
      </section>

      <section className="page-section">
        <SectionTitle
          title="Featured Projects"
          subtitle="Highlighted current work"
          level="h2"
        />
        {featuredProjects.length ? (
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No featured projects are currently available.</p>
        )}
      </section>

      <section className="page-section">
        <SectionTitle
          title="Selected Publications"
          subtitle="Featured scholarly outputs"
          level="h2"
        />
        {selectedPublications.length ? (
          <div className="publications-list" role="list">
            {selectedPublications.map((publication) => (
              <div key={publication.id} role="listitem" className="publications-list__item">
                <PublicationCard publication={publication} />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No featured publications are currently available.</p>
        )}
      </section>

      <section className="page-section visual-lab-callout">
        <SectionTitle
          title="Visual Math Lab"
          subtitle="Interactive experiments and visual learning modules"
          level="h2"
        />
        <p className="visual-lab-callout__description">
          Explore an interactive environment for understanding mathematical and machine-learning
          concepts through visualization.
        </p>
        <p>
          <Link to="/visual-math-lab" className="visual-lab-callout__link">
            Explore the Visual Math Lab →
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Home
