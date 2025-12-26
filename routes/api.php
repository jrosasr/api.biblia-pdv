<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevotionalController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Devotionals CRUD API
Route::apiResource('devotionals', DevotionalController::class)->names('api.devotionals');

// Daily devotionals
Route::get('daily-devotionals', [DevotionalController::class, 'dailyDevotionals']);

// Increment readings
Route::get('incrementReadings/{id}', [DevotionalController::class, 'incrementReadings']);

// Endpoint return array with version of api
Route::get('/version', function () {
    return [
        'version' => '1.0.0',
        'versionApp' => '1.0.0',
        'status' => 'ok',
        'message' => 'APIbiblia-pdv',
    ];
});
