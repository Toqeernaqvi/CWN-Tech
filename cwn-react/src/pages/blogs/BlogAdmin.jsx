import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@components/seo/Seo";
import BlogEditorForm from "@components/blog/BlogEditorForm";
import BlogPagination from "@components/blog/BlogPagination";
import { deletePost, fetchCategories, fetchPosts } from "../../lib/blogApi";

export function BlogAdmin() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("cwn_admin_token") || ""
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ pages: 1, total: 0 });

  useEffect(() => {
    localStorage.setItem("cwn_admin_token", adminToken);
  }, [adminToken]);

  const loadCategories = () =>
    fetchCategories()
      .then((res) => {
        const data = res.data || [];
        setCategories(data);
        return data;
      })
      .catch(() => {
        return [];
      });

  const loadPosts = (nextPage = page, nextSearch = search) => {
    setPostsLoading(true);
    setPostsError("");
    fetchPosts({ limit: 5, page: nextPage, search: nextSearch })
      .then((res) => {
        setPosts(res.data || []);
        setMeta(res.meta || { pages: 1, total: 0 });
      })
      .catch((err) => setPostsError(err.message || "Could not load posts"))
      .finally(() => setPostsLoading(false));
  };

  const handleDelete = async (post) => {
    if (!adminToken) {
      setPostsError("Admin token is required to delete posts.");
      return;
    }
    const confirmed = window.confirm(`Delete "${post.title}"?`);
    if (!confirmed) return;
    try {
      setPostsError("");
      await deletePost(post.id, adminToken);
      if (editingPost?.id === post.id) {
        setEditingPost(null);
      }
      loadPosts();
    } catch (err) {
      setPostsError(err.message || "Could not delete post");
    }
  };

  const handleSaved = () => {
    loadPosts(page, search);
    if (editingPost) {
      setEditingPost(null);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPosts(page, search);
  }, [page, search]);

  return (
    <main className="bg-light min-h-screen">
      <Seo
        title="Blog Editor | Code With Naqvi"
        description="Create and publish new blog posts for Code With Naqvi."
        keywords="blog, editor, admin"
      />
      <section className="section py-14">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-main-shade font-semibold">
              Admin
            </p>
            <h1 className="text-3xl font-semibold text-heading">Write a new post</h1>
            <p className="text-sub-para">
              Title, slug, excerpt, cover, category, rich text body, and SEO tags in one place.
            </p>
          </div>
          <BlogEditorForm
            categories={categories}
            adminToken={adminToken}
            onAdminTokenChange={setAdminToken}
            post={editingPost}
            onSaved={handleSaved}
            onCancelEdit={() => setEditingPost(null)}
          />
        </div>
      </section>

      <section className="section pb-20">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.28em] text-main-shade font-semibold">
              Existing posts
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-heading">Edit or delete</h2>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl border border-light-gray text-heading font-semibold hover:border-main transition"
              >
                New post
              </button>
            </div>
            <p className="text-sub-para">
              Select a post to load it into the editor, or delete posts you no longer need.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-[420px]">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search posts by title or content"
                className="w-full rounded-full border border-light-gray bg-white pl-4 pr-11 py-3 text-para shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sub-para pointer-events-none">
                グ
              </span>
            </div>
            <div className="text-sm text-sub-para">
              Total posts: {meta.total ?? posts.length}
            </div>
          </div>

          {postsError && (
            <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-xl">
              {postsError}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-3xl border border-light-gray overflow-hidden min-h-[360px] flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-light-gray">
                <thead className="bg-main-mint/40">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-heading uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-heading uppercase tracking-wide">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-heading uppercase tracking-wide">
                      Published
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-heading uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray bg-white">
                  {postsLoading && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-sm text-sub-para text-center">
                        Loading posts...
                      </td>
                    </tr>
                  )}
                  {!postsLoading && posts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-sm text-sub-para text-center">
                        No posts found.
                      </td>
                    </tr>
                  )}
                  {posts.map((post) => {
                    const date = post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : "Draft";
                    return (
                      <tr key={post.id} className="hover:bg-main-mint/10 transition">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-heading">{post.title}</div>
                          <div className="text-xs text-sub-para">{post.slug}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-sub-para">
                          {post.category_name || "General"}
                        </td>
                        <td className="px-4 py-3 text-sm text-sub-para">{date}</td>
                        <td className="px-4 py-3 text-sm text-right space-x-2">
                          <Link
                            to={`/blogs/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg border border-light-gray text-heading font-semibold hover:border-main transition"
                          >
                            Preview
                          </Link>
                          <button
                            type="button"
                            onClick={() => setEditingPost(post)}
                            className="px-3 py-2 rounded-lg border border-light-gray text-heading font-semibold hover:border-main transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            className="px-3 py-2 rounded-lg border border-red-200 text-red-700 font-semibold hover:border-red-400 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <BlogPagination page={page} pages={meta.pages || 1} onChange={(p) => setPage(p)} />
          </div>
        </div>
      </section>
    </main>
  );
}
