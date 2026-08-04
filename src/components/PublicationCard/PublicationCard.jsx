import { Link } from 'react-router-dom'
import './PublicationCard.css'

function PublicationCard({ publication, mode = 'compact' }) {
	const publicationLinks = Object.entries(publication.links ?? {}).filter(
		([, value]) => value,
	)
	const relatedResearch = publication.relatedResearchData ?? []
	const relatedProjects = publication.relatedProjectsData ?? []
	const isDetailed = mode === 'detailed'

	const getLinkLabel = (label) => {
		if (label === 'doi') {
			return 'DOI'
		}

		return label.charAt(0).toUpperCase() + label.slice(1)
	}

	return (
		<article className={`publication-card ${isDetailed ? 'publication-card--detailed' : ''}`.trim()}>
			<header className="publication-card__header">
				<p className="publication-card__meta-top">
					<span>{publication.year ?? 'In review'}</span>
					<span>{publication.type}</span>
				</p>
				<h3 className="publication-card__title">{publication.title}</h3>
				<p className="publication-card__venue">{publication.venue}</p>
			</header>

			<p className="publication-card__authors">{publication.authors?.join(', ')}</p>
			{publication.description ? (
				<p className="publication-card__description">{publication.description}</p>
			) : null}

			{publication.status || publication.award ? (
				<div className="publication-card__badges" aria-label="Publication notes">
					{publication.status ? <p>Status: {publication.status}</p> : null}
					{publication.award ? <p>Award: {publication.award}</p> : null}
				</div>
			) : null}

			{relatedResearch.length && isDetailed ? (
				<section
					aria-label={`${publication.title} related research`}
					className="publication-card__relations"
				>
					<h4 className="publication-card__links-title">Related Research</h4>
					<ul className="publication-card__chips">
						{relatedResearch.map((research) => (
							<li key={research.id}>
								<Link to={`/research#${research.id}`}>{research.title}</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}

			{relatedProjects.length && isDetailed ? (
				<section
					aria-label={`${publication.title} related projects`}
					className="publication-card__relations"
				>
					<h4 className="publication-card__links-title">Related Projects</h4>
					<ul className="publication-card__chips">
						{relatedProjects.map((project) => (
							<li key={project.id}>
								<Link to="/projects">{project.title}</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}

			{publicationLinks.length ? (
				<section aria-label={`${publication.title} links`} className="publication-card__links-wrap">
					<h4 className="publication-card__links-title">Links</h4>
					<ul className="publication-card__links">
						{publicationLinks.map(([label, value]) => (
								<li key={label}>
									<a href={value} target="_blank" rel="noreferrer">
										{getLinkLabel(label)}
									</a>
								</li>
						))}
					</ul>
				</section>
			) : null}
		</article>
	)
}

export default PublicationCard
