<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDevotionalRequest;
use App\Http\Requests\UpdateDevotionalRequest;
use App\Models\Devotional;

class DevotionalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Devotional::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('devotional.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDevotionalRequest $request)
    {
        return Devotional::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Devotional $devotional)
    {
        return $devotional;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devotional $devotional)
    {
        return view('devotional.edit', compact('devotional'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDevotionalRequest $request, Devotional $devotional)
    {
        return $devotional->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devotional $devotional)
    {
        return $devotional->delete();
    }
}
