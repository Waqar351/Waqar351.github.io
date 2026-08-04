import './ResearchAreaDetail.css'

function ResearchAreaDetail({
  research,
  index,
  relatedProjects,
  relatedPublications,
}) {
  const areaNumber = String(index + 1).padStart(2, '0')

  return (
    <article className="research-detail" aria-labelledby={`${research.id}-title`}>
      <header className="research-detail__header">
        <p className="research-detail__number">{areaNumber}</p>
        <h3 id={`${research.id}-title`} className="research-detail__title">
          {research.title}
        </h3>
      </header>

      <p className="research-detail__description">
        {research.description ?? research.shortDescription}
      </p>

      {research.topics?.length ? (
        <section className="research-detail__group" aria-label={`${research.title} topics`}>
          <h4>Topics</h4>
          <ul className="research-detail__chips">
            {research.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {research.methods?.length ? (
        <section className="research-detail__group" aria-label={`${research.title} methods`}>
          <h4>Methods</h4>
          <ul className="research-detail__chips research-detail__chips--methods">
            {research.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="research-detail__group" aria-label={`${research.title} related projects`}>
        <h4>Related Projects</h4>
        {relatedProjects.length ? (
          <ul className="research-detail__refs">
            {relatedProjects.map((project) => (
              <li key={project.id}>
                <p className="research-detail__ref-title">{project.title}</p>
                <p className="research-detail__ref-meta">
                  {project.category}
                  {project.year ? ` (${project.year})` : ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="research-detail__empty">No linked projects yet.</p>
        )}
      </section>

      <section
        className="research-detail__group"
        aria-label={`${research.title} related publications`}
      >
        <h4>Related Publications</h4>
        {relatedPublications.length ? (
          <ul className="research-detail__refs">
            {relatedPublications.map((publication) => (
              <li key={publication.id}>
                <p className="research-detail__ref-title">{publication.title}</p>
                <p className="research-detail__ref-meta">
                  {publication.venue}
                  {publication.year ? ` (${publication.year})` : ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="research-detail__empty">No linked publications yet.</p>
        )}
      </section>
    </article>
  )
}

export default ResearchAreaDetail
