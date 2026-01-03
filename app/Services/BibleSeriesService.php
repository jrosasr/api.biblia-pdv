<?php

namespace App\Services;

use App\Models\BibleSeries;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class BibleSeriesService
{
    /**
     * Get all bible series.
     */
    public function getAllSeries(): Collection
    {
        return BibleSeries::withCount('stories')->get();
    }

    /**
     * Create a new bible series.
     */
    public function createSeries(array $data, ?UploadedFile $image = null): BibleSeries
    {
        if ($image) {
            $data['cover_image'] = $image->store('series', 'public');
        }

        return BibleSeries::create($data);
    }

    /**
     * Update a bible series.
     */
    public function updateSeries(BibleSeries $series, array $data, ?UploadedFile $image = null): BibleSeries
    {
        if ($image) {
            // Delete old image
            if ($series->cover_image) {
                Storage::disk('public')->delete($series->cover_image);
            }
            $data['cover_image'] = $image->store('series', 'public');
        }

        $series->update($data);
        return $series;
    }

    /**
     * Delete a bible series.
     */
    public function deleteSeries(BibleSeries $series): bool
    {
        if ($series->cover_image) {
            Storage::disk('public')->delete($series->cover_image);
        }
        return $series->delete();
    }
}
