<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BibleReaderService
{
    public function getVersions()
    {
        $path = database_path('biblias');
        if (!File::isDirectory($path)) {
            return [];
        }

        $files = File::files($path);
        $versions = [];

        foreach ($files as $file) {
            if ($file->getExtension() === 'sqlite') {
                $versions[] = $file->getFilenameWithoutExtension();
            }
        }

        return $versions;
    }

    public function setConnection($version)
    {
        if (!extension_loaded('pdo_sqlite')) {
            throw new \Exception("El driver 'pdo_sqlite' no está cargado en PHP.");
        }

        $path = realpath(database_path("biblias/{$version}.sqlite"));
        
        if (!$path || !File::exists($path)) {
            throw new \Exception("Bible version file for '{$version}' not found.");
        }

        config(['database.connections.bible.database' => $path]);

        DB::purge('bible');
        return DB::connection('bible');
    }


    public function getBooks($version)
    {
        $conn = $this->setConnection($version);
        return $conn->table('book')
            ->select('id', 'name', 'abbreviation', 'testament_id')
            ->orderBy('id')
            ->get();
    }

    public function getBookByName($version, $name)
    {
        $books = $this->getBooks($version);
        $nameWithoutAccents = $this->removeAccents(mb_strtolower(str_replace(['-', '_'], ' ', $name)));
        
        foreach ($books as $book) {
            $bookNameWithoutAccents = $this->removeAccents(mb_strtolower($book->name));
            $bookAbbrWithoutAccents = $this->removeAccents(mb_strtolower($book->abbreviation));
            
            if ($bookNameWithoutAccents === $nameWithoutAccents || $bookAbbrWithoutAccents === $nameWithoutAccents) {
                return $book;
            }
        }
        return null;
    }

    private function removeAccents($string)
    {
        $accents = [
            'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u',
            'Á' => 'a', 'É' => 'e', 'Í' => 'i', 'Ó' => 'o', 'Ú' => 'u',
            'ñ' => 'n', 'Ñ' => 'n'
        ];
        return strtr($string, $accents);
    }

    public function getChapters($version, $bookId)
    {
        $conn = $this->setConnection($version);
        return $conn->table('verse')
            ->where('book_id', $bookId)
            ->distinct()
            ->pluck('chapter')
            ->sort();
    }

    public function getVerses($version, $bookId, $chapter)
    {
        $conn = $this->setConnection($version);
        return $conn->table('verse')
            ->where('book_id', $bookId)
            ->where('chapter', $chapter)
            ->orderBy('verse')
            ->get();
    }

    public function search($version, $query)
    {
        $conn = $this->setConnection($version);
        $query = trim($query);

        // 1. Try to parse as reference (e.g. "Juan 3:16" or "Génesis 1")
        // We'll get all books for this version to match names
        $books = $this->getBooks($version);
        $lowerQuery = mb_strtolower($query);
        
        $matchBook = null;
        $matchLength = 0;

        foreach ($books as $book) {
            $bName = mb_strtolower($book->name);
            if (str_starts_with($lowerQuery, $bName)) {
                $after = mb_substr($lowerQuery, mb_strlen($bName), 1);
                if ($after === '' || $after === ' ') {
                    if (mb_strlen($bName) > $matchLength) {
                        $matchLength = mb_strlen($bName);
                        $matchBook = $book;
                    }
                }
            }
        }

        if ($matchBook) {
            $rest = trim(mb_substr($lowerQuery, $matchLength));
            // Regex for chapter and optional verses: ^(\d+)(?::(\d+)(?:-(\d+))?)?$
            if (preg_match('/^(\d+)(?::(\d+)(?:-(\d+))?)?$/', $rest, $matches)) {
                $chapterNum = (int)$matches[1];
                $startVerse = isset($matches[2]) ? (int)$matches[2] : null;
                $endVerse = isset($matches[3]) ? (int)$matches[3] : null;

                $q = $conn->table('verse')
                    ->join('book', 'verse.book_id', '=', 'book.id')
                    ->select('verse.*', 'book.name as book_name')
                    ->where('verse.book_id', $matchBook->id)
                    ->where('verse.chapter', $chapterNum);

                if ($startVerse !== null) {
                    if ($endVerse !== null) {
                        $q->whereBetween('verse.verse', [$startVerse, $endVerse]);
                    } else {
                        $q->where('verse.verse', $startVerse);
                    }
                }

                $results = $q->orderBy('verse.verse')->get();
                if ($results->count() > 0) {
                    return [
                        'type' => 'reference',
                        'book_id' => $matchBook->id,
                        'chapter' => $chapterNum,
                        'results' => $results
                    ];
                }
            }
        }

        // 2. Keyword search
        $results = $conn->table('verse')
            ->join('book', 'verse.book_id', '=', 'book.id')
            ->select('verse.*', 'book.name as book_name')
            ->where('verse.text', 'like', "%{$query}%")
            ->limit(100)
            ->get();

        return [
            'type' => 'search',
            'results' => $results
        ];
    }
}
