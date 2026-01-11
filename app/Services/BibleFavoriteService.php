<?php

namespace App\Services;

use App\Models\User;
use App\Models\BibleFavorite;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class BibleFavoriteService
{
    /**
     * Get user favorites.
     */
    public function getUserFavorites(User $user): Collection
    {
        return $user->favorites()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Sync favorites for a user.
     */
    public function syncFavorites(User $user, array $favoritesData): Collection
    {
        Log::info('Syncing favorites via Service', ['count' => count($favoritesData)]);
        
        $saved = collect();

        foreach ($favoritesData as $item) {
            $favorite = $user->favorites()->updateOrCreate(
                ['favorite_id' => $item['id']],
                [
                    'version_id' => $item['versionId'] ?? null,
                    'book_number' => $item['bookNumber'],
                    'book_name' => $item['bookName'],
                    'chapter' => $item['chapter'],
                    'verse' => $item['verse'],
                    'text' => $item['text'],
                    'note' => $item['note'] ?? null,
                    'color' => $item['color'] ?? null,
                    'verses' => $item['verses'] ?? null,
                ]
            );
            $saved->push($favorite);
        }

        return $saved;
    }

    /**
     * Delete a favorite.
     */
    public function deleteFavorite(User $user, string $favoriteId): bool
    {
        return (bool) $user->favorites()
            ->where('favorite_id', $favoriteId)
            ->delete();
    }
}
