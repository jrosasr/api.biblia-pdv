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
        Schema::table('bible_series', function (Blueprint $table) {
            $table->unsignedTinyInteger('difficulty_level')->default(1)->after('description');
        });

        Schema::table('bible_stories', function (Blueprint $table) {
            $table->unsignedTinyInteger('difficulty_level')->default(1)->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bible_series', function (Blueprint $table) {
            $table->dropColumn('difficulty_level');
        });

        Schema::table('bible_stories', function (Blueprint $table) {
            $table->dropColumn('difficulty_level');
        });
    }
};
