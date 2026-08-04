import { siteConfig } from '../../data/site'
import './Footer.css'

function Footer() {
	const socialEntries = Object.entries(siteConfig.social ?? {}).filter(([, url]) => url)

	return (
		<footer className="site-footer">
			<div className="site-footer__inner container">
			<p className="site-footer__name">
				{new Date().getFullYear()} {siteConfig.name}
			</p>
			<p className="site-footer__role">{siteConfig.title}</p>
			<p className="site-footer__contact">
				<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
			</p>

			{socialEntries.length ? (
				<ul className="site-footer__social">
					{socialEntries.map(([name, url]) => (
						<li key={name}>
							<a href={url} target="_blank" rel="noreferrer">
								{name}
							</a>
						</li>
					))}
				</ul>
			) : null}
			</div>
		</footer>
	)
}

export default Footer
