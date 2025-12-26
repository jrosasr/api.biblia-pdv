<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDevotionalRequest;
use App\Http\Requests\UpdateDevotionalRequest;
use App\Models\Devotional;
use App\Http\Resources\DevotionalResource;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DevotionalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $devotionals = Devotional::orderBy('created_at', 'desc')->get();
        if (request()->wantsJson()) {
            return DevotionalResource::collection($devotionals);
        }
        return Inertia::render('Devotionals/Index', [
            'devotionals' => DevotionalResource::collection($devotionals)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Devotionals/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDevotionalRequest $request)
    {
        $devotional = Devotional::create($request->all());

        if (request()->wantsJson()) {
            return new DevotionalResource($devotional);
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Devotional $devotional)
    {
        return new DevotionalResource($devotional);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devotional $devotional)
    {
        return Inertia::render('Devotionals/Edit', [
            'devotional' => new DevotionalResource($devotional)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDevotionalRequest $request, Devotional $devotional)
    {
        $devotional->update($request->all());

        if (request()->wantsJson()) {
            return new DevotionalResource($devotional);
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devotional $devotional)
    {
        $devotional->delete();

        if (request()->wantsJson()) {
             return response()->noContent();
        }

        return redirect()->route('devotionals.index')->with('success', 'Devocional eliminado con éxito.');
    }

    /**
     * Return the daily devotionals
     */
    public function dailyDevotionals()
    {
        $devotional = Devotional::where('status', 'published')->orderBy('created_at', 'desc')->first();
        if (!$devotional) {
             return response()->json(['message' => 'No published devotional found'], 404);
        }
        return new DevotionalResource($devotional);
    }
}
