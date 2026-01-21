<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Statistic;
use Illuminate\Support\Facades\Route;

class TrackPageViews
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Solo trackear peticiones GET exitosas que no sean peticiones de API internas (excepto las de Inertia)
        if ($request->isMethod('GET') && $response->getStatusCode() === 200) {
            $routeName = Route::currentRouteName();
            
            if (!$routeName) return $response;

            switch ($routeName) {
                case 'home':
                    Statistic::incrementImpressions('view_home', 'Vista Principal', 'Usuario visitó la página principal');
                    break;
                
                case 'bible.show':
                    $book = $request->route('book');
                    $chapter = $request->route('chapter', 1);
                    $version = $request->query('version', 'RV1960');
                    
                    // Formatear el slug para que se vea mejor en la descripción
                    $bookName = ucfirst(str_replace('-', ' ', $book));
                    
                    Statistic::incrementImpressions(
                        "view_reading_$version", 
                        "Vista Lectura ($version)", 
                        "Lectura de $bookName $chapter"
                    );
                    break;

                case 'devotionals.public':
                    Statistic::incrementImpressions(
                        'view_daily_devotional', 
                        'Devocional Diario', 
                        'Usuario visitó el devocional diario o un devocional específico'
                    );
                    break;

                case 'user-devotionals.public-index':
                    Statistic::incrementImpressions(
                        'view_devotionals_index', 
                        'Índice Devocionales', 
                        'Usuario visitó la lista de sus devocionales'
                    );
                    break;
                    
                case 'profile.favorites':
                    Statistic::incrementImpressions(
                        'view_favorites', 
                        'Mis Favoritos', 
                        'Usuario visitó sus versículos favoritos'
                    );
                    break;
            }
        }

        return $response;
    }
}
