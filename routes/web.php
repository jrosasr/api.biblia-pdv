<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DevotionalController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/account/delete', [\App\Http\Controllers\Auth\AccountDeletionController::class, 'show'])->name('account.delete.show');
Route::post('/account/delete', [\App\Http\Controllers\Auth\AccountDeletionController::class, 'destroy'])->name('account.delete.destroy');

Route::get('/dashboard', function () {
    $readings = \App\Models\Devotional::selectRaw('DATE(published_at) as date, SUM(readings) as total_readings')
        ->whereNotNull('published_at')
        // ->where('status', 'published')
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

    return Inertia::render('Dashboard', [
        'readingsData' => $readings
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('devotionals', DevotionalController::class);
    Route::resource('device-tokens', \App\Http\Controllers\DeviceTokenController::class);
    Route::post('device-tokens/{device_token}/send', [\App\Http\Controllers\DeviceTokenController::class, 'sendNotification'])->name('device-tokens.send');
    
    // Notifications
    Route::post('notifications/new-devotional', [\App\Http\Controllers\NotificationController::class, 'notifyNewDevotional'])->name('notifications.new-devotional');
});

require __DIR__.'/auth.php';
