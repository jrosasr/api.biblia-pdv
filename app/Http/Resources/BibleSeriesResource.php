<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BibleSeriesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'difficulty_level' => $this->difficulty_level,
            'cover_image' => $this->cover_image ? url("api/v1/storage/" . preg_replace('/^(\/?storage\/|\/)/', '', $this->cover_image)) : null,
            'stories_count' => $this->whenCounted('stories'),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
