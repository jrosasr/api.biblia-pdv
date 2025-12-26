<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevotionalController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// prefixo v1 with middleware auth:sanctum
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('devotionals', DevotionalController::class);
});

// endpoint return array with version of api
Route::get('/version', function () {
    return [
        'version' => '1.0.0',
        'versionApp' => '1.0.0',
        'status' => 'ok',
        'message' => 'APIbiblia-pdv',
    ];
});
