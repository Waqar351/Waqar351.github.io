import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { contactContent } from '../../data/contact'
import { siteConfig } from '../../data/site'
import './Contact.css'

function Contact() {
  const profileLinks = (contactContent.profiles ?? [])
    .map((profile) => ({
      ...profile,
      href: siteConfig.social?.[profile.socialKey],
    }))
    .filter((profile) => profile.href)

  return (
    <div className="contact-page">
      <section className="contact-page__intro">
        <SectionTitle
          title={contactContent.heading}
          subtitle={contactContent.subtitle}
          level="h1"
        />
        {(contactContent.introduction ?? []).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="contact-page__section" aria-labelledby="contact-email-heading">
        <h2 id="contact-email-heading">Email</h2>
        <div className="contact-page__card">
          <p className="contact-page__label">{contactContent.email.label}</p>
          <a className="contact-page__email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
      </section>

      <section className="contact-page__section" aria-labelledby="contact-profiles-heading">
        <h2 id="contact-profiles-heading">Academic / Professional Profiles</h2>
        {profileLinks.length ? (
          <ul className="contact-page__profiles">
            {profileLinks.map((profile) => (
              <li key={profile.label}>
                <a href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="contact-page__empty">No profile links are currently available.</p>
        )}
      </section>

      <section className="contact-page__section" aria-labelledby="contact-navigation-heading">
        <h2 id="contact-navigation-heading">Explore Research</h2>
        {(contactContent.relatedRoutes ?? []).length ? (
          <ul className="contact-page__routes">
            {contactContent.relatedRoutes.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="button-link">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="contact-page__empty">No related links are currently available.</p>
        )}
      </section>
    </div>
  )
}

export default Contact
