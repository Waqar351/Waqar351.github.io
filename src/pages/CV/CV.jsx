import { useEffect, useMemo, useState } from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import PublicationCard from '../../components/PublicationCard/PublicationCard'
import { cvContent } from '../../data/cv'
import { projects } from '../../data/projects'
import { publications } from '../../data/publications'
import { researchAreas } from '../../data/research'
import { siteConfig } from '../../data/site'
import './CV.css'

function CV() {
  const [isCvPdfAvailable, setIsCvPdfAvailable] = useState(null)

  const researchById = useMemo(
    () => new Map(researchAreas.map((research) => [research.id, research])),
    [],
  )
  const projectsById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [],
  )
  const publicationsById = useMemo(
    () => new Map(publications.map((publication) => [publication.id, publication])),
    [],
  )

  useEffect(() => {
    let isMounted = true

    fetch(cvContent.download.filePath, { method: 'HEAD' })
      .then((response) => {
        if (isMounted) {
          setIsCvPdfAvailable(response.ok)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsCvPdfAvailable(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const researchExpertiseItems = cvContent.researchExpertise?.items ?? []
  const researchExpertiseAreas = (cvContent.researchExpertise?.areaIds ?? [])
    .map((areaId) => researchById.get(areaId))
    .filter(Boolean)

  const selectedPublications = (cvContent.selectedPublications?.publicationIds ?? [])
    .map((publicationId) => publicationsById.get(publicationId))
    .filter(Boolean)

  const academicProfiles = (cvContent.academicProfiles ?? [])
    .map((profile) => ({
      ...profile,
      href: siteConfig.social?.[profile.socialKey],
    }))
    .filter((profile) => profile.href)

  const awards = (cvContent.awards ?? []).map((award) => ({
    ...award,
    publication: publicationsById.get(award.publicationId),
  }))

  const experience = (cvContent.experience ?? []).map((entry) => ({
    ...entry,
    relatedResearch: (entry.relatedResearchIds ?? [])
      .map((researchId) => researchById.get(researchId))
      .filter(Boolean),
    relatedProjects: (entry.relatedProjectIds ?? [])
      .map((projectId) => projectsById.get(projectId))
      .filter(Boolean),
  }))

  return (
    <div className="cv-page">
      <section className="cv-page__header">
        <SectionTitle
          title={siteConfig.name}
          subtitle={cvContent.header.professionalTitle}
          level="h1"
        />
        <p className="cv-page__meta">{cvContent.header.location}</p>
      </section>

      <section className="cv-page__section">
        <SectionTitle title={cvContent.professionalProfile.title} level="h2" />
        <p className="cv-page__summary">{cvContent.professionalProfile.summary}</p>
      </section>

      <section className="cv-page__download" aria-labelledby="cv-download-title">
        <h2 id="cv-download-title">Download CV</h2>
        <p>
          A complete academic CV is available as a PDF for detailed publication history,
          appointments, and full scholarly record.
        </p>
        <p>
          <a className="button-link" href={cvContent.download.filePath} download>
            {cvContent.download.label}
          </a>
        </p>
        {isCvPdfAvailable === false ? (
          <p className="cv-page__download-note">
            CV PDF not found yet. Place the file at{' '}
            <code>{cvContent.download.expectedPublicPath}</code>.
          </p>
        ) : (
          <p className="cv-page__download-note">
            Expected location: <code>{cvContent.download.expectedPublicPath}</code>
          </p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Education" level="h2" />
        {(cvContent.education ?? []).length ? (
          <ul className="cv-page__list">
            {cvContent.education.map((item) => (
              <li key={`${item.degree}-${item.institution}`} className="cv-page__entry">
                <h3>{item.degree}</h3>
                <p className="cv-page__meta">
                  {item.institution} | {item.location} | {item.period}
                </p>
                {(item.details ?? []).length ? (
                  <ul className="cv-page__points">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No education entries are currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Research / Academic Experience" level="h2" />
        {experience.length ? (
          <ul className="cv-page__list">
            {experience.map((item) => (
              <li key={item.id} className="cv-page__entry">
                <h3>{item.role}</h3>
                <p className="cv-page__meta">
                  {item.organization} | {item.location} | {item.period}
                </p>

                {item.highlights?.length ? (
                  <>
                    <h4 className="cv-page__subsection-title">Highlights</h4>
                    <ul className="cv-page__points">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {item.relatedResearch.length ? (
                  <>
                    <h4 className="cv-page__subsection-title">Related Research Areas</h4>
                    <ul className="cv-page__chips">
                      {item.relatedResearch.map((research) => (
                        <li key={research.id}>{research.title}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {item.relatedProjects.length ? (
                  <>
                    <h4 className="cv-page__subsection-title">Related Projects</h4>
                    <ul className="cv-page__chips">
                      {item.relatedProjects.map((project) => (
                        <li key={project.id}>{project.title}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No experience entries are currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title={cvContent.researchExpertise.title} level="h2" />
        {researchExpertiseItems.length ? (
          <ul className="cv-page__chips" aria-label="Research interests">
            {researchExpertiseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No research expertise is currently available.</p>
        )}

        {researchExpertiseAreas.length ? (
          <ul className="cv-page__points">
            {researchExpertiseAreas.map((area) => (
              <li key={area.id}>{area.shortDescription}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Selected Publications" level="h2" />
        {selectedPublications.length ? (
          <div className="cv-page__publications" role="list">
            {selectedPublications.map((publication) => (
              <div key={publication.id} role="listitem" className="cv-page__publication-item">
                <PublicationCard publication={publication} />
              </div>
            ))}
          </div>
        ) : (
          <p className="cv-page__empty">No selected publications are currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Awards / Recognition" level="h2" />
        {awards.length ? (
          <ul className="cv-page__list">
            {awards.map((award) => (
              <li key={`${award.label}-${award.publicationId ?? 'item'}`} className="cv-page__entry">
                <h3>{award.label}</h3>
                <p className="cv-page__meta">
                  {[award.organization, award.category ?? award.year].filter(Boolean).join(' | ')}
                </p>
                {award.publication ? <p>{award.publication.title}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No awards are currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Technical Skills" level="h2" />
        {(cvContent.technicalExpertise ?? []).length ? (
          <ul className="cv-page__list">
            {cvContent.technicalExpertise.map((skillGroup) => (
              <li key={skillGroup.category} className="cv-page__entry">
                <h3>{skillGroup.category}</h3>
                <ul className="cv-page__skills">
                  {(skillGroup.items ?? []).map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No skills are currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title={cvContent.academicService.title} level="h2" />
        {(cvContent.academicService.points ?? []).length ? (
          <ul className="cv-page__points">
            {cvContent.academicService.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No academic service information is currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title={cvContent.languages.title} level="h2" />
        {(cvContent.languages.items ?? []).length ? (
          <ul className="cv-page__chips" aria-label="Languages">
            {cvContent.languages.items.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No language information is currently available.</p>
        )}
      </section>

      <section className="cv-page__section">
        <SectionTitle title="Academic / Professional Profiles" level="h2" />
        {academicProfiles.length ? (
          <ul className="cv-page__profiles">
            {academicProfiles.map((profile) => (
              <li key={profile.label}>
                <a href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-page__empty">No profile links are currently available.</p>
        )}
      </section>
    </div>
  )
}

export default CV
