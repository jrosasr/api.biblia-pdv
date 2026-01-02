<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleStoryRequest;
use App\Http\Requests\UpdateBibleStoryRequest;
use App\Models\BibleStory;
use App\Models\BibleSeries;
use App\Services\BibleStoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BibleStoryController extends Controller
{
    protected $storyService;

    public function __construct(BibleStoryService $storyService)
    {
        $this->storyService = $storyService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BibleStories/Index', [
            'stories' => $this->storyService->getAllStories()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BibleStories/Create', [
            'series' => BibleSeries::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBibleStoryRequest $request)
    {
        $this->storyService->createStory(
            $request->validated(),
            $request->file('cover_image')
        );

        return redirect()->route('bible-stories.index')
            ->with('success', 'Historia creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BibleStory $bibleStory)
    {
        return Inertia::render('BibleStories/Show', [
            'story' => $bibleStory->load('series')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BibleStory $bibleStory)
    {
        return Inertia::render('BibleStories/Edit', [
            'story' => $bibleStory,
            'series' => BibleSeries::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBibleStoryRequest $request, BibleStory $bibleStory)
    {
        $this->storyService->updateStory(
            $bibleStory,
            $request->validated(),
            $request->file('cover_image')
        );

        return redirect()->route('bible-stories.index')
            ->with('success', 'Historia actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BibleStory $bibleStory)
    {
        $this->storyService->deleteStory($bibleStory);

        return redirect()->route('bible-stories.index')
            ->with('success', 'Historia eliminada exitosamente.');
    }

    /**
     * Toggle favorite status for a story.
     */
    public function toggleFavorite(Request $request, BibleStory $bibleStory)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $result = $this->storyService->toggleFavorite(
            $user,
            $bibleStory,
            $request->header('X-Platform', 'web')
        );

        return response()->json($result);
    }
}
