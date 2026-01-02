<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BibleChapterReadingResource extends JsonResource
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
            'versionId' => $this->version_id,
            'bookNumber' => $this->book_number,
            'bookName' => $this->book_name,
            'chapterNumber' => $this->chapter_number,
            'createdAt' => $this->created_at,
        ];
    }
}
