<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

use App\Models\User;

class UserActivity extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'activitable_id',
        'activitable_type',
        'platform',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activitable()
    {
        return $this->morphTo();
    }
}
