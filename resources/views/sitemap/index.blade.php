{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>{{ url('sitemap-static.xml') }}</loc>
        <lastmod>{{ now()->format('Y-m-d') }}</lastmod>
    </sitemap>
    <sitemap>
        <loc>{{ url('sitemap-bible.xml') }}</loc>
        <lastmod>2026-01-12</lastmod>
    </sitemap>
    <sitemap>
        <loc>{{ url('sitemap-devotionals.xml') }}</loc>
        <lastmod>{{ now()->format('Y-m-d') }}</lastmod>
    </sitemap>
</sitemapindex>
