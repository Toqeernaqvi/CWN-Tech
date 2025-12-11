<?php

declare(strict_types=1);

namespace App;

use App\Http\Request;

class Auth
{
    public static function requireToken(Request $request): void
    {
        $header = $request->header('Authorization', '');
        $token = env('ADMIN_TOKEN', '');

        if ($token === '') {
            http_response_code(500);
            echo json_encode(['error' => 'Admin token not configured']);
            exit;
        }

        if (!self::matchesToken($header, $token)) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }
    }

    private static function matchesToken(string $header, string $token): bool
    {
        if (stripos($header, 'Bearer ') === 0) {
            $provided = trim(substr($header, 7));
            return hash_equals($token, $provided);
        }
        return false;
    }
}
