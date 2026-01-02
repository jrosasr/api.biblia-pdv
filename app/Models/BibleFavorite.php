<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BibleFavorite extends Model
{
    protected $fillable = [
        'user_id',
        'favorite_id',
        'version_id',
        'book_number',
        'book_name',
        'chapter',
        'verse',
        'text',
        'note',
        'verses',
    ];

    protected $casts = [
        'verses' => 'array',
        'book_number' => 'integer',
        'chapter' => 'integer',
        'verse' => 'integer',
    ];

    /**
     * Get the user that owns the favorite.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
