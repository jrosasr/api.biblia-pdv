<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\DeviceToken;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'access_token' => $result['access_token'],
            'token_type' => $result['token_type'],
            'user' => new UserResource($result['user']),
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'access_token' => $result['access_token'],
            'token_type' => $result['token_type'],
            'user' => new UserResource($result['user']),
        ]);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ]);
    }

    public function profile(Request $request)
    {
        return new UserResource($request->user());
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        try {
            DB::beginTransaction();

            // 1. Revoke tokens
            $user->tokens()->delete();

            // 2. Delete related data
            $user->favorites()->delete();
            $user->readingStreak()->delete();
            $user->readingLogs()->delete();
            $user->bibleChapterReadings()->delete();
            $user->activities()->delete();
            
            // Handle DeviceToken manually as it is not in User model relations
            DeviceToken::where('user_id', $user->id)->delete();

            // 3. Delete user
            $user->delete();

            DB::commit();

            return response()->json([
                'message' => 'Cuenta eliminada correctamente.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ocurrió un error al eliminar la cuenta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}