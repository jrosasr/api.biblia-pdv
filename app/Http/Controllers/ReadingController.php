<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrackReadingRequest;
use App\Http\Resources\ReadingStreakResource;
use App\Services\ReadingService;
use Illuminate\Support\Facades\Auth;

class ReadingController extends Controller
{
    protected $readingService;

    public function __construct(ReadingService $readingService)
    {
        $this->readingService = $readingService;
    }

    /**
     * Track a reading event.
     * Updates logs, streaks, and specific chapter tracking.
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
