<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBibleStoryRequest;
use App\Http\Requests\UpdateBibleStoryRequest;
use App\Models\BibleStory;
use App\Models\BibleSeries;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BibleStoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stories = BibleStory::with('series')->get();
        return Inertia::render('BibleStories/Index', [
            'stories' => $stories
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
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = Storage::url($request->file('cover_image')->store('stories', 'public'));
        }

        BibleStory::create($data);

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
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            // Delete old image
            if ($bibleStory->cover_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $bibleStory->cover_image));
            }
            $data['cover_image'] = Storage::url($request->file('cover_image')->store('stories', 'public'));
        } else {
            unset($data['cover_image']);
        }

        $bibleStory->update($data);

        return redirect()->route('bible-stories.index')
            ->with('success', 'Historia actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BibleStory $bibleStory)
    {
        if ($bibleStory->cover_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $bibleStory->cover_image));
        }
        $bibleStory->delete();

        return redirect()->route('bible-stories.index')
            ->with('success', 'Historia eliminada exitosamente.');
    }

    /**
     * Toggle favorite status for a story.
     */
    public function toggleFavorite(Request $request, BibleStory $bibleStory)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $activity = UserActivity::where('user_id', $user->id)
            ->where('type', 'favorite')
            ->where('activitable_type', BibleStory::class)
            ->where('activitable_id', $bibleStory->id)
            ->first();

        if ($activity) {
            $activity->delete();
            return response()->json([
                'message' => 'Quitado de favoritos',
                'is_favorite' => false
            ]);
        }

        UserActivity::create([
            'user_id' => $user->id,
            'type' => 'favorite',
            'activitable_type' => BibleStory::class,
            'activitable_id' => $bibleStory->id,
            'platform' => $request->header('X-Platform', 'web'),
        ]);

        return response()->json([
            'message' => 'Agregado a favoritos',
            'is_favorite' => true
        ]);
    }
}
