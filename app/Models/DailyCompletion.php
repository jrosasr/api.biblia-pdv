<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyCompletion extends Model
{
    protected $fillable = [
        'user_id',
        'uuid',
        'date',
        'habit_key',
        'completed_at',
        'payload',
    ];

    protected $casts = [
        'date' => 'date',
        'completed_at' => 'datetime',
        'payload' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
