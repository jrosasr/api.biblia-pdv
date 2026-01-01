<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountDeletionController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/AccountDeletion');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'email' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
            ]);
        }

        // Deleting the user
        $user->delete();

        return redirect('/')->with('success', 'Tu cuenta ha sido eliminada permanentemente.');
    }
}
