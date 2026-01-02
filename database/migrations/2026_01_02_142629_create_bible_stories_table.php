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
        Schema::create('bible_stories', function (Blueprint $table) {
            $table->id();
            // series_id
            $table->foreignId('series_id')->constrained('bible_series')->cascadeOnDelete();
            $table->string('title')->comment('Título de la historia bíblica');
            $table->text('description')->nullable()->comment('Descripción de la historia bíblica');
            $table->string('cover_image')->nullable()->comment('Imagen de portada de la historia bíblica');

            // ubicacion del texto bíblico
            $table->string('book')->nullable()->comment('Libro bíblico');
            // Capitulo de inicio
            $table->string('chapter_start')->nullable()->comment('Capítulo de inicio');
            // Versiculo de inicio
            $table->string('verse_start')->nullable()->comment('Versículo de inicio');
            // Capitulo de fin
            $table->string('chapter_end')->nullable()->comment('Capítulo de fin');
            // Versiculo de fin
            $table->string('verse_end')->nullable()->comment('Versículo de fin');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_stories');
    }
};
