<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Auth;
use App\Database;
use App\Http\Request;
use App\Http\Response;
use PDO;

class CategoryController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = (new Database())->pdo();
    }

    public function index(): void
    {
        $stmt = $this->db->query(
            "SELECT id, name, slug, created_at FROM categories ORDER BY name ASC"
        );
        $categories = $stmt->fetchAll();
        Response::json(['data' => $categories]);
    }

    public function store(Request $request): void
    {
        Auth::requireToken($request);
        $name = trim((string)$request->input('name', ''));
        $slug = trim((string)$request->input('slug', ''));

        if ($name === '' || $slug === '') {
            Response::json(['error' => 'Name and slug are required'], 422);
            return;
        }

        $stmt = $this->db->prepare(
            "INSERT INTO categories (name, slug, created_at) VALUES (:name, :slug, NOW())"
        );
        $stmt->execute([':name' => $name, ':slug' => $slug]);
        Response::json(['message' => 'Category created'], 201);
    }

    public function update(Request $request): void
    {
        Auth::requireToken($request);
        $id = (int)($request->params['id'] ?? 0);
        $name = trim((string)$request->input('name', ''));
        $slug = trim((string)$request->input('slug', ''));

        if ($id <= 0 || $name === '' || $slug === '') {
            Response::json(['error' => 'Invalid data'], 422);
            return;
        }

        $stmt = $this->db->prepare(
            "UPDATE categories SET name = :name, slug = :slug WHERE id = :id"
        );
        $stmt->execute([':id' => $id, ':name' => $name, ':slug' => $slug]);
        Response::json(['message' => 'Category updated']);
    }

    public function destroy(Request $request): void
    {
        Auth::requireToken($request);
        $id = (int)($request->params['id'] ?? 0);
        if ($id <= 0) {
            Response::json(['error' => 'Invalid id'], 400);
            return;
        }

        $stmt = $this->db->prepare("DELETE FROM categories WHERE id = :id");
        $stmt->execute([':id' => $id]);
        Response::json(['message' => 'Category deleted']);
    }
}
