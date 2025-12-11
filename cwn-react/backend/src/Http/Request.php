<?php

declare(strict_types=1);

namespace App\Http;

class Request
{
    public string $method;
    public string $path;
    public array $query;
    public array $params = [];
    public array $headers;
    public array $body = [];
    public array $files = [];

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $this->path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $this->query = $_GET ?? [];
        $this->headers = getallheaders() ?: [];
        $this->files = $_FILES ?? [];

        $input = file_get_contents('php://input');
        if (!empty($input)) {
            $decoded = json_decode($input, true);
            if (is_array($decoded)) {
                $this->body = $decoded;
            }
        }

        // Merge form data if present
        foreach ($_POST as $key => $value) {
            $this->body[$key] = $value;
        }
    }

    public function header(string $key, $default = null)
    {
        foreach ($this->headers as $k => $v) {
            if (strcasecmp($k, $key) === 0) {
                return $v;
            }
        }
        return $default;
    }

    public function input(string $key, $default = null)
    {
        return $this->body[$key] ?? $default;
    }
}
