import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { publications } from '../../data/publications'
import { seoByPath } from '../../data/seo'
import { siteConfig } from '../../data/site'
import { getPostBySlug } from '../../lib/blog/posts'

const structuredDataId = 'site-structured-data'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

function createPersonData() {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'AI and Machine Learning Researcher',
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.social),
  }
}

function createStructuredData(pathname, metadata, canonicalUrl, post) {
  const person = createPersonData()
  const website = {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: `${siteConfig.name} Academic Research Portfolio`,
    url: siteConfig.url,
    author: { '@id': person['@id'] },
  }
  const page = {
    '@type': pathname === '/about'
      ? 'ProfilePage'
      : pathname === '/publications' || pathname === '/blog'
        ? 'CollectionPage'
        : post
          ? 'WebPage'
          : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: metadata.title,
    description: metadata.description,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': person['@id'] },
  }

  if (pathname === '/about') {
    page.mainEntity = { '@id': person['@id'] }
  }

  if (pathname === '/publications') {
    page.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: publications.length,
      itemListElement: publications.map((publication, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'ScholarlyArticle',
          headline: publication.title,
          datePublished: String(publication.year),
          author: publication.authors.map((name) => ({ '@type': 'Person', name })),
          ...(publication.links?.doi ? { url: publication.links.doi } : {}),
        },
      })),
    }
  }

  if (pathname === '/blog') {
    page.mainEntity = {
      '@type': 'Blog',
      name: `${siteConfig.name} Technical Blog`,
      url: canonicalUrl,
      author: { '@id': person['@id'] },
    }
  }

  const graph = [website, person, page]

  if (post) {
    const article = {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      ...(post.updated ? { dateModified: post.updated } : {}),
      image: new URL(post.featuredImage.src, siteConfig.url).href,
      author: { '@id': person['@id'] },
      mainEntityOfPage: { '@id': page['@id'] },
      articleSection: post.category,
      keywords: post.tags.join(', '),
      wordCount: post.wordCount,
    }
    page.mainEntity = { '@id': article['@id'] }
    graph.push(article)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname
    const postSlug = normalizedPath.startsWith('/blog/')
      ? normalizedPath.slice('/blog/'.length)
      : null
    const post = postSlug ? getPostBySlug(postSlug) : null
    const metadata = post
      ? {
          title: post.seo?.title ?? `${post.title} | ${siteConfig.name}`,
          description: post.seo?.description ?? post.summary,
        }
      : seoByPath[normalizedPath] ?? seoByPath['/']
    const canonicalUrl = new URL(normalizedPath === '/' ? '/' : normalizedPath, siteConfig.url).href
    const imageUrl = post
      ? new URL(post.featuredImage.src, siteConfig.url).href
      : new URL('/images/profile-research-hero.webp', siteConfig.url).href

    document.title = metadata.title
    setMeta('name', 'description', metadata.description)
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', post ? 'article' : 'website')
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', metadata.title)
    setMeta('name', 'twitter:description', metadata.description)
    setMeta('name', 'twitter:image', imageUrl)
    setCanonical(canonicalUrl)

    let script = document.getElementById(structuredDataId)

    if (!script) {
      script = document.createElement('script')
      script.id = structuredDataId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(
      createStructuredData(normalizedPath, metadata, canonicalUrl, post),
    )
  }, [pathname])

  return null
}

export default Seo
