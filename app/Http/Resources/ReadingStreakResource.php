<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReadingStreakResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'currentStreak' => $this->current_streak,
            'longestStreak' => $this->longest_streak,
            'lastReadDate' => $this->last_read_date ? $this->last_read_date->toDateString() : null,
        ];
    }
}
