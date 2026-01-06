<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserDevotionalRequest;
use App\Http\Requests\UpdateUserDevotionalRequest;
use App\Http\Resources\UserDevotionalResource;
use App\Models\UserDevotional;
use App\Services\UserDevotionalService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserDevotionalController extends Controller
{
    use AuthorizesRequests;

    protected $service;

    public function __construct(UserDevotionalService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource for the public-style view.
     */
    public function publicIndex(Request $request)
    {
        $devotionals = $this->service->getUserDevotionals($request->user());

        return Inertia::render('UserDevotionals/PublicIndex', [
            'devotionals' => UserDevotionalResource::collection($devotionals)->resolve()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return redirect()->route('user-devotionals.public-index');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserDevotional $userDevotional)
    {
        $this->authorize('view', $userDevotional);

        return Inertia::render('UserDevotionals/Show', [
            'devotional' => (new UserDevotionalResource($userDevotional))->resolve()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserDevotionalRequest $request)
    {
        $this->service->store($request->user(), $request->validated());

        return redirect()->route('user-devotionals.public-index')
            ->with('message', 'Devocional creado exitosamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserDevotionalRequest $request, UserDevotional $userDevotional)
    {
        $this->authorize('update', $userDevotional);

        $this->service->update($userDevotional, $request->validated());

        return redirect()->route('user-devotionals.public-index')
            ->with('message', 'Devocional actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserDevotional $userDevotional)
    {
        $this->authorize('delete', $userDevotional);

        $this->service->delete($userDevotional);

        return redirect()->route('user-devotionals.public-index')
            ->with('message', 'Devocional eliminado exitosamente');
    }
}
