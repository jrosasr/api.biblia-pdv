<?php

namespace App\Services;

use App\Models\DeviceToken;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class DeviceTokenService
{
    /**
     * Get all device tokens.
     */
    public function getAllTokens(): Collection
    {
        return DeviceToken::with('user')->latest()->get();
    }

    /**
     * Store or update a device token.
     */
    public function updateOrCreateToken(array $data, ?int $userId = null): DeviceToken
    {
        $fcmToken = $data['fcm_token'];
        $deviceId = $data['device_id'] ?? null;
        $topics = $data['topics'] ?? [];

        $query = DeviceToken::query();
        if ($deviceId) {
            $query->where('device_id', $deviceId);
        } else {
            $query->where('fcm_token', $fcmToken);
        }

        $deviceToken = $query->first();

        $tokenData = [
            'fcm_token' => $fcmToken,
            'user_id' => $userId ?? ($deviceToken ? $deviceToken->user_id : null),
            'device_id' => $deviceId,
            'device_name' => $data['device_name'] ?? null,
            'platform' => $data['platform'] ?? null,
            'topics' => $topics,
            'last_used_at' => now(),
        ];

        if ($deviceToken) {
            $deviceToken->update($tokenData);
        } else {
            $deviceToken = DeviceToken::create($tokenData);
        }

        $this->subscribeToTopics($fcmToken, $topics);

        return $deviceToken;
    }

    /**
     * Subscribe a token to topics.
     */
    protected function subscribeToTopics(string $token, array $topics): void
    {
        if (empty($topics)) return;

        try {
            $messaging = app('firebase.messaging');
            foreach ($topics as $topic) {
                $messaging->subscribeToTopic($topic, $token);
            }
        } catch (\Exception $e) {
            Log::error("Error subscribing to topics: " . $e->getMessage());
        }
    }

    /**
     * Send a notification to a specific token.
     */
    public function sendNotification(DeviceToken $deviceToken, string $title, string $body, array $data = []): void
    {
        try {
            $messaging = app('firebase.messaging');

            $message = CloudMessage::withTarget('token', $deviceToken->fcm_token)
                ->withNotification(Notification::create($title, $body))
                ->withData(array_merge(['click_action' => 'FLUTTER_NOTIFICATION_CLICK'], $data));

            $messaging->send($message);
        } catch (\Exception $e) {
            Log::error("Error sending notification to device: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Delete a device token.
     */
    public function deleteToken(DeviceToken $deviceToken): bool
    {
        return $deviceToken->delete();
    }
}
