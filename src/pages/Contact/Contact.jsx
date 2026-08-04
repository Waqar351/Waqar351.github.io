import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { siteConfig } from '../../data/site'

function Contact() {
  return (
    <section>
      <SectionTitle title="Contact" subtitle="Placeholder page" />
      <p>
        For inquiries, email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </section>
  )
}

export default Contact
