<?php

namespace App\Http\Controllers;

use App\Models\DeviceToken;
use App\Services\DeviceTokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeviceTokenController extends Controller
{
    protected $tokenService;

    public function __construct(DeviceTokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tokens = $this->tokenService->getAllTokens();

        if (request()->wantsJson()) {
            return response()->json($tokens);
        }

        return Inertia::render('DeviceTokens/Index', [
            'tokens' => $tokens
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fcm_token' => 'required|string',
            'device_id' => 'nullable|string',
            'device_name' => 'nullable|string',
            'platform' => 'nullable|string',
            'topics' => 'nullable|array',
        ]);

        $userId = Auth::guard('sanctum')->id() ?? $request->input('user_id');

        $deviceToken = $this->tokenService->updateOrCreateToken($validated, $userId);

        return response()->json([
            'status' => 'success',
            'data' => $deviceToken
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeviceToken $deviceToken)
    {
        $this->tokenService->deleteToken($deviceToken);

        if (request()->wantsJson()) {
            return response()->json(['status' => 'success']);
        }

        return redirect()->back()->with('success', 'Dispositivo eliminado correctamente.');
    }

    /**
     * Send a notification to the device.
     */
    public function sendNotification(Request $request, DeviceToken $deviceToken)
    {
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        try {
            $this->tokenService->sendNotification(
                $deviceToken,
                $request->title,
                $request->body
            );

            if (request()->wantsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Notificación enviada correctamente.'
                ]);
            }

            return redirect()->back()->with('success', 'Notificación enviada correctamente.');
        } catch (\Exception $e) {
            if (request()->wantsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error al enviar la notificación: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['error' => 'Error al enviar la notificación: ' . $e->getMessage()]);
        }
    }
}
