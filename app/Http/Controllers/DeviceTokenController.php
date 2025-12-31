<?php

namespace App\Http\Controllers;

use App\Models\DeviceToken;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class DeviceTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tokens = DeviceToken::with('user')->latest()->get();

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
            'user_id' => 'nullable|exists:users,id',
            'topics' => 'nullable|array',
        ]);

        $query = DeviceToken::query();
        if ($request->filled('device_id')) {
            $query->where('device_id', $request->device_id);
        } else {
            $query->where('fcm_token', $request->fcm_token);
        }

        $deviceToken = $query->first();

        $topics = $request->input('topics', []);

        if ($deviceToken) {
            // Logic to sync topics in Firebase could go here if required
            // For now, we update the DB record
            $deviceToken->update([
                'fcm_token' => $request->fcm_token,
                'user_id' => $request->user_id ?? $deviceToken->user_id,
                'device_name' => $request->device_name ?? $deviceToken->device_name,
                'platform' => $request->platform ?? $deviceToken->platform,
                'topics' => $topics,
                'last_used_at' => now(),
            ]);
        } else {
            $deviceToken = DeviceToken::create([
                'user_id' => $request->user_id,
                'device_id' => $request->device_id,
                'fcm_token' => $request->fcm_token,
                'device_name' => $request->device_name,
                'platform' => $request->platform,
                'topics' => $topics,
                'last_used_at' => now(),
            ]);
        }

        // Optional: Sync with Firebase
        try {
            $messaging = app('firebase.messaging');
            foreach ($topics as $topic) {
                $messaging->subscribeToTopic($topic, $request->fcm_token);
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error("Error subscribing to topics: " . $e->getMessage());
        }

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
        $deviceToken->delete();

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
            $messaging = app('firebase.messaging');

            $message = CloudMessage::withTarget('token', $deviceToken->fcm_token)
                ->withNotification(Notification::create(
                    $request->title,
                    $request->body
                ))
                ->withData(['click_action' => 'FLUTTER_NOTIFICATION_CLICK']);

            $messaging->send($message);

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
