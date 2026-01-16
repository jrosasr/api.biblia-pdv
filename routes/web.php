<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DevotionalController;
use App\Http\Controllers\UserDevotionalController;

Route::permanentRedirect('/', '/es');

// Redirects for indexing fixes
Route::permanentRedirect('/contacto', '/es/contacto');
Route::permanentRedirect('/privacidad', '/es/privacidad');
Route::permanentRedirect('/terminos', '/es/terminos');
Route::permanentRedirect('/devocional-diario', '/es/devocional-diario');
Route::permanentRedirect('/login', '/es/login');
Route::permanentRedirect('/register', '/es/register');

// Sitemaps
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);
Route::get('/sitemap-static.xml', [\App\Http\Controllers\SitemapController::class, 'static']);
Route::get('/sitemap-bible.xml', [\App\Http\Controllers\SitemapController::class, 'bible']);
Route::get('/sitemap-devotionals.xml', [\App\Http\Controllers\SitemapController::class, 'devotionals']);


Route::prefix('es')->group(function () {
    Route::get('/', [\App\Http\Controllers\BibleReaderController::class, 'index'])->name('home');
    Route::get('/leer/{book}/{chapter?}', [\App\Http\Controllers\BibleReaderController::class, 'show'])->name('bible.show');
    Route::get('/api/bible/books/{version}', [\App\Http\Controllers\BibleReaderController::class, 'getBooks']);
    Route::get('/api/bible/chapters/{version}/{bookId}', [\App\Http\Controllers\BibleReaderController::class, 'getChapters']);
    Route::get('/api/bible/verses/{version}/{bookId}/{chapter}', [\App\Http\Controllers\BibleReaderController::class, 'getVerses']);
    Route::get('/api/bible/search', [\App\Http\Controllers\BibleReaderController::class, 'search']);
    Route::get('/devocional-diario', [\App\Http\Controllers\DevotionalController::class, 'publicShow'])->name('devotionals.public');

    // Static Pages
    Route::get('/privacidad', function () {
        return Inertia::render('Legal/Privacy');
    })->name('privacy');

    Route::get('/terminos', function () {
        return Inertia::render('Legal/Terms');
    })->name('terms');

    Route::get('/contacto', function () {
        return Inertia::render('Contact');
    })->name('contact');
    Route::post('/contacto', [\App\Http\Controllers\ContactMessageController::class, 'store'])->middleware('auth')->name('contact.store');

    Route::get('/account/delete', [\App\Http\Controllers\Auth\AccountDeletionController::class, 'show'])->name('account.delete.show');
    Route::post('/account/delete', [\App\Http\Controllers\Auth\AccountDeletionController::class, 'destroy'])->name('account.delete.destroy');

    Route::get('/dashboard', function () {
        $readings = \App\Models\Devotional::selectRaw('DATE(published_at) as date, SUM(readings) as total_readings')
            ->whereNotNull('published_at')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('Dashboard', [
            'readingsData' => $readings
        ]);
    })->middleware(['auth', 'verified', 'role:admin|writer'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::resource('devotionals', DevotionalController::class);
        Route::get('/mi-diario', [UserDevotionalController::class, 'publicIndex'])->name('user-devotionals.public-index');
        Route::resource('user-devotionals', UserDevotionalController::class);
        Route::resource('device-tokens', \App\Http\Controllers\DeviceTokenController::class);
        Route::post('device-tokens/{device_token}/send', [\App\Http\Controllers\DeviceTokenController::class, 'sendNotification'])->name('device-tokens.send');
        
        // Notifications
        Route::post('notifications/new-devotional', [\App\Http\Controllers\NotificationController::class, 'notifyNewDevotional'])->name('notifications.new-devotional');
        Route::post('notifications/custom', [\App\Http\Controllers\NotificationController::class, 'sendCustomNotification'])->name('notifications.custom');

        Route::resource('bible-series', \App\Http\Controllers\BibleSeriesController::class)->middleware('role:admin');
        Route::resource('bible-stories', \App\Http\Controllers\BibleStoryController::class)->middleware('role:admin');

        // User management (Streaks and Favorites)
        Route::get('/mi-perfil', [\App\Http\Controllers\UserManagementController::class, 'profile'])->name('profile.public-show');
        Route::get('/mis-favoritos', [\App\Http\Controllers\UserManagementController::class, 'favorites'])->name('profile.favorites');
        Route::post('/favorites', [\App\Http\Controllers\BibleFavoriteController::class, 'store'])->name('favorites.store');
        Route::delete('/favorites/{id}', [\App\Http\Controllers\BibleFavoriteController::class, 'destroy'])->name('favorites.destroy');
        
        // Admin only user management
        Route::middleware('role:admin')->group(function() {
            Route::get('/users', [\App\Http\Controllers\UserManagementController::class, 'index'])->name('users.index');
            Route::get('/users/{user}', [\App\Http\Controllers\UserManagementController::class, 'show'])->name('users.show');
            Route::post('/users/{user}/role', [\App\Http\Controllers\UserManagementController::class, 'updateRole'])->name('users.update-role');
            Route::resource('contact-messages', \App\Http\Controllers\ContactMessageController::class)->only(['index', 'show', 'destroy']);
            Route::resource('bible-headings', \App\Http\Controllers\Admin\BibleHeadingController::class)->except(['show']);
            
            // Statistics
            Route::get('/statistics/dashboard', function () {
                return Inertia::render('Statistics/Dashboard');
            })->name('statistics.dashboard');
            Route::get('/api/statistics', [\App\Http\Controllers\StatisticController::class, 'index'])->name('statistics.index');
        });
        
        // Tracking endpoint (Authenticated users only?) - No, should be public or guarded by throttle?
        // Let's put it here for logged in users, or move it outside if guests need to track.
        // The modal is shown to everyone, so it should be accessible.
    });

    // Public Tracking Route
    Route::post('/api/statistics/track', [\App\Http\Controllers\StatisticController::class, 'track'])->name('statistics.track');

    require __DIR__.'/auth.php';
});
