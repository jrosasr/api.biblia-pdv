<?php

namespace App\Http\Controllers;

use App\Models\Devotional;
use Illuminate\Http\Request;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class NotificationController extends Controller
{
    public function notifyNewDevotional(Request $request)
    {
        try {
            // Get the latest published devotional
            $devotional = Devotional::where('status', 'published')
                ->orderBy('published_at', 'desc')
                ->first();

            if (!$devotional) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No hay devocionales publicados para notificar.'
                ], 404);
            }

            $messaging = app('firebase.messaging');

            $title = "¡Nuevo Devocional Disponible!";
            $body = $devotional->title;

            $message = CloudMessage::withTarget('topic', 'all')
                ->withNotification(Notification::create($title, $body))
                ->withData([
                    'type' => 'new_devotional',
                    'devotional_id' => (string)$devotional->id,
                    'click_action' => 'FLUTTER_NOTIFICATION_CLICK'
                ]);

            $messaging->send($message);

            if ($request->wantsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Notificación enviada a todos los dispositivos (topic: all).'
                ]);
            }

            return redirect()->back()->with('success', 'Notificación enviada con éxito.');

        } catch (\Exception $e) {
            \Log::error("FCM Notification Error: " . $e->getMessage());
            
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
