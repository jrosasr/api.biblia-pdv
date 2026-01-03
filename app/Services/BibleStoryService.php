<?php

namespace App\Services;

use App\Models\BibleStory;
use App\Models\User;
use App\Models\UserActivity;
use App\Models\BibleSeries;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class BibleStoryService
{
    /**
     * Get all bible stories.
     */
    public function getAllStories(): Collection
    {
        return BibleStory::with('series')->get();
    }

    /**
     * Get stories by series.
     */
    public function getStoriesBySeries(BibleSeries $series): Collection
    {
        return BibleStory::where('series_id', $series->id)->get();
    }

    /**
     * Create a new bible story.
     */
    public function createStory(array $data, ?UploadedFile $image = null): BibleStory
    {
        if ($image) {
            $data['cover_image'] = $image->store('stories', 'public');
        }

        return BibleStory::create($data);
    }

    /**
     * Update a bible story.
     */
    public function updateStory(BibleStory $story, array $data, ?UploadedFile $image = null): BibleStory
    {
        if ($image) {
            // Delete old image
            if ($story->cover_image) {
                Storage::disk('public')->delete($story->cover_image);
            }
            $data['cover_image'] = $image->store('stories', 'public');
        }

        $story->update($data);
        return $story;
    }

    /**
     * Delete a bible story.
     */
    public function deleteStory(BibleStory $story): bool
    {
        if ($story->cover_image) {
            Storage::disk('public')->delete($story->cover_image);
        }
        return $story->delete();
    }

    /**
     * Toggle favorite status.
     */
    public function toggleFavorite(User $user, BibleStory $story, string $platform = 'web'): array
    {
        $activity = UserActivity::where('user_id', $user->id)
            ->where('type', 'favorite')
            ->where('activitable_type', BibleStory::class)
            ->where('activitable_id', $story->id)
            ->first();

        if ($activity) {
            $activity->delete();
            return [
                'message' => 'Quitado de favoritos',
                'is_favorite' => false
            ];
        }

        UserActivity::create([
            'user_id' => $user->id,
            'type' => 'favorite',
            'activitable_type' => BibleStory::class,
            'activitable_id' => $story->id,
            'platform' => $platform,
        ]);

        return [
            'message' => 'Agregado a favoritos',
            'is_favorite' => true
        ];
    }
}
