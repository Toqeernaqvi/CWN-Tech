import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  const {
    title,
    slug,
    excerpt,
    cover_url,
    category_name,
    category_slug,
    published_at,
  } = post;

  const date = published_at ? new Date(published_at).toLocaleDateString() : null;

  return (
    <Link
      to={`/blogs/${slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-card border border-light-gray transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
    >
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-main via-main-tint to-tertiary" />
        {cover_url ? (
          <img
            src={cover_url}
            alt={title}
            className="w-full h-52 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-52 bg-main-mint flex items-center justify-center text-main-shade text-sm font-semibold">
            No image
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-main-shade">
          <span className="px-3 py-1 bg-main-mint rounded-full border border-main-tint/60">
            {category_name || "General"}
          </span>
          {date && <span className="text-sub-para">{date}</span>}
        </div>
        <h3 className="text-xl font-semibold text-heading group-hover:text-main-shade transition-colors">
          {title}
        </h3>
        <p className="text-para text-sm leading-6 overflow-hidden max-h-24">
          {excerpt}
        </p>
        <span className="text-main font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Read article
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
