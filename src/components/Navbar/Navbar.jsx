import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/site'
import './Navbar.css'

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const { pathname } = useLocation()

	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	return (
		<header className="site-header">
			<nav className="site-nav container" aria-label="Main navigation">
				<div className="site-nav__identity">
					<NavLink className="site-nav__name" to="/">
						{siteConfig.name}
					</NavLink>
					<p className="site-nav__role">{siteConfig.title}</p>
				</div>

				<button
					type="button"
					className="site-nav__toggle"
					aria-expanded={isOpen}
					aria-controls="site-navigation-list"
					onClick={() => setIsOpen((current) => !current)}
				>
					Menu
				</button>

				<ul
					id="site-navigation-list"
					className={`site-nav__links ${isOpen ? 'is-open' : ''}`}
				>
					{siteConfig.navigation.map((item) => (
						<li key={item.path} className="site-nav__item">
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									`site-nav__link ${item.path === '/cv' ? 'site-nav__link--cv' : ''} ${
										isActive ? 'is-active' : ''
									}`.trim()
								}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
