import { useMemo, useState } from 'react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import BlogCard from '../../components/BlogCard/BlogCard'
import { getAllPosts } from '../../lib/blog/posts'
import './Blog.css'

function Blog() {
  const posts = getAllPosts()
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(
    () => ['All', ...new Set(posts.map((post) => post.category))],
    [posts],
  )

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const searchable = [post.title, post.summary, post.category, ...post.tags]
        .join(' ')
        .toLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [activeCategory, posts, query])

  return (
    <div className="blog-page">
      <section className="blog-page__intro">
        <SectionTitle
          title="Technical Blog"
          subtitle="Research notes, methods, and practical perspectives"
          level="h1"
        />
        <p>
          Long-form writing on graph machine learning, spatio-temporal AI, explainable AI,
          visual analytics, dimensionality reduction, and quantification.
        </p>
      </section>

      <section aria-labelledby="blog-index-title">
        <div className="blog-page__index-header">
          <div>
            <h2 id="blog-index-title">Latest Articles</h2>
            <p>{filteredPosts.length} published {filteredPosts.length === 1 ? 'article' : 'articles'}</p>
          </div>
          <label className="blog-page__search">
            <span>Search articles</span>
            <input
              type="search"
              value={query}
              placeholder="Search by topic or keyword"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="blog-page__filters" role="toolbar" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'is-active' : ''}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length ? (
          <div className="blog-page__list">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="blog-page__empty">No articles match the current filters.</p>
        )}
      </section>
    </div>
  )
}

export default Blog

