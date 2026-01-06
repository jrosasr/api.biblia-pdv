<?php

namespace App\Services;

use App\Models\Devotional;
use Illuminate\Database\Eloquent\Collection;

class DevotionalService
{
    /**
     * Get all devotionals.
     */
    public function getAllDevotionals(): Collection
    {
        return Devotional::orderBy('created_at', 'desc')->get();
    }

    /**
     * Create a new devotional.
     */
    public function createDevotional(array $data): Devotional
    {
        return Devotional::create($data);
    }

    /**
     * Update a devotional.
     */
    public function updateDevotional(Devotional $devotional, array $data): Devotional
    {
        $devotional->update($data);
        return $devotional;
    }

    /**
     * Delete a devotional.
     */
    public function deleteDevotional(Devotional $devotional): bool
    {
        return $devotional->delete();
    }

    /**
     * Get the latest daily devotional.
     */
    public function getDailyDevotional(): ?Devotional
    {
        return Devotional::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->first();
    }

    /**
     * Get the latest published devotionals.
     */
    public function getLatestDevotionals(int $count = 4): Collection
    {
        return Devotional::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->limit($count)
            ->get();
    }

    /**
     * Increment readings count.
     */
    public function incrementReadings(Devotional $devotional): void
    {
        $devotional->increment('readings');
    }
}
