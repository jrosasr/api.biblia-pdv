<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Statistic extends Model
{
    protected $fillable = [
        'event',
        'name',
        'description',
        'date',
        'impressions',
        'scrolls',
        'clicks',
        'uniques',
    ];

    protected $casts = [
        'date' => 'date',
        'impressions' => 'integer',
        'scrolls' => 'integer',
        'clicks' => 'integer',
        'uniques' => 'integer',
    ];

    /**
     * Incrementar impresiones para un evento en una fecha específica
     */
    /**
     * Helper privado para incrementar una columna
     */
    private static function incrementMetric(string $column, string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        $date = $date ?? now()->format('Y-m-d');
        $ip = request()->ip();

        // Registrar el hit individual (siempre se registra para auditoría/userAgent)
        StatisticHit::log($event, Auth::id());

        // Si es el primer hit de esta IP para este evento hoy, es una visita única
        $hitsToday = StatisticHit::where('event', $event)
            ->where('date', $date)
            ->where('ip_address', $ip)
            ->count();
        
        $shouldIncrementUnique = ($hitsToday === 1);

        $stat = static::firstOrCreate(
            ['event' => $event, 'date' => $date],
            [
                'name' => $name,
                'description' => $description,
                'impressions' => 0,
                'scrolls' => 0,
                'clicks' => 0,
                'uniques' => 0,
            ]
        );

        $stat->increment($column);
        
        if ($shouldIncrementUnique) {
            $stat->increment('uniques');
        }
        
        // Actualizar metadatos si han cambiado
        if ($stat->name !== $name || $stat->description !== $description) {
            $stat->update(['name' => $name, 'description' => $description]);
        }
    }

    /**
     * Incrementar impresiones para un evento en una fecha específica
     */
    public static function incrementImpressions(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        static::incrementMetric('impressions', $event, $name, $description, $date);
    }

    /**
     * Incrementar scrolls para un evento en una fecha específica
     */
    public static function incrementScrolls(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        static::incrementMetric('scrolls', $event, $name, $description, $date);
    }

    /**
     * Incrementar clicks para un evento en una fecha específica
     */
    public static function incrementClicks(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        static::incrementMetric('clicks', $event, $name, $description, $date);
    }

    /**
     * Obtener estadísticas de un rango de fechas
     */
    public static function getByDateRange(string $startDate, string $endDate, ?string $event = null)
    {
        $query = static::whereBetween('date', [$startDate, $endDate]);
        
        if ($event) {
            $query->where('event', $event);
        }
        
        return $query->orderBy('date', 'desc')->get();
    }

    /**
     * Obtener estadísticas de las últimas 24 horas
     */
    public static function getLast24Hours(?string $event = null)
    {
        $date = now()->format('Y-m-d');
        return static::getByDateRange($date, $date, $event);
    }

    /**
     * Obtener estadísticas de los últimos 7 días
     */
    public static function getLast7Days(?string $event = null)
    {
        $startDate = now()->subDays(6)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');
        return static::getByDateRange($startDate, $endDate, $event);
    }

    /**
     * Obtener estadísticas de los últimos 30 días
     */
    public static function getLast30Days(?string $event = null)
    {
        $startDate = now()->subDays(29)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');
        return static::getByDateRange($startDate, $endDate, $event);
    }
}
