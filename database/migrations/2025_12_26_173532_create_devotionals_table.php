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
        Schema::create('devotionals', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable()->comment('Titulo del devocional');
            $table->jsonb('content')->nullable()->comment('Contenido del devocional');
            $table->boolean('published')->default(false)->comment('Publicado');
            $table->string('slug')->unique()->comment('Slug del devocional');
            $table->enum('status', ['draft', 'published'])->default('draft')->comment('Estado del devocional');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devotionals');
    }
};
