import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { seoByPath } from './src/data/seo.js'
import { siteConfig } from './src/data/site.js'
import { parseBlogPost } from './src/lib/blog/markdown.js'

const virtualBlogId = 'virtual:blog-posts'
const resolvedVirtualBlogId = `\0${virtualBlogId}`

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function loadBlogPosts() {
  const contentDir = path.resolve(process.cwd(), 'src/content/blog')

  if (!fs.existsSync(contentDir)) {
    return []
  }

  return fs.readdirSync(contentDir)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const sourcePath = path.join(contentDir, filename)
      return parseBlogPost(fs.readFileSync(sourcePath, 'utf8'), sourcePath)
    })
    .sort((left, right) => right.date.localeCompare(left.date))
}

function blogContentPlugin() {
  return {
    name: 'blog-content',
    resolveId(id) {
      return id === virtualBlogId ? resolvedVirtualBlogId : null
    },
    load(id) {
      if (id !== resolvedVirtualBlogId) {
        return null
      }

      const contentDir = path.resolve(process.cwd(), 'src/content/blog')
      if (fs.existsSync(contentDir)) {
        fs.readdirSync(contentDir)
          .filter((filename) => filename.endsWith('.md'))
          .forEach((filename) => this.addWatchFile(path.join(contentDir, filename)))
      }

      return `export default ${JSON.stringify(loadBlogPosts())}`
    },
  }
}

function applyRouteMetadata(html, route, metadata) {
  const canonicalUrl = new URL(route === '/' ? '/' : route, siteConfig.url).href
  const title = escapeAttribute(metadata.title)
  const description = escapeAttribute(metadata.description)
  const imageUrl = metadata.image
    ? new URL(metadata.image, siteConfig.url).href
    : new URL('/images/profile-research-hero.webp', siteConfig.url).href

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${description}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/s, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/s, `<meta property="og:type" content="${metadata.type ?? 'website'}" />`)
    .replace(/<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/>/s, '<meta name="twitter:card" content="summary_large_image" />')
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/s, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s, `<meta name="twitter:description" content="${description}" />`)
    .replace('</head>', `    <meta property="og:image" content="${imageUrl}" />\n    <meta name="twitter:image" content="${imageUrl}" />\n    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`)
}

function createBlogPostingData(post, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    mainEntityOfPage: canonicalUrl,
    image: new URL(post.featuredImage.src, siteConfig.url).href,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.wordCount,
  }
}

function applyStaticPostContent(html, post, route) {
  const canonicalUrl = new URL(route, siteConfig.url).href
  const structuredData = JSON.stringify(createBlogPostingData(post, canonicalUrl)).replaceAll('<', '\\u003c')
  const article = `
    <article class="blog-post blog-post--static">
      <header class="blog-post__header">
        <p class="blog-post__eyebrow">${escapeXml(post.category)}</p>
        <h1>${escapeXml(post.title)}</h1>
        <p class="blog-post__summary">${escapeXml(post.summary)}</p>
        <p class="blog-post__byline">By ${escapeXml(siteConfig.name)} · ${escapeXml(post.date)} · ${post.readingTime} min read</p>
      </header>
      <figure class="blog-post__hero">
        <img src="${escapeAttribute(post.featuredImage.src)}" alt="${escapeAttribute(post.featuredImage.alt)}" width="${post.featuredImage.width ?? 960}" height="${post.featuredImage.height ?? 540}" />
      </figure>
      <div class="blog-post__content">${post.html}</div>
    </article>`

  return html
    .replace('<div id="root"></div>', `<div id="root">${article}</div>`)
    .replace('</head>', `    <script type="application/ld+json">${structuredData}</script>\n  </head>`)
}

function applyStaticBlogIndex(html, posts) {
  const items = posts.map((post) => `
      <article class="blog-card">
        <div class="blog-card__content">
          <p class="blog-card__meta">${escapeXml(post.category)} · ${escapeXml(post.date)} · ${post.readingTime} min read</p>
          <h2 class="blog-card__title"><a href="/blog/${escapeAttribute(post.slug)}">${escapeXml(post.title)}</a></h2>
          <p class="blog-card__summary">${escapeXml(post.summary)}</p>
        </div>
      </article>`).join('')
  const content = `
    <main class="blog-page blog-page--static">
      <section class="blog-page__intro">
        <h1>Technical Blog</h1>
        <p>Research notes, methods, and practical perspectives on graph machine learning, spatio-temporal AI, explainable AI, and visual analytics.</p>
      </section>
      <section class="blog-page__list" aria-label="Published articles">${items}</section>
    </main>`
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
}

function writeRouteHtml(distDir, route, html) {
  if (route === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html)
    return
  }

  const routeDir = path.join(distDir, route.replace(/^\//, ''))
  fs.mkdirSync(routeDir, { recursive: true })
  fs.writeFileSync(path.join(routeDir, 'index.html'), html)
}

function writeSitemap(distDir, posts) {
  const entries = [
    ...Object.keys(seoByPath).map((route) => ({ route })),
    ...posts.map((post) => ({ route: `/blog/${post.slug}`, lastmod: post.updated ?? post.date })),
  ]
  const urls = entries.map(({ route, lastmod }) => {
    const location = new URL(route === '/' ? '/' : route, siteConfig.url).href
    return `  <url>\n    <loc>${escapeXml(location)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
  }).join('\n')
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
}

function writeRssFeed(distDir, posts) {
  const blogUrl = new URL('/blog', siteConfig.url).href
  const items = posts.map((post) => {
    const url = new URL(`/blog/${post.slug}`, siteConfig.url).href
    return `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${escapeXml(url)}</link>\n      <guid>${escapeXml(url)}</guid>\n      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>\n      <description>${escapeXml(post.summary)}</description>\n      <category>${escapeXml(post.category)}</category>\n    </item>`
  }).join('\n')
  fs.writeFileSync(path.join(distDir, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(siteConfig.name)} Technical Blog</title>\n    <link>${escapeXml(blogUrl)}</link>\n    <description>${escapeXml(seoByPath['/blog'].description)}</description>\n    <language>en</language>\n${items}\n  </channel>\n</rss>\n`)
}

function staticPagesPlugin() {
  return {
    name: 'github-pages-static-content',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist')
      const indexPath = path.join(distDir, 'index.html')

      if (!fs.existsSync(indexPath)) {
        return
      }

      const baseHtml = fs.readFileSync(indexPath, 'utf8')
      const posts = loadBlogPosts().filter((post) => post.status === 'published')

      for (const [route, metadata] of Object.entries(seoByPath)) {
        const routeHtml = applyRouteMetadata(baseHtml, route, metadata)
        writeRouteHtml(
          distDir,
          route,
          route === '/blog' ? applyStaticBlogIndex(routeHtml, posts) : routeHtml,
        )
      }

      for (const post of posts) {
        const route = `/blog/${post.slug}`
        const metadata = {
          title: post.seo?.title ?? `${post.title} | ${siteConfig.name}`,
          description: post.seo?.description ?? post.summary,
          image: post.featuredImage.src,
          type: 'article',
        }
        const postHtml = applyStaticPostContent(applyRouteMetadata(baseHtml, route, metadata), post, route)
        writeRouteHtml(distDir, route, postHtml)
      }

      fs.writeFileSync(path.join(distDir, '404.html'), applyRouteMetadata(baseHtml, '/', seoByPath['/']))
      writeSitemap(distDir, posts)
      writeRssFeed(distDir, posts)
    },
  }
}

export default defineConfig({
  plugins: [blogContentPlugin(), react(), staticPagesPlugin()],
})
