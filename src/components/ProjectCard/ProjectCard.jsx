import { Link } from 'react-router-dom'
import './ProjectCard.css'

function ProjectCard({ project, mode = 'compact' }) {
	const projectLinks = Object.entries(project.links ?? {}).filter(([, value]) => value)
	const relatedResearch = project.relatedResearchData ?? []
	const relatedPublications = project.relatedPublicationsData ?? []
	const relatedPosts = project.relatedPostsData ?? []
	const isDetailed = mode === 'detailed'

	return (
		<article className={`project-card ${isDetailed ? 'project-card--detailed' : ''}`.trim()}>
			<div className="project-card__visual">
				{project.image ? (
					<img
						src={project.image}
						alt={project.imageAlt ?? ''}
						loading="lazy"
						decoding="async"
						width="1280"
						height="720"
					/>
				) : null}
			</div>

			<header className="project-card__header">
				<h3 className="project-card__title">{project.title}</h3>
				<p className="project-card__meta">
					{project.category}
					{project.year ? ` (${project.year})` : ''}
				</p>
				{project.featured && isDetailed ? (
					<p className="project-card__featured">Featured Project</p>
				) : null}
			</header>

			<p className="project-card__description">
				{isDetailed ? project.description : project.shortDescription ?? project.description}
			</p>

			{project.technologies?.length ? (
				<section aria-label={`${project.title} technologies`} className="project-card__section">
					<h4 className="project-card__section-title">Technologies</h4>
					<ul className="project-card__tags">
						{project.technologies.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				</section>
			) : null}

			{relatedResearch.length && isDetailed ? (
				<section aria-label={`${project.title} related research`} className="project-card__section">
					<h4 className="project-card__section-title">Related Research</h4>
					<ul className="project-card__chips">
						{relatedResearch.map((research) => (
							<li key={research.id}>
								<Link to={`/research#${research.id}`}>{research.title}</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}

			{relatedPublications.length && isDetailed ? (
				<section aria-label={`${project.title} related publications`} className="project-card__section">
					<h4 className="project-card__section-title">Related Publications</h4>
					<ul className="project-card__publication-refs">
						{relatedPublications.map((publication) => {
							const publicationDoi = publication.links?.doi

							return (
								<li key={publication.id}>
									<p className="project-card__publication-title">{publication.title}</p>
									<p className="project-card__publication-meta">
										{publication.venue}
										{publication.year ? ` (${publication.year})` : ''}
									</p>
									{publicationDoi ? (
										<a href={publicationDoi} target="_blank" rel="noreferrer">
											Read publication →
										</a>
									) : (
										<Link to="/publications">Read publication →</Link>
									)}
								</li>
							)
						})}
					</ul>
				</section>
			) : null}

			{relatedPosts.length && isDetailed ? (
				<section aria-label={`${project.title} related articles`} className="project-card__section">
					<h4 className="project-card__section-title">Related Articles</h4>
					<ul className="project-card__publication-refs">
						{relatedPosts.map((post) => (
							<li key={post.slug}>
								<p className="project-card__publication-title">{post.title}</p>
								<Link to={`/blog/${post.slug}`}>Read article →</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}

			{projectLinks.length ? (
				<section aria-label={`${project.title} links`} className="project-card__section">
					<h4 className="project-card__section-title">Links</h4>
					<ul className="project-card__links">
						{projectLinks.map(([label, value]) => (
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

export default ProjectCard
