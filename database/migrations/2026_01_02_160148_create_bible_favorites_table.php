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
        Schema::create('bible_favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Campos solicitados por el usuario
            $table->string('favorite_id')->comment('Unique ID: version-book-chapter-verse');
            $table->string('version_id')->nullable();
            $table->integer('book_number');
            $table->string('book_name');
            $table->integer('chapter');
            $table->integer('verse');
            $table->text('text');
            $table->text('note')->nullable();
            
            // Campo para guardar varios versículos en un array
            $table->json('verses')->nullable(); 

            $table->timestamps();

            // Unicidad por usuario y versículo
            $table->unique(['user_id', 'favorite_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_favorites');
    }
};
