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
        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->string('event')->unique()->comment('Identificador único del evento');
            $table->string('name')->comment('Nombre descriptivo del evento');
            $table->text('description')->nullable()->comment('Descripción detallada del evento');
            $table->date('date')->comment('Fecha de las métricas (YYYY-MM-DD)');
            $table->unsignedBigInteger('impressions')->default(0)->comment('Número de veces que se mostró');
            $table->unsignedBigInteger('scrolls')->default(0)->comment('Número de scrolls');
            $table->unsignedBigInteger('clicks')->default(0)->comment('Número de clicks');
            $table->timestamps();
            
            // Índices para mejorar el rendimiento de las consultas
            $table->index('event');
            $table->index('date');
            $table->unique(['event', 'date']); // Un registro por evento por día
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistics');
    }
};
