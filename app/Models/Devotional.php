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
}
