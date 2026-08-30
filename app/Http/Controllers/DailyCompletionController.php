<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDailyCompletionRequest;
use App\Http\Resources\DailyCompletionResource;
use App\Services\DailyCompletionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @group Devotionals
 * @subgroup Daily Habits
 *
 * Mirror of the habit progress the app keeps on the device. The app works
 * with no account at all; these endpoints exist so a user who has one can
 * carry their history between devices.
 *
 * @authenticated
 */
class DailyCompletionController extends Controller
{
    protected $completionService;

    public function __construct(DailyCompletionService $completionService)
    {
        $this->completionService = $completionService;
    }

    /**
     * List completions
     *
     * Returns the authenticated user's habit completions for a date range.
     *
     * @queryParam from string required Primer día del rango. Example: 2026-08-01
     * @queryParam to string required Último día del rango. Example: 2026-08-31
     *
     * @apiResourceCollection App\Http\Resources\DailyCompletionResource
     * @apiResourceModel App\Models\DailyCompletion
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'from' => 'required|date_format:Y-m-d',
            'to' => 'required|date_format:Y-m-d|after_or_equal:from',
        ]);

        $completions = $this->completionService->getRange(
            Auth::user(),
            $validated['from'],
            $validated['to']
        );

        return DailyCompletionResource::collection($completions);
    }

    /**
     * Sync completions
     *
     * Mirrors a batch of completions from the device. Sending the same batch
     * twice is safe: each completion is matched by day and habit, so a retry
     * updates the existing row instead of creating another.
     *
     * @response 200 {
     *  "message": "Completions synced successfully",
     *  "count": 2
     * }
     */
    public function store(StoreDailyCompletionRequest $request)
    {
        $saved = $this->completionService->sync(
            Auth::user(),
            $request->validated()['completions']
        );

        return response()->json([
            'message' => 'Completions synced successfully',
            'count' => $saved->count(),
            'data' => DailyCompletionResource::collection($saved),
        ]);
    }
}
