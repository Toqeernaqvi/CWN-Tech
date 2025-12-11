# React + Vite

This project provides a minimal setup to get React working with Vite, featuring Hot Module Replacement (HMR) and some ESLint rules.

## Plugins

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Uses Babel for Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Uses SWC for Fast Refresh.

## Requirements

- **Node.js**: v20.11.0 or higher

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## Blogs & CMS
- Frontend routes:
  - `/blogs` – listing with search, categories, featured, pagination.
  - `/blogs/:slug` – article detail with SEO tags from the API.
  - `/blogs/admin` – editor with rich text, cover upload, SEO fields.
- Configure `VITE_BLOG_API_URL` in `.env` to point to the PHP API (default `http://localhost:8000`).
- Backend (PHP 7.4) scaffold lives in `backend/` with routes for posts, categories, uploads, and bearer auth. Copy `.env.example` → `.env`, set DB + `ADMIN_TOKEN`, import `schema.sql`, then run `php -S localhost:8000 -t public` from `backend/`.
