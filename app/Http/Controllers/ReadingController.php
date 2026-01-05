<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrackReadingRequest;
use App\Http\Resources\ReadingStreakResource;
use App\Services\ReadingService;
use Illuminate\Support\Facades\Auth;

/**
 * @group Devotionals
 * @subgroup Reading Statistics
 */
class ReadingController extends Controller
{
    protected $readingService;

    public function __construct(ReadingService $readingService)
    {
        $this->readingService = $readingService;
    }

    /**
     * Track reading progress
     *
     * Updates history, streaks, and specific tracking of read chapters.
     * Should be called every time the user finishes reading a chapter or story.
     *
     * @authenticated
     */
    public function track(TrackReadingRequest $request)
    {
        $streak = $this->readingService->trackProgress(
            Auth::user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'Progreso y capítulo registrados correctamente',
            'streak' => new ReadingStreakResource($streak)
        ]);
    }
}
