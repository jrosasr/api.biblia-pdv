<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReadingStreakResource;
use App\Models\ReadingStreak;
use App\Services\ReadingService;
use Illuminate\Support\Facades\Auth;

class ReadingStreakController extends Controller
{
    protected $readingService;

    public function __construct(ReadingService $readingService)
    {
        $this->readingService = $readingService;
    }

    /**
     * Get the authenticated user's reading streak.
     */
    public function index()
    {
        $streak = Auth::user()->readingStreak ?? ReadingStreak::create(['user_id' => Auth::id()]);
        return new ReadingStreakResource($streak);
    }
}
