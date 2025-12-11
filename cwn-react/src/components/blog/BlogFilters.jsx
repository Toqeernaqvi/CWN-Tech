export default function BlogFilters({
  categories = [],
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or content..."
          className="w-full rounded-full border border-light-gray bg-white px-4 py-3 text-para shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition"
        />
        <span className="absolute right-4 top-3.5 text-sub-para">⌕</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 text-sm rounded-full border transition ${
            !activeCategory
              ? "bg-main text-white border-main"
              : "bg-white border-light-gray text-para hover:border-main hover:text-main"
          }`}
          onClick={() => onCategoryChange("")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={`px-4 py-2 text-sm rounded-full border transition ${
              activeCategory === cat.slug
                ? "bg-main text-white border-main"
                : "bg-white border-light-gray text-para hover:border-main hover:text-main"
            }`}
            onClick={() => onCategoryChange(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
