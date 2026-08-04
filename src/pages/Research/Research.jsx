import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { researchAreas } from '../../data/research'
import { projects } from '../../data/projects'
import { publications } from '../../data/publications'
import { siteConfig } from '../../data/site'
import ResearchAreaDetail from './ResearchAreaDetail'
import './Research.css'

function Research() {
  const projectsById = new Map(projects.map((project) => [project.id, project]))
  const publicationsById = new Map(
    publications.map((publication) => [publication.id, publication]),
  )

  const areasWithRelations = researchAreas.map((area) => {
    const relatedProjects = (area.relatedProjects ?? [])
      .map((projectId) => projectsById.get(projectId))
      .filter(Boolean)

    const relatedPublications = (area.relatedPublications ?? [])
      .map((publicationId) => publicationsById.get(publicationId))
      .filter(Boolean)

    return {
      ...area,
      relatedProjects,
      relatedPublications,
    }
  })

  return (
    <div className="research-page">
      <section className="research-page__intro">
        <SectionTitle
          title="Research"
          subtitle="Research directions and their connections across projects and publications"
          level="h1"
        />
        <p>{siteConfig.description}</p>
      </section>

      <section>
        <SectionTitle title="Research Areas" subtitle="Detailed overview" level="h2" />

        {areasWithRelations.length ? (
          <div className="research-page__areas">
            {areasWithRelations.map((research, index) => (
              <ResearchAreaDetail
                key={research.id}
                research={research}
                index={index}
                relatedProjects={research.relatedProjects}
                relatedPublications={research.relatedPublications}
              />
            ))}
          </div>
        ) : (
          <p className="research-page__empty">No research areas are currently available.</p>
        )}
      </section>

      {researchAreas.length ? (
        <section className="research-connections" aria-label="Connections between research areas">
          <h3 className="research-connections__title">Connections Across Research Areas</h3>
          <p className="research-connections__subtitle">
            The following overview shows how current focus areas relate across the broader research
            program.
          </p>
          <ol className="research-connections__flow">
            {researchAreas.map((area, index) => (
              <li key={area.id}>
                {area.title}
                {index < researchAreas.length - 1 ? (
                  <span className="research-connections__arrow" aria-hidden="true">
                    {' '}
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section>
        <SectionTitle title="Continue Exploring" subtitle="Navigate related outputs" level="h2" />
        <div className="research-page__cta">
          <Link to="/projects" className="button-link">
            View Projects →
          </Link>
          <Link to="/publications" className="button-link">
            View Publications →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Research
