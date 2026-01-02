<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleSeriesRequest;
use App\Http\Requests\UpdateBibleSeriesRequest;
use App\Models\BibleSeries;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BibleSeriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $series = BibleSeries::withCount('stories')->get();
        return Inertia::render('BibleSeries/Index', [
            'series' => $series
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BibleSeries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBibleSeriesRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = Storage::url($request->file('cover_image')->store('series', 'public'));
        }

        BibleSeries::create($data);

        return redirect()->route('bible-series.index')
            ->with('success', 'Serie creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BibleSeries $bibleSeries)
    {
        return Inertia::render('BibleSeries/Show', [
            'series' => $bibleSeries->load('stories')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BibleSeries $bibleSeries)
    {
        return Inertia::render('BibleSeries/Edit', [
            'series' => $bibleSeries
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBibleSeriesRequest $request, BibleSeries $bibleSeries)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            // Delete old image
            if ($bibleSeries->cover_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $bibleSeries->cover_image));
            }
            $data['cover_image'] = Storage::url($request->file('cover_image')->store('series', 'public'));
        } else {
            unset($data['cover_image']);
        }

        $bibleSeries->update($data);

        return redirect()->route('bible-series.index')
            ->with('success', 'Serie actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BibleSeries $bibleSeries)
    {
        if ($bibleSeries->cover_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $bibleSeries->cover_image));
        }
        $bibleSeries->delete();

        return redirect()->route('bible-series.index')
            ->with('success', 'Serie eliminada exitosamente.');
    }
}
