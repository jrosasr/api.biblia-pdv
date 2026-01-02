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
        Schema::create('bible_series', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Título de la serie bíblica');
            $table->text('description')->nullable()->comment('Descripción de la serie bíblica');
            $table->string('cover_image')->nullable()->comment('Imagen de portada de la serie bíblica');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_series');
    }
};
