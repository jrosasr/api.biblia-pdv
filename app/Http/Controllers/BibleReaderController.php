<?php

namespace App\Http\Controllers;

use App\Services\BibleReaderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class BibleReaderController extends Controller
{
    protected $bibleService;

    public function __construct(BibleReaderService $bibleService)
    {
        $this->bibleService = $bibleService;
    }

    public function index(Request $request)
    {
        $version = $request->input('version', 'RV1960');
        $bookId = $request->input('book', 1); // Genesis
        $chapter = $request->input('chapter', 1);

        $versions = $this->bibleService->getVersions();
        $books = $this->bibleService->getBooks($version);
        $verses = $this->bibleService->getVerses($version, $bookId, $chapter);
        $chapters = $this->bibleService->getChapters($version, $bookId);

        $currentBook = $books->firstWhere('id', (int)$bookId);
        $title = $currentBook ? "{$currentBook->name} {$chapter} {$version} - Biblia Palabra de Vida" : "Biblia Palabra de Vida";
        $description = $verses->take(3)->pluck('text')->implode(' ');

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'versions' => $versions,
            'books' => $books,
            'initialChapters' => $chapters,
            'initialVerses' => $verses,
            'initialVersion' => $version,
            'initialBook' => (int)$bookId,
            'initialChapter' => (int)$chapter,
            'seo' => [
                'title' => $title,
                'description' => mb_substr($description, 0, 160) . '...',
            ]
        ]);
    }

    public function show(Request $request, $bookName, $chapter = 1)
    {
        $version = $request->input('version', 'RV1960');
        $book = $this->bibleService->getBookByName($version, $bookName);

        if (!$book) {
            return redirect()->route('home');
        }

        $versions = $this->bibleService->getVersions();
        $books = $this->bibleService->getBooks($version);
        $verses = $this->bibleService->getVerses($version, $book->id, $chapter);
        $chapters = $this->bibleService->getChapters($version, $book->id);

        $title = "{$book->name} {$chapter} {$version} - Biblia Palabra de Vida";
        $description = $verses->take(3)->pluck('text')->implode(' ');

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'versions' => $versions,
            'books' => $books,
            'initialChapters' => $chapters,
            'initialVerses' => $verses,
            'initialVersion' => $version,
            'initialBook' => (int)$book->id,
            'initialChapter' => (int)$chapter,
            'seo' => [
                'title' => $title,
                'description' => mb_substr($description, 0, 160) . '...',
            ]
        ]);
    }

    public function getBooks($version)
    {
        return response()->json($this->bibleService->getBooks($version));
    }

    public function getChapters($version, $bookId)
    {
        return response()->json($this->bibleService->getChapters($version, $bookId));
    }

    public function getVerses($version, $bookId, $chapter)
    {
        return response()->json($this->bibleService->getVerses($version, $bookId, $chapter));
    }

    public function search(Request $request)
    {
        $version = $request->input('version', 'RV1960');
        $query = $request->input('query', '');
        
        if (empty($query)) {
            return response()->json(['results' => []]);
        }

        return response()->json($this->bibleService->search($version, $query));
    }
}
