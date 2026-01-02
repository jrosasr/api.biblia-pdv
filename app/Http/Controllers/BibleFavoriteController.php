<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleFavoriteRequest;
use App\Http\Resources\BibleFavoriteResource;
use App\Services\BibleFavoriteService;
use Illuminate\Support\Facades\Auth;

class BibleFavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(BibleFavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    /**
     * Display a listing of the user's favorites.
     */
    public function index()
    {
        $favorites = $this->favoriteService->getUserFavorites(Auth::user());
        return BibleFavoriteResource::collection($favorites);
    }

    /**
     * Store a listing of favorites.
     */
    public function store(StoreBibleFavoriteRequest $request)
    {
        $saved = $this->favoriteService->syncFavorites(
            Auth::user(),
            $request->validated()['favorites']
        );

        return response()->json([
            'message' => 'Favoritos guardados exitosamente',
            'count' => $saved->count(),
            'data' => BibleFavoriteResource::collection($saved)
        ]);
    }

    /**
     * Remove the specified favorite.
     */
    public function destroy($favoriteId)
    {
        $deleted = $this->favoriteService->deleteFavorite(Auth::user(), $favoriteId);

        if ($deleted) {
            return response()->json(['message' => 'Favorito eliminado']);
        }

        return response()->json(['message' => 'Favorito no encontrado'], 404);
    }
}
