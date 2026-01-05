<?php

namespace App\Http\Controllers;

use App\Models\Devotional;
use App\Services\NotificationService;
use App\Services\DevotionalService;
use Illuminate\Http\Request;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

/**
 * @group Notifications
 *
 * Endpoints for sending push notifications and testing FCM.
 */
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
    /**
     * Send a custom notification to all devices.
     */
    public function sendCustomNotification(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:500',
        ]);

        try {
            $this->notificationService->notifyTopic(
                'all',
                $request->title,
                $request->body,
                ['type' => 'custom_notification']
            );

            if ($request->wantsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Notificación personalizada enviada con éxito.'
                ]);
            }

            return redirect()->back()->with('success', 'Notificación personalizada enviada con éxito.');

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
    /**
     * Test FCM notification
     *
     * Sends a test notification to a specific device token or to a topic.
     * Useful for verifying that push notifications are working correctly.
     *
     * @authenticated
     * @queryParam token string The FCM device token. Example: fcm_token_123
     * @queryParam topic string The FCM topic (defaults to 'all'). Example: all
     * @queryParam title string The notification title. Example: Test Title
     * @queryParam body string The notification body. Example: This is a test message.
     */
    public function testFcm(Request $request)
    {
        try {
            $messaging = app('firebase.messaging');
            $token = $request->query('token');
            $topic = $request->query('topic', 'all');

            if ($token) {
                $message = CloudMessage::withTarget('token', $token);
            } else {
                $message = CloudMessage::withTarget('topic', $topic);
            }

            $message = $message->withNotification(Notification::create(
                $request->query('title', 'Prueba de FCM'),
                $request->query('body', '¡Hola! Este es un mensaje de prueba desde la API.')
            ))
            ->withData(['test' => 'data']);

            $messaging->send($message);
            
            return response()->json([
                'status' => 'success', 
                'message' => 'Notificación enviada con éxito',
                'target' => $token ? 'token' : "topic: $topic"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error', 
                'message' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Subscribe to topic
     *
     * Subscribes a device token to a specific FCM topic.
     *
     * @unauthenticated
     * @bodyParam token string required The FCM device token. Example: fcm_token_123
     * @bodyParam topic string The FCM topic (defaults to 'all'). Example: all
     */
    public function subscribeTopic(Request $request)
    {
        try {
            $messaging = app('firebase.messaging');
            $token = $request->input('token');
            $topic = $request->input('topic', 'all');

            if (!$token) {
                return response()->json(['message' => 'Token is required'], 400);
            }

            $messaging->subscribeToTopic($topic, $token);

            return response()->json([
                'status' => 'success',
                'message' => "Subscribed to topic: $topic"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

