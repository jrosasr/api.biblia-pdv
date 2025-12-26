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
     * Muestra una lista de los recursos.
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
     * Muestra el formulario para crear un nuevo recurso.
     */
    public function create()
    {
        return Inertia::render('Devotionals/Create');
    }

    /**
     * Almacena un nuevo devocional en el almacenamiento.
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
     * Muestra el devocional especificado.
     */
    public function show(Devotional $devotional)
    {
        return new DevotionalResource($devotional);
    }

    /**
     * Muestra el formulario para editar el devocional especificado.
     */
    public function edit(Devotional $devotional)
    {
        return Inertia::render('Devotionals/Edit', [
            'devotional' => new DevotionalResource($devotional)
        ]);
    }

    /**
     * Actualiza el devocional
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
     * Elimina el devocional
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
     * Obtiene el devocional diario
     */
    public function dailyDevotionals()
    {
        $devotional = Devotional::where('status', 'published')->orderBy('created_at', 'desc')->first();
        if (!$devotional) {
             return response()->json(['message' => 'No published devotional found'], 404);
        }
        return new DevotionalResource($devotional);
    }

    /**
     * Incrementa las lecturas de un devocional
     */
    public function incrementReadings(Devotional $devotional)
    {
        $devotional->increment('readings');
        return response()->noContent();
    }
}
