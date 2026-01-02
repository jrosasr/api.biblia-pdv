<?php

namespace App\Http\Controllers;

use App\Services\UserActivityService;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    protected $activityService;

    public function __construct(UserActivityService $activityService)
    {
        $this->activityService = $activityService;
    }
}
