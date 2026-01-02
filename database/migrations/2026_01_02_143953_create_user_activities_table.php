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
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->nullable()->constrained(); // Nullable si permites métricas sin login

            $table->string('type'); // 'read', 'share', 'favorite'

            // Estos campos permiten que la métrica se asocie a Historias, Devocionales o Versículos
            $table->morphs('activitable');

            $table->string('platform')->nullable(); // 'android', 'ios', 'web'

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_activities');
    }
};
