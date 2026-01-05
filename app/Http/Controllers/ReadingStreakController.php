<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReadingStreakResource;
use App\Models\ReadingStreak;
use App\Services\ReadingService;
use Illuminate\Support\Facades\Auth;

/**
 * @group Devotionals
 * @subgroup Reading Statistics
 */
class ReadingStreakController extends Controller
{
    protected $readingService;

    public function __construct(ReadingService $readingService)
    {
        $this->readingService = $readingService;
    }

    /**
     * Get reading streak
     *
     * Returns the user's current streak of consecutive reading days.
     *
     * @authenticated
     */
    public function index()
    {
        $streak = Auth::user()->readingStreak ?? ReadingStreak::create(['user_id' => Auth::id()]);
        return new ReadingStreakResource($streak);
    }
}
