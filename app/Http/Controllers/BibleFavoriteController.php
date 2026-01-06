<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleFavoriteRequest;
use App\Http\Resources\BibleFavoriteResource;
use App\Services\BibleFavoriteService;
use Illuminate\Support\Facades\Auth;

/**
 * @group Favorite Management
 *
 * Endpoints for users to manage their favorite verses and personal notes.
 * All endpoints require authentication.
 *
 * @authenticated
 */
class BibleFavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(BibleFavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    /**
     * List favorites
     *
     * Retrieves all verses marked as favorites by the authenticated user.
     *
     * @apiResourceCollection App\Http\Resources\BibleFavoriteResource
     * @apiResourceModel App\Models\BibleFavorite
     */
    public function index()
    {
        $favorites = $this->favoriteService->getUserFavorites(Auth::user());
        return BibleFavoriteResource::collection($favorites);
    }

    /**
     * Sync/Save favorites
     *
     * Allows saving a bulk list of favorites. If the `id` already exists, the note or content will be updated.
     *
     * @response 201 {
     *  "message": "Favorites saved successfully",
     *  "count": 1,
     *  "data": [
     *    {
     *      "id": "uuid-1234",
     *      "versionId": "RV1960",
     *      "bookNumber": 43,
     *      "bookName": "Juan",
     *      "chapter": 3,
     *      "verse": 16,
     *      "text": "For God so loved the world...",
     *      "note": "Central verse",
     *      "verses": null,
     *      "createdAt": "2024-03-20T15:00:00.000000Z"
     *    }
     *  ]
     * }
     */
    public function store(StoreBibleFavoriteRequest $request)
    {
        $saved = $this->favoriteService->syncFavorites(
            Auth::user(),
            $request->validated()['favorites']
        );

        if ($request->header('X-Inertia')) {
            return back()->with('success', 'Favoritos guardados exitosamente');
        }

        return response()->json([
            'message' => 'Favoritos guardados exitosamente',
            'count' => $saved->count(),
            'data' => BibleFavoriteResource::collection($saved)
        ]);
    }

    /**
     * Delete favorite
     *
     * Deletes a specific verse from the user's favorites list.
     *
     * @authenticated
     * @urlParam favoriteId string required The unique ID of the favorite. Example: fav_998877
     * @response 200 { "message": "Favorite deleted" }
     * @response 404 { "message": "Favorite not found" }
     */
    public function destroy($favoriteId)
    {
        $deleted = $this->favoriteService->deleteFavorite(Auth::user(), $favoriteId);

        if (request()->header('X-Inertia')) {
            if ($deleted) {
                return back()->with('success', 'Favorito eliminado');
            }
            return back()->with('error', 'Favorito no encontrado');
        }

        if ($deleted) {
            return response()->json(['message' => 'Favorito eliminado']);
        }

        return response()->json(['message' => 'Favorito no encontrado'], 404);
    }
}