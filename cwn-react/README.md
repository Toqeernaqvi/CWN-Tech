# CWN React + PHP API

Instructions for running the React frontend and the PHP blog API locally.

## Requirements
- Node.js v20.11.0+
- PHP 7.4+

## Setup & Run (frontend)
```bash
npm install
npm run dev
```
Configure `VITE_BLOG_API_URL` in a `.env` file at the repo root (example: `http://localhost:8000`).

## Setup & Run (backend API)
```bash
cd backend
cp .env.example .env   # set DB credentials and ADMIN_TOKEN
php -S localhost:8000 -t public
```
Import `schema.sql` into your database before starting.

## Blogs & CMS
- Frontend routes:
  - `/blogs` — listing with search, categories, featured, pagination.
  - `/blogs/:slug` — article detail with SEO tags from the API.
  - `/blogs/admin` — editor with rich text, cover upload, SEO fields, delete/edit existing posts.
- Backend routes: posts, categories, uploads, all protected by bearer token for writes/uploads (`ADMIN_TOKEN` in backend `.env`).
