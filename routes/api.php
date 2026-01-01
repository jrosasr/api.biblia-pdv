<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevotionalController;
use App\Http\Controllers\Api\AuthController;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Devotionals CRUD API
// Route::apiResource('devotionals', DevotionalController::class)->names('api.devotionals');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/test-fcm', function (Request $request) {
        try {
            $messaging = app('firebase.messaging');
            $token = $request->query('token');
            $topic = $request->query('topic', 'all');

            if ($token) {
                $message = CloudMessage::withTarget('token', $token);
            } else {
                $message = CloudMessage::withTarget('topic', $topic);
            }

            $message = $message->withNotification(Notification::create(
                $request->query('title', 'Prueba de FCM'),
                $request->query('body', '¡Hola! Este es un mensaje de prueba desde la API.')
            ))
            ->withData(['test' => 'data']);

            $messaging->send($message);
            
            return response()->json([
                'status' => 'success', 
                'message' => 'Notification sent',
                'target' => $token ? 'token' : "topic: $topic"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error', 
                'message' => $e->getMessage()
            ], 500);
        }
    });
});

Route::prefix('v1')->group(function () {
    // Daily devotionals
    Route::get('daily-devotionals', [DevotionalController::class, 'dailyDevotionals']);
    
    // Increment readings
    Route::get('incrementReadings/{id}', [DevotionalController::class, 'incrementReadings']);
    
    // Endpoint return array with version of api
    Route::get('/version', function () {
        return [
            'version' => '1.0.6',
            'versionApp' => '1.0.6',
            'status' => 'ok',
            'message' => 'APIbiblia-pdv',
        ];
    });

    Route::post('device-tokens', [\App\Http\Controllers\DeviceTokenController::class, 'store']);

    // Auth routes
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('profile', [AuthController::class, 'profile']);
    });
});

Route::post('/subscribe-topic', function (Request $request) {
    try {
        $messaging = app('firebase.messaging');
        $token = $request->input('token');
        $topic = $request->input('topic', 'all');

        if (!$token) {
            return response()->json(['message' => 'Token is required'], 400);
        }

        $messaging->subscribeToTopic($topic, $token);

        return response()->json([
            'status' => 'success',
            'message' => "Subscribed to topic: $topic"
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});
