<?php

declare(strict_types=1);

namespace App;

class Storage
{
    public static function saveUpload(array $file): string
    {
        $uploadDir = __DIR__ . '/../public/uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $ext = pathinfo($file['name'] ?? '', PATHINFO_EXTENSION);
        $filename = uniqid('img_', true) . ($ext ? '.' . $ext : '');
        $target = $uploadDir . '/' . $filename;

        if (!move_uploaded_file($file['tmp_name'], $target)) {
            throw new \RuntimeException('Failed to move uploaded file');
        }

        return '/uploads/' . $filename;
    }
}
