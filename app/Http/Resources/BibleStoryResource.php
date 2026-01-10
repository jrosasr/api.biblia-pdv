<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BibleStoryResource extends JsonResource
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
            'series_id' => $this->series_id,
            'title' => $this->title,
            'description' => $this->description,
            'difficulty_level' => $this->difficulty_level,
            'cover_image' => $this->cover_image ? url("api/v1/storage/" . preg_replace('/^(\/?storage\/|\/)/', '', $this->cover_image)) : null,
            'book' => $this->book,
            'chapter_start' => $this->chapter_start,
            'verse_start' => $this->verse_start,
            'chapter_end' => $this->chapter_end,
            'verse_end' => $this->verse_end,
            'is_favorite' => $this->is_favorite ?? false, // Assuming is_favorite might be appended
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
            'series' => new BibleSeriesResource($this->whenLoaded('series')),
        ];
    }
}
