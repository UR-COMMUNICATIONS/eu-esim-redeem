import React from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../../services/blogDatabase";
import "./index.css";

const BlogListing = () => {
  const source = sessionStorage.getItem("source") || "";
  const blogs = getAllBlogs(source);

  return (
    <div className="blog-listing-container">
      <header className="blog-listing-header">
        <h1>Yoowifi Blog</h1>
        <p>
          Travel tips, guides, and connectivity solutions for modern travelers
        </p>
      </header>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.slug}`} key={blog.slug} className="blog-card">
            {blog.featuredImage && (
              <div className="blog-card-image">
                <img src={blog.featuredImage} alt={blog.title} loading="lazy" />
              </div>
            )}

            <div className="blog-card-content">
              <div className="blog-card-meta">
                {blog.publishDate && (
                  <time dateTime={blog.publishDate}>
                    {new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                {blog.readTime && (
                  <span className="blog-card-read-time">
                    {blog.readTime} min read
                  </span>
                )}
              </div>

              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-excerpt">{blog.excerpt}</p>

              {blog.tags && blog.tags.length > 0 && (
                <div className="blog-card-tags">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="blog-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="blog-empty-state">
          <p>No blog posts available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default BlogListing;
