import { useMemo, useState } from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import PublicationCard from '../../components/PublicationCard/PublicationCard'
import { siteConfig } from '../../data/site'
import { publications } from '../../data/publications'
import { projects } from '../../data/projects'
import { researchAreas } from '../../data/research'
import './Publications.css'

function Publications() {
  const [activeType, setActiveType] = useState('All')

  const researchById = useMemo(
    () => new Map(researchAreas.map((research) => [research.id, research])),
    [],
  )
  const projectsById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [],
  )

  const publicationTypes = useMemo(() => {
    const existingTypes = Array.from(
      new Set(
        publications
          .map((publication) => publication.type)
          .filter(Boolean),
      ),
    )

    return ['All', ...existingTypes]
  }, [])

  const filteredPublications = useMemo(() => {
    if (activeType === 'All') {
      return publications
    }

    return publications.filter((publication) => publication.type === activeType)
  }, [activeType])

  const groupedPublications = useMemo(() => {
    const grouped = filteredPublications.reduce((accumulator, publication) => {
      const yearKey = publication.year ?? 'In Review'
      const key = String(yearKey)

      if (!accumulator.has(key)) {
        accumulator.set(key, [])
      }

      accumulator.get(key).push(publication)
      return accumulator
    }, new Map())

    return Array.from(grouped.entries()).sort(([left], [right]) => {
      const leftNum = Number(left)
      const rightNum = Number(right)

      if (Number.isNaN(leftNum) && Number.isNaN(rightNum)) {
        return left.localeCompare(right)
      }

      if (Number.isNaN(leftNum)) {
        return 1
      }

      if (Number.isNaN(rightNum)) {
        return -1
      }

      return rightNum - leftNum
    })
  }, [filteredPublications])

  const detailedPublications = useMemo(
    () =>
      groupedPublications.map(([year, publicationsInYear]) => ({
        year,
        items: publicationsInYear.map((publication) => ({
          ...publication,
          relatedResearchData: (publication.relatedResearch ?? [])
            .map((researchId) => researchById.get(researchId))
            .filter(Boolean),
          relatedProjectsData: (publication.relatedProjects ?? [])
            .map((projectId) => projectsById.get(projectId))
            .filter(Boolean),
        })),
      })),
    [groupedPublications, projectsById, researchById],
  )

  return (
    <div className="publications-page">
      <section className="publications-page__intro">
        <SectionTitle
          title="Publications"
          subtitle="Peer-reviewed, workshop, and preprint outputs"
          level="h1"
        />
        <p>
          This page organizes scholarly outputs connected to ongoing work in machine learning,
          visual analytics, and high-dimensional data analysis.
        </p>
        <p>{siteConfig.tagline}</p>
      </section>

      <section>
        <SectionTitle title="Publication Index" subtitle="Dynamic list grouped by year" level="h2" />

        {publicationTypes.length > 1 ? (
          <div className="publications-page__filters" role="toolbar" aria-label="Publication filters">
            {publicationTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`publications-page__filter ${activeType === type ? 'is-active' : ''}`.trim()}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        ) : null}

        {detailedPublications.length ? (
          <div className="publications-page__years">
            {detailedPublications.map((group) => (
              <section key={group.year} className="publications-year-group" aria-label={`${group.year} publications`}>
                <h3 className="publications-year-group__title">{group.year}</h3>
                <div className="publications-year-group__list">
                  {group.items.map((publication) => (
                    <div key={publication.id} className="publications-year-group__item">
                      <PublicationCard publication={publication} mode="detailed" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="publications-page__empty">
            No publications are available for the current filter.
          </p>
        )}
      </section>
    </div>
  )
}

export default Publications
