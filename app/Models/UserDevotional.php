<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDevotional extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
