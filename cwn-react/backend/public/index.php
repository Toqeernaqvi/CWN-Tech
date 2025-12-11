<?php

declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

use App\Controllers\CategoryController;
use App\Controllers\PostController;
use App\Http\Request;
use App\Http\Response;
use App\Http\Router;

// Allow pretty URLs when served through built-in PHP server
if (php_sapi_name() === 'cli-server') {
    $file = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (is_file($file)) {
        return false;
    }
}

$router = new Router();
$postController = new PostController();
$categoryController = new CategoryController();

$router->add('GET', '/posts', function (Request $request) use ($postController): void {
    $postController->index($request);
});

$router->add('GET', '/posts/{slug}', function (Request $request) use ($postController): void {
    $postController->show($request);
});

$router->add('POST', '/posts', function (Request $request) use ($postController): void {
    $postController->store($request);
});

$router->add('PATCH', '/posts/{id}', function (Request $request) use ($postController): void {
    $postController->update($request);
});

$router->add('DELETE', '/posts/{id}', function (Request $request) use ($postController): void {
    $postController->destroy($request);
});

$router->add('POST', '/uploads', function (Request $request) use ($postController): void {
    $postController->upload($request);
});

$router->add('GET', '/categories', function () use ($categoryController): void {
    $categoryController->index();
});

$router->add('POST', '/categories', function (Request $request) use ($categoryController): void {
    $categoryController->store($request);
});

$router->add('PATCH', '/categories/{id}', function (Request $request) use ($categoryController): void {
    $categoryController->update($request);
});

$router->add('DELETE', '/categories/{id}', function (Request $request) use ($categoryController): void {
    $categoryController->destroy($request);
});

$request = new Request();
$router->dispatch($request);
