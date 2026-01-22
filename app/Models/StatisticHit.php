<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatisticHit extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'event',
        'ip_address',
        'user_agent',
        'browser',
        'platform',
        'device',
        'user_id',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Registrar un hit con metadatos del request
     */
    public static function log(string $event, ?int $userId = null): self
    {
        $userAgent = request()->header('User-Agent');
        $parser = static::parseUserAgent($userAgent);

        return static::create([
            'event' => $event,
            'ip_address' => request()->ip(),
            'user_agent' => $userAgent,
            'browser' => $parser['browser'],
            'platform' => $parser['platform'],
            'device' => $parser['device'],
            'user_id' => $userId,
            'date' => now()->format('Y-m-d'),
        ]);
    }

    /**
     * Parseador simple de User Agent (Sin librerías externas)
     */
    private static function parseUserAgent(?string $ua): array
    {
        $browser = 'Unknown';
        $platform = 'Unknown';
        $device = 'desktop';

        if (!$ua) {
            return compact('browser', 'platform', 'device');
        }

        // Detectar Plataforma
        if (preg_match('/android/i', $ua)) $platform = 'Android';
        elseif (preg_match('/iphone|ipad|ipod/i', $ua)) $platform = 'iOS';
        elseif (preg_match('/linux/i', $ua)) $platform = 'Linux';
        elseif (preg_match('/macintosh|mac os x/i', $ua)) $platform = 'Mac';
        elseif (preg_match('/windows|win32/i', $ua)) $platform = 'Windows';

        // Detectar Navegador
        if (preg_match('/edge/i', $ua)) $browser = 'Edge';
        elseif (preg_match('/firefox/i', $ua)) $browser = 'Firefox';
        elseif (preg_match('/chrome/i', $ua)) $browser = 'Chrome';
        elseif (preg_match('/safari/i', $ua)) $browser = 'Safari';
        elseif (preg_match('/opera|opr/i', $ua)) $browser = 'Opera';

        // Detectar Dispositivo
        if (preg_match('/mobile|android|iphone|ipad|ipod|blackberry|phone/i', $ua)) {
            $device = 'mobile';
            if (preg_match('/ipad|tablet/i', $ua)) {
                $device = 'tablet';
            }
        }

        return compact('browser', 'platform', 'device');
    }
}
