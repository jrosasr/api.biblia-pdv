<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDevotionalRequest;
use App\Http\Requests\UpdateDevotionalRequest;
use App\Models\Devotional;
use App\Http\Resources\DevotionalResource;
use App\Services\DevotionalService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DevotionalController extends Controller
{
    protected $devotionalService;

    public function __construct(DevotionalService $devotionalService)
    {
        $this->devotionalService = $devotionalService;
    }

    /**
     * Display a listing of the devotionals.
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
     * Store a new devotional in storage.
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
     * Display the specified devotional.
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
     * Update the devotional.
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
     * Delete the devotional.
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
     * Get the latest daily devotional.
     */
    public function dailyDevotionals()
    {
        $devotional = $this->devotionalService->getDailyDevotional();
        if (!$devotional) {
             return response()->json(['message' => 'No published devotional found'], 404);
        }
        return new DevotionalResource($devotional);
    }

    /**
     * Increment the readings count.
     */
    public function incrementReadings(Devotional $devotional)
    {
        $this->devotionalService->incrementReadings($devotional);
        return response()->noContent();
    }
}
