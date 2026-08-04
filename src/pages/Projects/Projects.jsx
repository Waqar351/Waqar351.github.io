import SectionTitle from '../../components/SectionTitle/SectionTitle'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { siteConfig } from '../../data/site'
import { projects } from '../../data/projects'
import { researchAreas } from '../../data/research'
import { publications } from '../../data/publications'
import './Projects.css'

function Projects() {
  const researchById = new Map(researchAreas.map((research) => [research.id, research]))
  const publicationsById = new Map(
    publications.map((publication) => [publication.id, publication]),
  )

  const detailedProjects = projects.map((project) => ({
    ...project,
    relatedResearchData: (project.relatedResearch ?? [])
      .map((researchId) => researchById.get(researchId))
      .filter(Boolean),
    relatedPublicationsData: (project.relatedPublications ?? [])
      .map((publicationId) => publicationsById.get(publicationId))
      .filter(Boolean),
  }))

  return (
    <div className="projects-page">
      <section className="projects-page__intro">
        <SectionTitle
          title="Projects"
          subtitle="Detailed research and interactive visualization projects"
          level="h1"
        />
        <p>
          These projects reflect current work across machine learning, visual analytics, and
          interactive modeling, aligned with the broader research direction described across this
          portfolio.
        </p>
        <p>{siteConfig.tagline}</p>
      </section>

      <section>
        <SectionTitle
          title="Project Portfolio"
          subtitle="Data-driven project index with research and publication links"
          level="h2"
        />

        {detailedProjects.length ? (
          <div className="projects-page__grid">
            {detailedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} mode="detailed" />
            ))}
          </div>
        ) : (
          <p className="projects-page__empty">No projects are currently available.</p>
        )}
      </section>
    </div>
  )
}

export default Projects
