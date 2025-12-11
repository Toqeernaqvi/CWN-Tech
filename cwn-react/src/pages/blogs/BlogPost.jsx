import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seo from "@components/seo/Seo";
import { fetchPostBySlug } from "../../lib/blogApi";

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPostBySlug(slug)
      .then((res) => setPost(res.data))
      .catch((err) => setError(err.message || "Could not load article"));
  }, [slug]);

  if (error) {
    return (
      <main className="section">
        <div className="max-w-4xl mx-auto py-20 text-center text-red-600">
          {error}
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="section">
        <div className="max-w-4xl mx-auto py-20 text-center text-sub-para">
          Loading article...
        </div>
      </main>
    );
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString()
    : null;

  return (
    <main>
      <Seo
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || ""}
        keywords={post.seo_keywords || ""}
      />

      <article className="section max-w-5xl mx-auto py-16 space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-main-shade">
            <span className="px-3 py-1 bg-main-mint rounded-full border border-main-tint/60">
              {post.category_name || "General"}
            </span>
            {date && <span className="text-sub-para">{date}</span>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-heading">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-sub-para max-w-3xl mx-auto">{post.excerpt}</p>
          )}
        </div>

        {post.cover_url && (
          <div className="rounded-3xl overflow-hidden shadow-3xl border border-light-gray">
            <img
              src={post.cover_url}
              alt={post.title}
              className="w-full h-[360px] object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="max-w-none text-para leading-7 space-y-4">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </article>
    </main>
  );
}
