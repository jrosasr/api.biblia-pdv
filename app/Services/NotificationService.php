<?php

namespace App\Services;

use App\Models\Devotional;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;

class NotificationService
{
    /**
     * Notify users about a new devotional.
     */
    public function notifyNewDevotional(Devotional $devotional): void
    {
        try {
            $messaging = app('firebase.messaging');

            $title = "¡Nuevo Devocional Disponible!";
            $body = $devotional->title;

            $message = CloudMessage::withTarget('topic', 'all')
                ->withNotification(FirebaseNotification::create($title, $body))
                ->withData([
                    'type' => 'new_devotional',
                    'devotional_id' => (string)$devotional->id,
                    'click_action' => 'FLUTTER_NOTIFICATION_CLICK'
                ]);

            $messaging->send($message);
        } catch (\Exception $e) {
            Log::error("FCM Notification Error: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Send general topic notification.
     */
    public function notifyTopic(string $topic, string $title, string $body, array $data = []): void
    {
        try {
            $messaging = app('firebase.messaging');

            $message = CloudMessage::withTarget('topic', $topic)
                ->withNotification(FirebaseNotification::create($title, $body))
                ->withData(array_merge($data, [
                    'click_action' => 'FLUTTER_NOTIFICATION_CLICK'
                ]));

            $messaging->send($message);
        } catch (\Exception $e) {
            Log::error("FCM Topic Notification Error: " . $e->getMessage());
            throw $e;
        }
    }
}
