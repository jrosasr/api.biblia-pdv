<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- SEO -->
        @php
            $canonical = url()->current();
            $allowedParams = ['version']; // Solo permitimos 'version' como parámetro relevante para SEO en la Biblia
            $queryParams = request()->only($allowedParams);
            
            // Si la versión es la por defecto (RV1960), no la incluimos en la canonical para evitar duplicados
            if (isset($queryParams['version']) && $queryParams['version'] === 'RV1960') {
                unset($queryParams['version']);
            }

            if (!empty($queryParams)) {
                $canonical .= '?' . http_build_query($queryParams);
            }
        @endphp
        <link rel="canonical" href="{{ $canonical }}" />
        <link rel="alternate" hreflang="es" href="{{ $canonical }}" />
        <link rel="alternate" hreflang="x-default" href="{{ $canonical }}" />

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
        <script>
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        </script>
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
