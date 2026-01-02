<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetApiLocale
{
    public function handle(Request $request, Closure $next)
    {
        app()->setLocale('es');
        return $next($request);
    }
}