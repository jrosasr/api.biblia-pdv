<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // En Laravel 12 con PostgreSQL o MySQL, podemos intentar borrar el índice.
        // El problema es que el nombre del índice por defecto suele ser 'statistics_event_unique'.
        
        Schema::table('statistics', function (Blueprint $table) {
            // Intentamos borrar el índice único individual de 'event'
            // Usamos un try-catch manual o simplemente confiamos en que existe según el archivo de migración anterior.
            try {
                $table->dropUnique(['event']);
            } catch (\Exception $e) {
                // Si no existe o falla, lo ignoramos
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistics', function (Blueprint $table) {
            $table->unique('event');
        });
    }
};
