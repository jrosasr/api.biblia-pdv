<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleFavoriteRequest;
use App\Http\Resources\BibleFavoriteResource;
use App\Models\BibleFavorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BibleFavoriteController extends Controller
{
    /**
     * Display a listing of the user's favorites.
     */
    public function index()
    {
        $favorites = Auth::user()->favorites()
            ->orderBy('created_at', 'desc')
            ->get();

        return BibleFavoriteResource::collection($favorites);
    }

    /**
     * Store a listing of favorites.
     */
    public function store(StoreBibleFavoriteRequest $request)
    {
        $validated = $request->validated();
        
        Log::info('Syncing favorites', ['count' => count($validated['favorites'])]);

        $user = Auth::user();
        $saved = [];

        foreach ($validated['favorites'] as $item) {
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
                    'verses' => $item['verses'] ?? null,
                ]
            );
            $saved[] = $favorite;
        }

        return response()->json([
            'message' => 'Favoritos guardados exitosamente',
            'count' => count($saved),
            'data' => BibleFavoriteResource::collection($saved)
        ]);
    }

    /**
     * Remove the specified favorite.
     */
    public function destroy($favoriteId)
    {
        $deleted = Auth::user()->favorites()
            ->where('favorite_id', $favoriteId)
            ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Favorito eliminado']);
        }

        return response()->json(['message' => 'Favorito no encontrado'], 404);
    }
}
