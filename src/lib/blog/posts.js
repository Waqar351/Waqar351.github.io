import generatedPosts from 'virtual:blog-posts'

const allPosts = generatedPosts

const publishedPosts = import.meta.env.PROD
  ? allPosts.filter((post) => post.status === 'published')
  : allPosts

export function getAllPosts() {
  return publishedPosts
}

export function getPublishedPosts() {
  return allPosts.filter((post) => post.status === 'published')
}

export function getPostBySlug(slug) {
  return publishedPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(post, limit = 3) {
  const relatedIds = new Set(post.relatedPosts ?? [])

  return publishedPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length
      const sameCategory = candidate.category === post.category ? 2 : 0
      const explicit = relatedIds.has(candidate.slug) ? 10 : 0
      return { candidate, score: explicit + sameCategory + sharedTags }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
