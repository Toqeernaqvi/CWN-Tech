## CWN Blog API (PHP 7.4)

Lightweight PHP API for blog posts, categories, uploads, and SEO fields.

### Setup
1) Copy `.env.example` to `.env` and fill DB + `ADMIN_TOKEN` + `ADMIN_EMAIL` + `ADMIN_PASSWORD`.
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
- `POST /auth/login` – exchange `email` + `password` for bearer token (`ADMIN_TOKEN`).
- `GET /auth/me` – validate token and return admin email.

### Auth
Send header: `Authorization: Bearer <ADMIN_TOKEN>`. You can fetch a token via `/auth/login`.
