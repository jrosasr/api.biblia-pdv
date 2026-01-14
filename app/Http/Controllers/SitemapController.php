<?php

namespace App\Http\Controllers;

use App\Models\Devotional;
use App\Services\BibleReaderService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

class SitemapController extends Controller
{
    protected $bibleService;

    public function __construct(BibleReaderService $bibleService)
    {
        $this->bibleService = $bibleService;
    }

    public function index(): Response
    {
        $content = view('sitemap.index')->render();
        return response($content, 200)->header('Content-Type', 'text/xml');
    }

    public function static(): Response
    {
        $urls = [
            ['loc' => route('home'), 'lastmod' => now()->format('Y-m-d'), 'priority' => '1.0', 'changefreq' => 'daily'],
            ['loc' => route('devotionals.public'), 'lastmod' => now()->format('Y-m-d'), 'priority' => '0.9', 'changefreq' => 'daily'],
            ['loc' => route('contact'), 'lastmod' => '2026-01-12', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['loc' => route('privacy'), 'lastmod' => '2026-01-12', 'priority' => '0.5', 'changefreq' => 'monthly'],
            ['loc' => route('terms'), 'lastmod' => '2026-01-12', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ];

        return response(view('sitemap.urlset', compact('urls')), 200)
            ->header('Content-Type', 'text/xml');
    }

    public function bible(): Response
    {
        $version = 'RV1960'; // Default version for indexing
        $books = $this->bibleService->getBooks($version);
        $urls = [];

        foreach ($books as $book) {
            $chapters = $this->bibleService->getChapters($version, $book->id);
            foreach ($chapters as $chapter) {
                $urls[] = [
                    'loc' => route('bible.show', ['book' => $book->name, 'chapter' => $chapter]),
                    'lastmod' => '2026-01-12',
                    'priority' => '0.8',
                    'changefreq' => 'monthly'
                ];
            }
        }

        return response(view('sitemap.urlset', compact('urls')), 200)
            ->header('Content-Type', 'text/xml');
    }

    public function devotionals(): Response
    {
        $devotionals = Devotional::whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->get();

        $urls = $devotionals->map(function ($devotional) {
            return [
                'loc' => route('devotionals.public') . '?id=' . $devotional->id, // Assuming this is how individual ones are accessed or just the main page
                'lastmod' => $devotional->updated_at->format('Y-m-d'),
                'priority' => '0.8',
                'changefreq' => 'weekly'
            ];
        })->toArray();

        // If devotionals have their own pages, use that route. 
        // Based on routes/web.php, there's only 'devotionals.public' which seems to show the latest.
        
        return response(view('sitemap.urlset', compact('urls')), 200)
            ->header('Content-Type', 'text/xml');
    }
}
