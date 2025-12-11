## CWN Blog API (PHP 7.4)

Lightweight PHP API for blog posts, categories, uploads, and SEO fields.

### Setup
1) Copy `.env.example` to `.env` and fill DB + `ADMIN_TOKEN`.
2) Import `schema.sql` into your MySQL database.
3) Serve the API (examples):
```bash
php -S localhost:8000 -t public
# or nginx/apache pointing to backend/public
```

### Routes
- `GET /posts?search=&category=&page=&limit=` – list with search + category filter.
- `GET /posts/{slug}` – single post by slug.
- `POST /posts` – create (auth: Bearer token).
- `PATCH /posts/{id}` – update (auth).
- `DELETE /posts/{id}` – delete (auth).
- `POST /uploads` – upload image (field: `image`) (auth). Returns `{ url }`.
- `GET /categories` – list categories.
- `POST /categories`, `PATCH /categories/{id}`, `DELETE /categories/{id}` – manage categories (auth).

### Auth
Send header: `Authorization: Bearer <ADMIN_TOKEN>`.
