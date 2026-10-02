import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogDatabase } from "../../../services/blogDatabase";
import "./index.css";

const UniversalBlog = () => {
  const { slug } = useParams();
  const blogPost = blogDatabase[slug];

  if (!blogPost) {
    return <Navigate to="/blog" replace />;
  }

  const source = sessionStorage.getItem("source") || "";
  if (blogPost.source && blogPost.source !== source) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blogPost.metaTitle || blogPost.title} | Yoowifi Blog</title>
        <meta
          name="description"
          content={blogPost.metaDescription || blogPost.excerpt}
        />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:type" content="article" />
        {blogPost.featuredImage && (
          <meta property="og:image" content={blogPost.featuredImage} />
        )}
        <link rel="canonical" href={`https://yoowifi.com/blog/${slug}`} />
      </Helmet>

      <div className="blog-container">
        {/* Optional Header Section */}
        {blogPost.showHeader && (
          <header className="blog-page-header">
            <div className="blog-metadata">
              {blogPost.publishDate && (
                <time dateTime={blogPost.publishDate} className="blog-date">
                  {new Date(blogPost.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {blogPost.author && (
                <span className="blog-author">By {blogPost.author}</span>
              )}
              {blogPost.readTime && (
                <span className="blog-read-time">
                  {blogPost.readTime} min read
                </span>
              )}
            </div>
          </header>
        )}

        {/* Main Blog Content - Renders HTML directly */}
        <article
          className="blog-content-wrapper"
          dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
        />

        {/* Optional Footer Section */}
        {blogPost.showFooter && (
          <footer className="blog-footer">
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="blog-tags">
                {blogPost.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="blog-cta">
              <a
                href="https://yoowifi.com/"
                className="blog-cta-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started with Yoowifi
              </a>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default UniversalBlog;
