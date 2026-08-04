import './PublicationCard.css'

function PublicationCard({ publication }) {
	const publicationLinks = Object.entries(publication.links ?? {}).filter(
		([, value]) => value,
	)

	return (
		<article className="publication-card">
			<header className="publication-card__header">
				<p className="publication-card__meta-top">
					<span>{publication.year ?? 'In review'}</span>
					<span>{publication.type}</span>
				</p>
				<h3 className="publication-card__title">{publication.title}</h3>
				<p className="publication-card__venue">{publication.venue}</p>
			</header>

			<p className="publication-card__authors">{publication.authors?.join(', ')}</p>
			<p className="publication-card__description">{publication.description}</p>

			<div className="publication-card__badges" aria-label="Publication notes">
				{publication.status ? <p>Status: {publication.status}</p> : null}
				{publication.award ? <p>Award: {publication.award}</p> : null}
			</div>

			{publicationLinks.length ? (
				<section aria-label={`${publication.title} links`} className="publication-card__links-wrap">
					<h4 className="publication-card__links-title">Links</h4>
					<ul className="publication-card__links">
						{publicationLinks.map(([label, value]) => (
								<li key={label}>
									<a href={value} target="_blank" rel="noreferrer">
										{label}
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
