<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $favorite_id
 * @property mixed $version_id
 * @property mixed $book_number
 * @property mixed $book_name
 * @property mixed $chapter
 * @property mixed $verse
 * @property mixed $text
 * @property mixed $note
 * @property mixed $verses
 * @property mixed $created_at
 * @responseField id string The unique ID of the favorite.
 * @responseField versionId string ID of the Bible version used.
 * @responseField bookNumber integer The book number (1-66).
 * @responseField createdAt datetime The registration creation date.
 */
class BibleFavoriteResource extends JsonResource
{
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
