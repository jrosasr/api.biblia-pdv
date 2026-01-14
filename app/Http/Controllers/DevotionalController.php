<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDevotionalRequest;
use App\Http\Requests\UpdateDevotionalRequest;
use App\Models\Devotional;
use App\Http\Resources\DevotionalResource;
use App\Services\DevotionalService;
use Inertia\Inertia;
use Illuminate\Http\Request;

/**
 * @group Devotionals
 *
 * Management of daily devotionals and reading statistics.
 */
class DevotionalController extends Controller
{
    protected $devotionalService;

    public function __construct(DevotionalService $devotionalService)
    {
        $this->devotionalService = $devotionalService;
    }

    /**
     * List devotionals
     *
     * Retrieves a paginated list of all available devotionals.
     * Supports both administrative views (Inertia) and JSON responses for the API.
     *
     * @authenticated
     */
    public function index()
    {
        $devotionals = $this->devotionalService->getAllDevotionals();

        if (request()->wantsJson()) {
            return DevotionalResource::collection($devotionals);
        }

        return Inertia::render('Devotionals/Index', [
            'devotionals' => DevotionalResource::collection($devotionals)
        ]);
    }

    /**
     * Show the form for creating a new devotional.
     */
    public function create()
    {
        return Inertia::render('Devotionals/Create');
    }

    /**
     * Create a devotional
     *
     * Allows creating a new devotional in the system.
     *
     * @authenticated
     */
    public function store(StoreDevotionalRequest $request)
    {
        $devotional = $this->devotionalService->createDevotional($request->validated());

        if (request()->wantsJson()) {
            return new DevotionalResource($devotional);
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional creado con éxito.');
    }

    /**
     * View devotional
     *
     * Retrieves the details of a specific devotional by its ID or slug.
     *
     * @authenticated
     */
    public function show(Devotional $devotional)
    {
        return new DevotionalResource($devotional);
    }

    /**
     * Show the form for editing the specified devotional.
     */
    public function edit(Devotional $devotional)
    {
        return Inertia::render('Devotionals/Edit', [
            'devotional' => new DevotionalResource($devotional)
        ]);
    }

    /**
     * Update devotional
     *
     * Allows modifying data for an existing devotional.
     *
     * @authenticated
     */
    public function update(UpdateDevotionalRequest $request, Devotional $devotional)
    {
        $this->devotionalService->updateDevotional($devotional, $request->validated());

        if (request()->wantsJson()) {
            return new DevotionalResource($devotional);
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional actualizado con éxito.');
    }

    /**
     * Delete devotional
     *
     * Permanently deletes a devotional from the system.
     *
     * @authenticated
     */
    public function destroy(Devotional $devotional)
    {
        $this->devotionalService->deleteDevotional($devotional);

        if (request()->wantsJson()) {
             return response()->noContent();
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional eliminado con éxito.');
    }

    /**
     * Get devotional of the day
     *
     * Returns the most recent published devotional for today.
     * This is the main endpoint for the mobile application.
     *
     * @unauthenticated
     * @response 200 {
     *   "data": {
     *     "id": 1,
     *     "title": "A new beginning",
     *     "content": "...",
     *     "published_at": "2024-03-20T10:00:00.000000Z"
     *   }
     * }
     */
    public function dailyDevotionals(Request $request)
    {
        $count = $request->input('count');

        if ($count) {
            $devotionals = $this->devotionalService->getLatestDevotionals((int)$count);
            return DevotionalResource::collection($devotionals);
        }

        // Cache daily devotional for 1 hour (3600 seconds)
        $devotional = \Illuminate\Support\Facades\Cache::remember('daily_devotional', 3600, function () {
            return $this->devotionalService->getDailyDevotional();
        });

        if (!$devotional) {
            \Illuminate\Support\Facades\Cache::forget('daily_devotional');
            return response()->json(['message' => 'No published devotional found'], 404);
        }

        return new DevotionalResource($devotional);
    }

    public function publicShow(Request $request)
    {
        $slug = $request->input('slug');
        $devotionals = $this->devotionalService->getLatestDevotionals(10);
        
        if ($slug) {
            $specificDevotional = Devotional::where('slug', $slug)->first();
            if ($specificDevotional && $specificDevotional->published_at <= now()) {
                // Colocar el devocional específico al inicio
                $devotionals = collect([$specificDevotional])->concat($devotionals->where('slug', '!=', $slug))->take(4);
            }
        } else {
            $devotionals = $devotionals->take(4);
        }

        return Inertia::render('Devotionals/PublicShow', [
            'devotionals' => DevotionalResource::collection($devotionals)->resolve()
        ]);
    }

    /**
     * Increment readings
     *
     * Increments the reading count of a specific devotional.
     * Should be called every time a user opens the devotional.
     *
     * @unauthenticated
     * @urlParam devotional integer required The ID of the devotional. Example: 1
     */
    public function incrementReadings()
    {
        $devotional = $this->devotionalService->getDailyDevotional();

        if ($devotional) {
            $this->devotionalService->incrementReadings($devotional);
        }

        return response()->noContent();
    }
}
