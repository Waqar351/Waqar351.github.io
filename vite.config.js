import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { seoByPath } from './src/data/seo.js'
import { siteConfig } from './src/data/site.js'

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function applyRouteMetadata(html, route, metadata) {
  const canonicalUrl = new URL(route === '/' ? '/' : route, siteConfig.url).href
  const title = escapeAttribute(metadata.title)
  const description = escapeAttribute(metadata.description)

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:description" content="${description}" />`,
    )
    .replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-route-metadata',
      closeBundle() {
        const distDir = path.resolve(process.cwd(), 'dist')
        const indexPath = path.join(distDir, 'index.html')
        const fallbackPath = path.join(distDir, '404.html')

        if (fs.existsSync(indexPath)) {
          const baseHtml = fs.readFileSync(indexPath, 'utf8')

          for (const [route, metadata] of Object.entries(seoByPath)) {
            const routeHtml = applyRouteMetadata(baseHtml, route, metadata)

            if (route === '/') {
              fs.writeFileSync(indexPath, routeHtml)
              fs.writeFileSync(fallbackPath, routeHtml)
              continue
            }

            const routeDir = path.join(distDir, route.slice(1))
            fs.mkdirSync(routeDir, { recursive: true })
            fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml)
          }
        }
      },
    },
  ],
})
