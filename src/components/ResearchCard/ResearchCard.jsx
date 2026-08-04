
import './ResearchCard.css'

function ResearchCard({ research, index }) {
	const researchIndex = String((index ?? 0) + 1).padStart(2, '0')

	return (
		<article className="research-card">
			<header className="research-card__header">
				<p className="research-card__index">{researchIndex}</p>
				<h3 className="research-card__title">{research.title}</h3>
			</header>

			<p className="research-card__description">{research.shortDescription}</p>

			{research.topics?.length ? (
				<section aria-label={`${research.title} topics`} className="research-card__topics-wrap">
					<h4 className="research-card__topics-title">Topics</h4>
					<ul className="research-card__topics">
						{research.topics.map((topic) => (
							<li key={topic}>{topic}</li>
						))}
					</ul>
				</section>
			) : null}
		</article>
	)
}

export default ResearchCard
