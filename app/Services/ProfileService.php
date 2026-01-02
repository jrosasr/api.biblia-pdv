<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfileService
{
    /**
     * Update user profile.
     */
    public function updateProfile(User $user, array $data): void
    {
        $user->fill($data);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();
    }

    /**
     * Delete user account.
     */
    public function deleteAccount(User $user): void
    {
        Auth::logout();
        $user->delete();
    }
}
