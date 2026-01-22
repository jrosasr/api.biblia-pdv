<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devotional extends Model
{
    /** @use HasFactory<\Database\Factories\DevotionalFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'published',
        'slug',
        'status',
        'readings',
        'published_at',
    ];

    protected $casts = [
        'content' => 'array',
        'published' => 'boolean',
        'readings' => 'integer',
        'published_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($devotional) {
            if (empty($devotional->slug)) {
                $devotional->slug = \Illuminate\Support\Str::slug($devotional->title);
            }
        });

        static::updating(function ($devotional) {
            if ($devotional->isDirty('title') && !$devotional->isDirty('slug')) {
                $devotional->slug = \Illuminate\Support\Str::slug($devotional->title);
            }
        });
    }
}
