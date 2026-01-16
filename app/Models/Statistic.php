<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
    ];

    protected $casts = [
        'date' => 'date',
        'impressions' => 'integer',
        'scrolls' => 'integer',
        'clicks' => 'integer',
    ];

    /**
     * Incrementar impresiones para un evento en una fecha específica
     */
    public static function incrementImpressions(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        $date = $date ?? now()->format('Y-m-d');
        
        static::updateOrCreate(
            ['event' => $event, 'date' => $date],
            [
                'name' => $name,
                'description' => $description,
                'impressions' => \DB::raw('impressions + 1'),
            ]
        );
    }

    /**
     * Incrementar scrolls para un evento en una fecha específica
     */
    public static function incrementScrolls(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        $date = $date ?? now()->format('Y-m-d');
        
        static::updateOrCreate(
            ['event' => $event, 'date' => $date],
            [
                'name' => $name,
                'description' => $description,
                'scrolls' => \DB::raw('scrolls + 1'),
            ]
        );
    }

    /**
     * Incrementar clicks para un evento en una fecha específica
     */
    public static function incrementClicks(string $event, string $name, ?string $description = null, ?string $date = null): void
    {
        $date = $date ?? now()->format('Y-m-d');
        
        static::updateOrCreate(
            ['event' => $event, 'date' => $date],
            [
                'name' => $name,
                'description' => $description,
                'clicks' => \DB::raw('clicks + 1'),
            ]
        );
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
