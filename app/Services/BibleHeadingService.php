<?php

namespace App\Services;

use App\Models\BibleHeading;
use Illuminate\Support\Facades\DB;

class BibleHeadingService
{
    public function paginateHeadings($filters = [], $perPage = 50)
    {
        $query = BibleHeading::query();

        if (!empty($filters['book_id'])) {
            $query->where('book_id', $filters['book_id']);
        }

        return $query->orderBy('book_id')
            ->orderBy('chapter')
            ->orderBy('verse')
            ->paginate($perPage);
    }

    public function createMultiple($bookId, array $headingsData)
    {
        return DB::connection('headings')->transaction(function () use ($bookId, $headingsData) {
            $created = [];
            foreach ($headingsData as $data) {
                $created[] = BibleHeading::create([
                    'book_id' => $bookId,
                    'chapter' => $data['chapter'],
                    'verse' => $data['verse'],
                    'title' => $data['title'],
                ]);
            }
            return $created;
        });
    }

    public function update($id, array $data)
    {
        $heading = BibleHeading::findOrFail($id);
        $heading->update($data);
        return $heading;
    }

    public function delete($id)
    {
        $heading = BibleHeading::findOrFail($id);
        return $heading->delete();
    }
}
