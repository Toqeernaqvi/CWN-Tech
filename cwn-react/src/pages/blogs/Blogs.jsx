import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@components/seo/Seo";
import BlogCard from "@components/blog/BlogCard";
import BlogFilters from "@components/blog/BlogFilters";
import BlogPagination from "@components/blog/BlogPagination";
import { fetchCategories, fetchPosts } from "../../lib/blogApi";

export function Blogs() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchPosts({ search, category, page, limit: 9 })
      .then((res) => {
        setPosts(res.data || []);
        setMeta(res.meta || { pages: 1, total: 0 });
      })
      .catch((err) => {
        setError(err.message || "Could not load posts");
      })
      .finally(() => setLoading(false));
  }, [search, category, page]);

  const featured = useMemo(() => posts[0], [posts]);
  const rest = useMemo(() => posts.slice(1), [posts]);

  return (
    <main className="bg-light">
      <Seo
        title="Blogs | Code With Naqvi"
        description="Read the latest articles and tutorials on software and web development from CWN."
        keywords="blogs, tutorials, Code With Naqvi"
      />

      <section className="section pt-20 pb-10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-main-shade font-semibold">
            Weekly Insights
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-heading">
            Thoughts, tutorials, and shipping notes from CWN
          </h1>
          <p className="text-lg text-sub-para max-w-3xl mx-auto">
            Curated articles on frontend, backend, and career. Search, filter,
            and dive deep into the stacks we use daily.
          </p>
        </div>
      </section>

      <section className="section pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <BlogFilters
            categories={categories}
            activeCategory={category}
            onCategoryChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          {error && (
            <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {featured && (
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="rounded-3xl overflow-hidden bg-white shadow-3xl border border-light-gray relative">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-main via-main-tint to-tertiary" />
                {featured.cover_url ? (
                  <img
                    src={featured.cover_url}
                    alt={featured.title}
                    className="w-full h-72 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-72 bg-main-mint flex items-center justify-center text-main-shade font-semibold">
                    No image
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-main-shade">
                    <span className="px-3 py-1 bg-main-mint rounded-full border border-main-tint/60">
                      {featured.category_name || "General"}
                    </span>
                    {featured.published_at && (
                      <span className="text-sub-para">
                        {new Date(featured.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-heading">
                    {featured.title}
                  </h2>
                  <p className="text-para leading-7">
                    {featured.excerpt || "No description provided."}
                  </p>
                  <Link
                    to={`/blogs/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-main font-semibold hover:gap-3 transition-all"
                  >
                    Read the article
                    <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {rest.slice(0, 4).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {!featured && !loading && (
            <div className="text-center text-sub-para">No posts yet.</div>
          )}

          {loading && (
            <div className="text-center text-sub-para">Loading posts...</div>
          )}

          {!loading && rest.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {rest.slice(4).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <BlogPagination
            page={page}
            pages={meta.pages || 1}
            onChange={(p) => setPage(p)}
          />
        </div>
      </section>
    </main>
  );
}
