<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StatisticController extends Controller
{
    /**
     * Registrar una métrica (evento)
     */
    public function track(Request $request)
    {
        Log::info('Statistics Track Request:', $request->all());

        $validated = $request->validate([
            'event' => 'required|string',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'type' => 'required|in:impression,scroll,click', // Tipo de métrica a incrementar
        ]);

        switch ($validated['type']) {
            case 'impression':
                \App\Models\Statistic::incrementImpressions(
                    $validated['event'], 
                    $validated['name'], 
                    $validated['description'] ?? null
                );
                break;
            case 'scroll':
                \App\Models\Statistic::incrementScrolls(
                    $validated['event'], 
                    $validated['name'], 
                    $validated['description'] ?? null
                );
                break;
            case 'click':
                \App\Models\Statistic::incrementClicks(
                    $validated['event'], 
                    $validated['name'], 
                    $validated['description'] ?? null
                );
                break;
        }

        return response()->json(['success' => true]);
    }

    /**
     * Obtener estadísticas para el dashboard
     */
    public function index(Request $request)
    {
        // Solo admins pueden ver esto (se controlará también en rutas)
        if (!$request->user() || !$request->user()->hasRole('admin')) {
             abort(403, 'No autorizado');
        }

        $filter = $request->input('period', '24h'); // 24h, 7d, 30d
        
        $stats = match($filter) {
            '24h' => \App\Models\Statistic::getLast24Hours(),
            '7d' => \App\Models\Statistic::getLast7Days(),
            '30d' => \App\Models\Statistic::getLast30Days(),
            default => \App\Models\Statistic::getLast24Hours(),
        };

        // Devolvemos la lista de registros (desglose diario) para poder mostrar la fecha
        return response()->json(['data' => $stats]);
    }
}
