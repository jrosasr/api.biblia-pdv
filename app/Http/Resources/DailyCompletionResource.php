<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyCompletionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'date' => $this->date->toDateString(),
            'habitKey' => $this->habit_key,
            'completedAt' => $this->completed_at->toIso8601String(),
            'payload' => $this->payload,
        ];
    }
}
