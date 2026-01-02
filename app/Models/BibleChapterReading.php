<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BibleChapterReading extends Model
{
    protected $fillable = [
        'user_id',
        'version_id',
        'book_number',
        'book_name',
        'chapter_number',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
