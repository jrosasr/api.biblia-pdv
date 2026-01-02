<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the users with their streak and favorites count.
     */
    public function index()
    {
        $users = User::with(['readingStreak'])
            ->withCount('favorites')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Display the specified user details, including favorites and streaks.
     */
    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'userDetail' => $user->load(['readingStreak', 'favorites', 'bibleChapterReadings', 'readingLogs' => function($query) {
                $query->orderBy('read_date', 'desc')->take(30);
            }]),
        ]);
    }
}
