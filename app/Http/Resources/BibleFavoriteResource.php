<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BibleFavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->favorite_id,
            'versionId' => $this->version_id,
            'bookNumber' => $this->book_number,
            'bookName' => $this->book_name,
            'chapter' => $this->chapter,
            'verse' => $this->verse,
            'text' => $this->text,
            'note' => $this->note,
            'verses' => $this->verses,
            'createdAt' => $this->created_at,
        ];
    }
}
