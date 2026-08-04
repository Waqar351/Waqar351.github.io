import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { aboutContent } from '../../data/about'
import { researchAreas } from '../../data/research'
import { siteConfig } from '../../data/site'
import './About.css'

function About() {
  const areaById = new Map(researchAreas.map((area) => [area.id, area]))

  const interestAreas = (aboutContent.researchInterests?.areaIds ?? [])
    .map((areaId) => areaById.get(areaId))
    .filter(Boolean)

  const professionalLinks = (aboutContent.professionalLinks ?? [])
    .map((item) => ({
      ...item,
      href: siteConfig.social?.[item.socialKey],
    }))
    .filter((item) => item.href)

  return (
    <div className="about-page">
      <section className="about-page__intro">
        <SectionTitle
          title={aboutContent.heading}
          subtitle={aboutContent.subtitle}
          level="h1"
        />
        <div className="about-page__intro-copy">
          {(aboutContent.professionalIntroduction ?? []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-page__section">
        <SectionTitle title={aboutContent.researchProfile.title} level="h2" />
        <p>{aboutContent.researchProfile.summary}</p>
      </section>

      <section className="about-page__section">
        <SectionTitle title={aboutContent.researchInterests.title} level="h2" />
        {interestAreas.length ? (
          <ul className="about-page__interests" aria-label="Research interests">
            {interestAreas.map((area) => (
              <li key={area.id}>
                <h3>{area.title}</h3>
                <p>{area.shortDescription}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="about-page__empty">No research interests are currently listed.</p>
        )}
      </section>

      <section className="about-page__section">
        <SectionTitle title={aboutContent.currentDirection.title} level="h2" />
        <ul className="about-page__points">
          {(aboutContent.currentDirection.points ?? []).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="about-page__section">
        <SectionTitle title={aboutContent.researchBackground.title} level="h2" />
        <ul className="about-page__points">
          {(aboutContent.researchBackground.points ?? []).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="about-page__section">
        <SectionTitle title={aboutContent.researchApproach.title} level="h2" />
        <ul className="about-page__points">
          {(aboutContent.researchApproach.points ?? []).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="about-page__section">
        <SectionTitle title="Professional Links" level="h2" />
        {professionalLinks.length ? (
          <ul className="about-page__links">
            {professionalLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="about-page__empty">No professional links are currently available.</p>
        )}
      </section>

      <section className="about-page__section">
        <SectionTitle title="Explore" level="h2" />
        <div className="about-page__routes">
          {(aboutContent.relatedRoutes ?? []).map((route) => (
            <Link key={route.path} to={route.path} className="button-link">
              {route.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
