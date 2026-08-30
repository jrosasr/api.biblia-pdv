<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Mirror of the habit completions the app stores locally.
     *
     * The device owns this data and works with no account at all; rows only
     * arrive here for users who have one. The uuid is minted on the device,
     * which is what makes a replayed sync an upsert instead of a duplicate.
     */
    public function up(): void
    {
        Schema::create('daily_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->uuid('uuid');
            $table->date('date');
            $table->string('habit_key');
            $table->timestamp('completed_at');
            $table->json('payload')->nullable();
            $table->timestamps();

            // Same completion sent twice must land on the same row.
            $table->unique(['user_id', 'uuid']);

            // One completion per habit per day, per user.
            $table->unique(['user_id', 'date', 'habit_key']);

            // Drives the calendar query.
            $table->index(['user_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_completions');
    }
};
