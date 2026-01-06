<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserDevotional;
use Illuminate\Database\Eloquent\Collection;

class UserDevotionalService
{
    /**
     * Get all devotionals for a given user.
     */
    public function getUserDevotionals(User $user): Collection
    {
        return $user->userDevotionals()->latest()->get();
    }

    /**
     * Store a new user devotional.
     */
    public function store(User $user, array $data): UserDevotional
    {
        return $user->userDevotionals()->create($data);
    }

    /**
     * Update an existing user devotional.
     */
    public function update(UserDevotional $userDevotional, array $data): bool
    {
        return $userDevotional->update($data);
    }

    /**
     * Delete a user devotional.
     */
    public function delete(UserDevotional $userDevotional): bool
    {
        return $userDevotional->delete();
    }
}
