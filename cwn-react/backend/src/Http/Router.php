<?php

declare(strict_types=1);

namespace App\Http;

class Router
{
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void
    {
        $this->routes[] = [$method, $path, $this->compile($path), $handler];
    }

    public function dispatch(Request $request): void
    {
        foreach ($this->routes as [$method, $path, $pattern, $handler]) {
            if (strcasecmp($method, $request->method) !== 0) {
                continue;
            }
            if (preg_match($pattern, $request->path, $matches)) {
                $request->params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                call_user_func($handler, $request);
                return;
            }
        }

        Response::json(['error' => 'Not found'], 404);
    }

    private function compile(string $path): string
    {
        $pattern = preg_replace('#\{([a-zA-Z0-9_]+)\}#', '(?P<$1>[^/]+)', $path);
        return '#^' . $pattern . '$#';
    }
}
