<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReadingLogResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @group Devotionals
 * @subgroup Reading Statistics
 */
class ReadingLogController extends Controller
{
    /**
     * Reading history
     *
     * Retrieves a paginated list of days on which the user has performed readings.
     *
     * @authenticated
     */
    public function index()
    {
        $logs = Auth::user()->readingLogs()
            ->orderBy('read_date', 'desc')
            ->paginate(30);

        return ReadingLogResource::collection($logs);
    }
}
