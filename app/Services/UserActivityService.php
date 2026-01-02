<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Database\Eloquent\Model;

class UserActivityService
{
    /**
     * Record a user activity.
     */
    public function recordActivity(User $user, string $type, Model $model, string $platform = 'web'): UserActivity
    {
        return UserActivity::create([
            'user_id' => $user->id,
            'type' => $type,
            'activitable_type' => get_class($model),
            'activitable_id' => $model->id,
            'platform' => $platform,
        ]);
    }

    /**
     * Get user activities.
     */
    public function getUserActivities(User $user)
    {
        return $user->activities()->latest()->paginate(20);
    }
}
