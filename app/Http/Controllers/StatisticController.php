<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * Registrar una métrica (evento)
     */
    public function track(Request $request)
    {
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

        // Si es 24 horas, es solo un registro por evento del día actual.
        // Si son 7 o 30 días, queremos agrupar por evento para mostrar totales, 
        // o devolver la lista diaria para gráficas. 
        // Para este requerimiento simple de "tabla", agruparé los totales si el rango es mayor a 1 día.
        
        if ($filter !== '24h') {
            // Agrupar por evento para mostrar totales en el periodo
            $groupedStats = $stats->groupBy('event')->map(function ($items, $event) {
                return [
                    'event' => $event,
                    'name' => $items->first()->name,
                    'description' => $items->first()->description,
                    'impressions' => $items->sum('impressions'),
                    'clicks' => $items->sum('clicks'),
                    'scrolls' => $items->sum('scrolls'),
                    // También enviamos los datos diarios por si el frontend quiere graficar
                    'history' => $items->values(),
                ];
            })->values();
            
            return response()->json(['data' => $groupedStats]);
        }

        return response()->json(['data' => $stats]);
    }
}
