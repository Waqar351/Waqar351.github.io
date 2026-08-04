import SectionTitle from '../../components/SectionTitle/SectionTitle'
import PublicationCard from '../../components/PublicationCard/PublicationCard'
import { publications } from '../../data/publications'

function Publications() {
  return (
    <section>
      <SectionTitle title="Publications" subtitle="Peer-reviewed and preprint outputs" />
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </section>
  )
}

export default Publications
