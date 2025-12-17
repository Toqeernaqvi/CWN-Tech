<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Auth;
use App\Http\Request;
use App\Http\Response;

class AuthController
{
    public function login(Request $request): void
    {
        $email = trim((string)$request->input('email', ''));
        $password = (string)$request->input('password', '');

        $envEmail = (string)env('ADMIN_EMAIL', '');
        $envPassword = (string)env('ADMIN_PASSWORD', '');
        $token = (string)env('ADMIN_TOKEN', '');

        if ($envEmail === '' || $envPassword === '' || $token === '') {
            Response::json(['error' => 'Auth not configured'], 500);
            return;
        }

        $emailMatch = hash_equals($envEmail, $email);
        $passwordMatch = hash_equals($envPassword, $password);

        if (!$emailMatch || !$passwordMatch) {
            Response::json(['error' => 'Invalid credentials'], 401);
            return;
        }

        Response::json(['token' => $token]);
    }

    public function me(Request $request): void
    {
        // Reuse existing token guard to validate Authorization header
        Auth::requireToken($request);
        $email = (string)env('ADMIN_EMAIL', 'admin@cwn.local');

        Response::json([
            'email' => $email,
        ]);
    }
}
