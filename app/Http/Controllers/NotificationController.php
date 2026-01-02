<?php

namespace App\Http\Controllers;

use App\Models\Devotional;
use App\Services\NotificationService;
use App\Services\DevotionalService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $notificationService;
    protected $devotionalService;

    public function __construct(NotificationService $notificationService, DevotionalService $devotionalService)
    {
        $this->notificationService = $notificationService;
        $this->devotionalService = $devotionalService;
    }

    /**
     * Notify users about the latest published devotional.
     */
    public function notifyNewDevotional(Request $request)
    {
        try {
            $devotional = $this->devotionalService->getDailyDevotional();

            if (!$devotional) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No hay devocionales publicados para notificar.'
                ], 404);
            }

            $this->notificationService->notifyNewDevotional($devotional);

            if ($request->wantsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Notificación enviada a todos los dispositivos (topic: all).'
                ]);
            }

            return redirect()->back()->with('success', 'Notificación enviada con éxito.');

        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error al enviar la notificación: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()->withErrors(['error' => 'Error al enviar la notificación: ' . $e->getMessage()]);
        }
    }
}
