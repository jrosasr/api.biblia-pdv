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
        Schema::create('bible_chapter_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('version_id');
            $table->unsignedInteger('book_number');
            $table->string('book_name');
            $table->unsignedInteger('chapter_number');
            $table->timestamps();

            // Unique constraint to avoid double counting the same chapter read by the same user in same version
            $table->unique(['user_id', 'version_id', 'book_number', 'chapter_number'], 'user_chapter_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_chapter_readings');
    }
};
