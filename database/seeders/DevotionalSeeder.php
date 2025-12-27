<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Devotional;

class DevotionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 10 devocionales con fechas aleatorias entre 2 semanas atrás y hoy
        Devotional::factory()->count(10)->create([
            'published_at' => fake()->dateTimeBetween('-2 weeks', 'now'),
        ]);
    }
}
