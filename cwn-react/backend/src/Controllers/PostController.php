<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Auth;
use App\Database;
use App\Http\Request;
use App\Http\Response;
use App\Storage;
use PDO;
use RuntimeException;

class PostController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = (new Database())->pdo();
    }

    public function index(Request $request): void
    {
        $search = trim($request->query['search'] ?? '');
        $category = $request->query['category'] ?? null;
        $page = max(1, (int)($request->query['page'] ?? 1));
        $limit = min(50, max(1, (int)($request->query['limit'] ?? 9)));
        $offset = ($page - 1) * $limit;

        $where = [];
        $params = [];

        if ($search !== '') {
            $where[] = '(p.title LIKE :search OR p.body LIKE :search)';
            $params[':search'] = '%' . $search . '%';
        }
        if (!empty($category)) {
            $where[] = 'c.slug = :category';
            $params[':category'] = $category;
        }

        $whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $countStmt = $this->db->prepare(
            "SELECT COUNT(*) FROM posts p LEFT JOIN categories c ON c.id = p.category_id {$whereSql}"
        );
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        $stmt = $this->db->prepare(
            "SELECT p.id, p.title, p.slug, p.excerpt, p.body, p.cover_url, p.seo_title, p.seo_description, p.seo_keywords,
                    p.published_at, p.created_at, p.updated_at,
                    c.id as category_id, c.name as category_name, c.slug as category_slug
             FROM posts p
             LEFT JOIN categories c ON c.id = p.category_id
             {$whereSql}
             ORDER BY COALESCE(p.published_at, p.created_at) DESC
             LIMIT :limit OFFSET :offset"
        );

        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $posts = $stmt->fetchAll();

        Response::json([
            'data' => $posts,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'pages' => $limit > 0 ? (int)ceil($total / $limit) : 1,
            ],
        ]);
    }

    public function show(Request $request): void
    {
        $slug = $request->params['slug'] ?? '';
        if ($slug === '') {
            Response::json(['error' => 'Slug required'], 400);
            return;
        }

        $stmt = $this->db->prepare(
            "SELECT p.id, p.title, p.slug, p.excerpt, p.body, p.cover_url, p.seo_title, p.seo_description, p.seo_keywords,
                    p.published_at, p.created_at, p.updated_at,
                    c.id as category_id, c.name as category_name, c.slug as category_slug
             FROM posts p
             LEFT JOIN categories c ON c.id = p.category_id
             WHERE p.slug = :slug
             LIMIT 1"
        );
        $stmt->execute([':slug' => $slug]);
        $post = $stmt->fetch();

        if (!$post) {
            Response::json(['error' => 'Post not found'], 404);
            return;
        }

        Response::json(['data' => $post]);
    }

    public function store(Request $request): void
    {
        Auth::requireToken($request);
        $data = $this->validatePost($request);

        $stmt = $this->db->prepare(
            "INSERT INTO posts (title, slug, excerpt, body, cover_url, category_id, seo_title, seo_description, seo_keywords, published_at, created_at, updated_at)
             VALUES (:title, :slug, :excerpt, :body, :cover_url, :category_id, :seo_title, :seo_description, :seo_keywords, :published_at, NOW(), NOW())"
        );
        $stmt->execute($data);

        Response::json(['message' => 'Post created'], 201);
    }

    public function update(Request $request): void
    {
        Auth::requireToken($request);
        $id = (int)($request->params['id'] ?? 0);
        if ($id <= 0) {
            Response::json(['error' => 'Invalid id'], 400);
            return;
        }

        $data = $this->validatePost($request);
        $data[':id'] = $id;

        $stmt = $this->db->prepare(
            "UPDATE posts
             SET title = :title,
                 slug = :slug,
                 excerpt = :excerpt,
                 body = :body,
                 cover_url = :cover_url,
                 category_id = :category_id,
                 seo_title = :seo_title,
                 seo_description = :seo_description,
                 seo_keywords = :seo_keywords,
                 published_at = :published_at,
                 updated_at = NOW()
             WHERE id = :id"
        );
        $stmt->execute($data);

        Response::json(['message' => 'Post updated']);
    }

    public function destroy(Request $request): void
    {
        Auth::requireToken($request);
        $id = (int)($request->params['id'] ?? 0);
        if ($id <= 0) {
            Response::json(['error' => 'Invalid id'], 400);
            return;
        }

        $stmt = $this->db->prepare("DELETE FROM posts WHERE id = :id");
        $stmt->execute([':id' => $id]);

        Response::json(['message' => 'Post deleted']);
    }

    public function upload(Request $request): void
    {
        Auth::requireToken($request);
        if (!isset($request->files['image'])) {
            Response::json(['error' => 'Image file required'], 400);
            return;
        }

        $file = $request->files['image'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            Response::json(['error' => 'Upload failed'], 400);
            return;
        }

        try {
            $path = Storage::saveUpload($file);
        } catch (RuntimeException $e) {
            Response::json(['error' => $e->getMessage()], 400);
            return;
        }

        Response::json(['url' => $path], 201);
    }

    private function validatePost(Request $request): array
    {
        $title = trim((string)$request->input('title', ''));
        $body = trim((string)$request->input('body', ''));
        $excerpt = trim((string)$request->input('excerpt', ''));
        $slug = trim((string)$request->input('slug', ''));
        $cover = trim((string)$request->input('cover_url', ''));
        $categoryId = (int)$request->input('category_id', 0);
        $seoTitle = trim((string)$request->input('seo_title', ''));
        $seoDescription = trim((string)$request->input('seo_description', ''));
        $seoKeywords = trim((string)$request->input('seo_keywords', ''));
        $publishedAt = $request->input('published_at', null);

        if ($title === '' || $body === '' || $slug === '') {
            Response::json(['error' => 'Title, slug, and body are required'], 422);
            exit;
        }

        return [
            ':title' => $title,
            ':slug' => $slug,
            ':excerpt' => $excerpt,
            ':body' => $body,
            ':cover_url' => $cover,
            ':category_id' => $categoryId ?: null,
            ':seo_title' => $seoTitle ?: null,
            ':seo_description' => $seoDescription ?: null,
            ':seo_keywords' => $seoKeywords ?: null,
            ':published_at' => $publishedAt ?: null,
        ];
    }
}
