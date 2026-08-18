import matter from 'gray-matter'
import { Marked, Renderer } from 'marked'

const wordsPerMinute = 220

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function createMarkdownRenderer() {
  const renderer = new Renderer()
  const seenHeadings = new Map()

  renderer.heading = function heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens)
    const plainText = tokens.map((token) => token.text ?? token.raw ?? '').join('')
    const baseId = slugify(plainText) || 'section'
    const count = seenHeadings.get(baseId) ?? 0
    const id = count ? `${baseId}-${count + 1}` : baseId
    seenHeadings.set(baseId, count + 1)
    return `<h${depth} id="${id}">${text}</h${depth}>\n`
  }

  return renderer
}

function calculateReadingTime(content) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return {
    wordCount,
    minutes: Math.max(1, Math.ceil(wordCount / wordsPerMinute)),
  }
}

function normalizeDate(value, field, sourcePath) {
  if (!value) {
    throw new Error(`Missing ${field} in ${sourcePath}`)
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${field} in ${sourcePath}`)
  }

  return date.toISOString().slice(0, 10)
}

function requireString(data, field, sourcePath) {
  if (typeof data[field] !== 'string' || !data[field].trim()) {
    throw new Error(`Missing or invalid ${field} in ${sourcePath}`)
  }

  return data[field].trim()
}

export function parseBlogPost(source, sourcePath = 'blog post') {
  const { data, content } = matter(source)
  const title = requireString(data, 'title', sourcePath)
  const slug = requireString(data, 'slug', sourcePath)
  const summary = requireString(data, 'summary', sourcePath)
  const category = requireString(data, 'category', sourcePath)
  const status = data.status ?? 'draft'

  if (!['draft', 'published'].includes(status)) {
    throw new Error(`Invalid status in ${sourcePath}; use draft or published`)
  }

  if (!Array.isArray(data.tags) || !data.tags.length) {
    throw new Error(`At least one tag is required in ${sourcePath}`)
  }

  if (!data.featuredImage?.src || !data.featuredImage?.alt) {
    throw new Error(`featuredImage.src and featuredImage.alt are required in ${sourcePath}`)
  }

  const reading = calculateReadingTime(content)
  const marked = new Marked({
    gfm: true,
    renderer: createMarkdownRenderer(),
  })

  return {
    ...data,
    title,
    slug,
    summary,
    category,
    status,
    tags: data.tags.map(String),
    date: normalizeDate(data.date, 'date', sourcePath),
    updated: data.updated ? normalizeDate(data.updated, 'updated', sourcePath) : null,
    readingTime: reading.minutes,
    wordCount: reading.wordCount,
    content,
    html: marked.parse(content),
    sourcePath,
  }
}
