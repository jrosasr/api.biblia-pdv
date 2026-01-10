<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevotionalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\NotificationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // Daily devotionals
    Route::get('daily-devotionals', [DevotionalController::class, 'dailyDevotionals']);
    
    // Bible Series & Stories
    Route::get('bible-series', [\App\Http\Controllers\BibleSeriesController::class, 'list']);
    Route::get('bible-stories', [\App\Http\Controllers\BibleStoryController::class, 'list']);
    Route::get('bible-series/{bibleSeries}/stories', [\App\Http\Controllers\BibleStoryController::class, 'listBySeries']);
    Route::get('storage/{path}', [\App\Http\Controllers\Api\StorageController::class, 'show'])->where('path', '.*');
    
    // Increment readings
    Route::get('incrementReadings/{id?}', [DevotionalController::class, 'incrementReadings']);
    
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
        Route::get('/test-fcm', [NotificationController::class, 'testFcm']);

        Route::post('logout', [AuthController::class, 'logout']);
        Route::delete('account', [AuthController::class, 'deleteAccount']);
        Route::get('profile', [AuthController::class, 'profile']);
        Route::post('bible-stories/{bibleStory}/favorite', [\App\Http\Controllers\BibleStoryController::class, 'toggleFavorite']);
        
        // Bible Favorites routes
        Route::get('favorites', [\App\Http\Controllers\BibleFavoriteController::class, 'index']);
        Route::post('favorites', [\App\Http\Controllers\BibleFavoriteController::class, 'store']);
        Route::delete('favorites/{favoriteId}', [\App\Http\Controllers\BibleFavoriteController::class, 'destroy']);

        // Reading Streaks routes
        Route::get('reading-streak', [\App\Http\Controllers\ReadingStreakController::class, 'index']);
        Route::post('reading-streak', [\App\Http\Controllers\ReadingStreakController::class, 'update']);

        // Reading Logs routes
        Route::get('reading-logs', [\App\Http\Controllers\ReadingLogController::class, 'index']);

        // Track reading
        Route::post('reading/track', [\App\Http\Controllers\ReadingController::class, 'track']);
    });
});

Route::post('/subscribe-topic', [NotificationController::class, 'subscribeTopic']);
