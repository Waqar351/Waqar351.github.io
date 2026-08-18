import { Link } from 'react-router-dom'
import { formatPostDate } from '../../lib/blog/date'
import './BlogCard.css'

function BlogCard({ post, compact = false }) {
  return (
    <article className={`blog-card ${compact ? 'blog-card--compact' : ''}`.trim()}>
      <Link className="blog-card__image-link" to={`/blog/${post.slug}`} tabIndex={-1}>
        <img
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          width={post.featuredImage.width ?? 960}
          height={post.featuredImage.height ?? 540}
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="blog-card__content">
        <p className="blog-card__meta">
          <span>{post.category}</span>
          <span>{formatPostDate(post.date)}</span>
          <span>{post.readingTime} min read</span>
        </p>

        <h3 className="blog-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__summary">{post.summary}</p>

        <ul className="blog-card__tags" aria-label={`${post.title} tags`}>
          {post.tags.slice(0, compact ? 2 : 4).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default BlogCard
