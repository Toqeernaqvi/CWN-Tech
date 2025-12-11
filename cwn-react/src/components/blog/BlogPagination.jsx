export default function BlogPagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="px-4 py-2 rounded-full border border-light-gray bg-white text-para disabled:opacity-50 disabled:cursor-not-allowed hover:border-main"
      >
        Prev
      </button>
      <span className="text-sm text-sub-para">
        Page {page} of {pages}
      </span>
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page >= pages}
        className="px-4 py-2 rounded-full border border-light-gray bg-white text-para disabled:opacity-50 disabled:cursor-not-allowed hover:border-main"
      >
        Next
      </button>
    </div>
  );
}
