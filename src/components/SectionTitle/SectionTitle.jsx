import './SectionTitle.css'

function SectionTitle({ title, subtitle, level = 'h1', className = '' }) {
	const HeadingTag = level

	return (
		<header className={`section-title ${className}`.trim()}>
			<HeadingTag className="section-title__heading">{title}</HeadingTag>
			{subtitle ? <p className="section-title__subtitle">{subtitle}</p> : null}
		</header>
	)
}

export default SectionTitle
