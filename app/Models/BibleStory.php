<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

use App\Models\UserActivity;
use App\Models\BibleSeries;

class BibleStory extends Model
{
    /** @use HasFactory<\Database\Factories\BibleStoryFactory> */
    use HasFactory;

    protected $fillable = [
        'series_id',
        'title',
        'description',
        'cover_image',
        'book',
        'chapter_start',
        'verse_start',
        'chapter_end',
        'verse_end',
    ];

    public function series(): BelongsTo
    {
        return $this->belongsTo(BibleSeries::class);
    }

    /**
     * Get all of the activities for the BibleStory
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function activities(): MorphMany
    {
        return $this->morphMany(UserActivity::class, 'activitable');
    }
}
