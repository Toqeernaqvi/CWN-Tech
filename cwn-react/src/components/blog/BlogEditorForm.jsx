import { useEffect, useState } from "react";
import {
  createPost,
  updatePost,
  uploadImage,
} from "../../lib/blogApi";
import RichTextEditor from "./RichTextEditor";

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_url: "",
  category_id: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  published_at: "",
};

const formatDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
};

const formatDisplayDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
};

export default function BlogEditorForm({
  categories = [],
  adminToken = "",
  onAdminTokenChange,
  post,
  onSaved,
  onCancelEdit,
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (post?.id) {
      setForm({
        ...initialForm,
        ...post,
        category_id: post.category_id ?? "",
        published_at: formatDateInput(post.published_at),
      });
    } else {
      setForm(initialForm);
    }
  }, [post]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const autoSlug = () => {
    if (!form.title) return;
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    updateField("slug", slug);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    try {
      setSaving(true);
      const res = await uploadImage(file, adminToken);
      updateField("cover_url", res.url);
      setMessage("Image uploaded");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!adminToken) {
      setError("Admin token is required to save.");
      return;
    }
    try {
      setSaving(true);
      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
      };
      if (post?.id) {
        await updatePost(post.id, payload, adminToken);
        setMessage("Post updated");
        onSaved?.();
      } else {
        await createPost(payload, adminToken);
        setMessage("Post saved");
        setForm(initialForm);
        onSaved?.();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const isEditing = Boolean(post?.id);
  const previewDate = formatDisplayDate(form.published_at);

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-3xl border border-light-gray p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-heading">Admin Token</label>
          <input
            type="password"
            value={adminToken}
            onChange={(e) => onAdminTokenChange?.(e.target.value)}
            className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
            placeholder="Paste your bearer token"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                onBlur={autoSlug}
                required
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                required
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Description / Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Short preview text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Cover Image</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={form.cover_url}
                  onChange={(e) => updateField("cover_url", e.target.value)}
                  className="flex-1 rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
                  placeholder="https://example.com/cover.jpg"
                />
                <label className="inline-flex items-center px-4 py-2 rounded-xl border border-light-gray bg-main-mint text-main-shade cursor-pointer hover:border-main">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files?.[0])}
                  />
                </label>
              </div>
              {form.cover_url && (
                <img
                  src={form.cover_url}
                  alt="cover preview"
                  className="h-28 w-full object-cover rounded-xl border border-light-gray"
                />
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => updateField("category_id", e.target.value)}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">Published At</label>
              <input
                type="datetime-local"
                value={form.published_at}
                onChange={(e) => updateField("published_at", e.target.value)}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-heading">Body</label>
            <RichTextEditor
              value={form.body}
              onChange={(val) => updateField("body", val)}
              placeholder="Write your article..."
              adminToken={adminToken}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-heading">SEO Title</label>
              <input
                type="text"
                value={form.seo_title}
                onChange={(e) => updateField("seo_title", e.target.value)}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-semibold text-heading">SEO Description</label>
              <input
                type="text"
                value={form.seo_description}
                onChange={(e) => updateField("seo_description", e.target.value)}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-3">
              <label className="text-sm font-semibold text-heading">SEO Keywords (comma separated)</label>
              <input
                type="text"
                value={form.seo_keywords}
                onChange={(e) => updateField("seo_keywords", e.target.value)}
                className="rounded-xl border border-light-gray px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-3 rounded-xl bg-main text-white font-semibold hover:bg-main-shade transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : isEditing ? "Update Post" : "Save Post"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  onCancelEdit?.();
                }}
                className="px-4 py-3 rounded-xl border border-light-gray text-heading font-semibold hover:border-main transition"
              >
                Cancel edit
              </button>
            )}
            {message && <span className="text-main text-sm">{message}</span>}
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-3xl border border-light-gray p-6 space-y-4 sticky top-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.28em] text-main-shade font-semibold">
            Live preview
          </p>
          <h3 className="text-xl font-semibold text-heading">
            {form.title || "Untitled draft"}
          </h3>
          <p className="text-sm text-sub-para">
            {form.excerpt || "Excerpt will appear here as you type."}
          </p>
          {previewDate && <p className="text-xs text-sub-para">Publishes: {previewDate}</p>}
        </div>
        <div className="rounded-2xl overflow-hidden border border-light-gray">
          {form.cover_url ? (
            <img
              src={form.cover_url}
              alt="cover preview"
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-40 bg-main-mint flex items-center justify-center text-main-shade text-sm font-semibold">
              Cover preview
            </div>
          )}
        </div>
        <div className="border border-light-gray rounded-2xl p-4 max-h-80 overflow-y-auto">
          <div
            className="blog-content text-para leading-6 space-y-3"
            dangerouslySetInnerHTML={{
              __html: form.body || "<p>Start writing to see a live preview.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}
