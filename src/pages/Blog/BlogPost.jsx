import { Link, useParams } from 'react-router-dom'
import BlogCard from '../../components/BlogCard/BlogCard'
import { projects } from '../../data/projects'
import { publications } from '../../data/publications'
import { researchAreas } from '../../data/research'
import { formatPostDate } from '../../lib/blog/date'
import { getPostBySlug, getRelatedPosts } from '../../lib/blog/posts'
import './BlogPost.css'

function resolveItems(ids, items) {
  const byId = new Map(items.map((item) => [item.id, item]))
  return (ids ?? []).map((id) => byId.get(id)).filter(Boolean)
}

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="blog-post blog-post--missing">
        <p className="blog-post__eyebrow">Article not found</p>
        <h1>This blog post is unavailable.</h1>
        <p>It may be a draft, or its URL may have changed.</p>
        <Link className="button-link" to="/blog">Return to the blog</Link>
      </div>
    )
  }

  const relatedResearch = resolveItems(post.relatedResearch, researchAreas)
  const relatedProjects = resolveItems(post.relatedProjects, projects)
  const relatedPublications = resolveItems(post.relatedPublications, publications)
  const relatedPosts = getRelatedPosts(post)

  return (
    <article className="blog-post">
      <nav className="blog-post__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/blog">Blog</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{post.title}</span>
      </nav>

      <header className="blog-post__header">
        <p className="blog-post__eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="blog-post__summary">{post.summary}</p>
        <p className="blog-post__byline">
          <span>By Waqar Hassan</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
          <span>{post.wordCount.toLocaleString()} words</span>
        </p>
        <ul className="blog-post__tags" aria-label="Article tags">
          {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </header>

      <figure className="blog-post__hero">
        <img
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          width={post.featuredImage.width ?? 960}
          height={post.featuredImage.height ?? 540}
          decoding="async"
          fetchPriority="high"
        />
      </figure>

      <div
        className="blog-post__content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {(relatedResearch.length || relatedProjects.length || relatedPublications.length) ? (
        <aside className="blog-post__connections" aria-labelledby="article-connections-title">
          <div>
            <p className="blog-post__eyebrow">Portfolio connections</p>
            <h2 id="article-connections-title">Continue through the research</h2>
          </div>

          {relatedResearch.length ? (
            <section>
              <h3>Research areas</h3>
              <ul>
                {relatedResearch.map((item) => (
                  <li key={item.id}><Link to={`/research#${item.id}`}>{item.title}</Link></li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedProjects.length ? (
            <section>
              <h3>Projects</h3>
              <ul>
                {relatedProjects.map((item) => (
                  <li key={item.id}><Link to="/projects">{item.title}</Link></li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedPublications.length ? (
            <section>
              <h3>Publications</h3>
              <ul>
                {relatedPublications.map((item) => (
                  <li key={item.id}>
                    {item.links?.doi ? (
                      <a href={item.links.doi} target="_blank" rel="noreferrer">{item.title}</a>
                    ) : (
                      <Link to="/publications">{item.title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      ) : null}

      {relatedPosts.length ? (
        <section className="blog-post__related" aria-labelledby="related-articles-title">
          <h2 id="related-articles-title">Related articles</h2>
          <div>
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} compact />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

export default BlogPost
