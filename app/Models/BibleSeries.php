<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

use App\Models\UserActivity;
use App\Models\BibleStory;

class BibleSeries extends Model
{
    /** @use HasFactory<\Database\Factories\BibleSeriesFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'cover_image',
        'difficulty_level',
    ];

    public function stories(): HasMany
    {
        return $this->hasMany(BibleStory::class, 'series_id');
    }

    /**
     * Get all of the activities for the BibleSeries
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function activities(): MorphMany
    {
        return $this->morphMany(UserActivity::class, 'activitable');
    }
}
