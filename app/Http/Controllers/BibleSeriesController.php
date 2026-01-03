<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleSeriesRequest;
use App\Http\Requests\UpdateBibleSeriesRequest;
use App\Models\BibleSeries;
use App\Services\BibleSeriesService;
use App\Http\Resources\BibleSeriesResource; // Imported
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibleSeriesController extends Controller
{
    protected $seriesService;

    public function __construct(BibleSeriesService $seriesService)
    {
        $this->seriesService = $seriesService;
    }

    /**
     * API: List all series.
     */
    public function list(Request $request)
    {
        $series = $this->seriesService->getAllSeries();
        return BibleSeriesResource::collection($series);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BibleSeries/Index', [
            'series' => BibleSeriesResource::collection($this->seriesService->getAllSeries())->resolve()
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
        $this->seriesService->createSeries(
            $request->validated(),
            $request->file('cover_image')
        );

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
        $this->seriesService->updateSeries(
            $bibleSeries,
            $request->validated(),
            $request->file('cover_image')
        );

        return redirect()->route('bible-series.index')
            ->with('success', 'Serie actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BibleSeries $bibleSeries)
    {
        $this->seriesService->deleteSeries($bibleSeries);

        return redirect()->route('bible-series.index')
            ->with('success', 'Serie eliminada exitosamente.');
    }
}
