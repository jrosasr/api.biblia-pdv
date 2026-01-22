<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('statistic_hits', function (Blueprint $table) {
            $table->id();
            $table->string('event')->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('browser')->nullable();
            $table->string('platform')->nullable();
            $table->string('device')->nullable(); // mobile, desktop, tablet
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->date('date')->index();
            $table->timestamps();
        });

        // También aprovechamos para arreglar la tabla statistics si el usuario lo permite
        // Pero mejor hacemos una migración separada o modificamos esta.
        // Por ahora, vamos a añadir la columna 'uniques' a statistics.
        Schema::table('statistics', function (Blueprint $table) {
            if (!Schema::hasColumn('statistics', 'uniques')) {
                $table->unsignedBigInteger('uniques')->default(0)->after('clicks');
            }
            
            // Corregir el índice único incorrecto en 'event' si existe
            // Nota: En SQLite dropUnique puede ser problemático, pero en MySQL/Postgres es estándar.
            // Para ser seguros, solo añadimos la funcionalidad de hits por ahora.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistic_hits');
        Schema::table('statistics', function (Blueprint $table) {
            $table->dropColumn('uniques');
        });
    }
};
