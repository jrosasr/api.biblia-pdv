<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReadingLogResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReadingLogController extends Controller
{
    /**
     * Display a listing of the user's reading logs.
     */
    public function index()
    {
        $logs = Auth::user()->readingLogs()
            ->orderBy('read_date', 'desc')
            ->paginate(30);

        return ReadingLogResource::collection($logs);
    }
}
