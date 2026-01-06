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
        $users = User::with(['readingStreak', 'roles'])
            ->withCount('favorites')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => \Spatie\Permission\Models\Role::all()
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name'
        ]);

        $user->syncRoles($request->role);

        return back()->with('success', 'Rol actualizado correctamente.');
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'userDetail' => $user->load(['readingStreak', 'favorites', 'bibleChapterReadings', 'readingLogs' => function($query) {
                $query->orderBy('read_date', 'desc')->take(30);
            }]),
        ]);
    }

    /**
     * Display the authenticated user's profile in a public aesthetic view.
     */
    public function profile(Request $request)
    {
        $user = $request->user()->load(['readingStreak', 'favorites', 'bibleChapterReadings', 'readingLogs' => function($query) {
            $query->orderBy('read_date', 'desc')->take(30);
        }]);

        return Inertia::render('Profile/PublicShow', [
            'userDetail' => $user
        ]);
    }

    /**
     * Display the authenticated user's favorite verses in a public aesthetic view.
     */
    public function favorites(Request $request)
    {
        $favorites = $request->user()->favorites()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Profile/Favorites', [
            'favorites' => \App\Http\Resources\BibleFavoriteResource::collection($favorites)
        ]);
    }
}
