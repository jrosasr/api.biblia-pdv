<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Devotional>
 */
class DevotionalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'content' => fake()->paragraph(3),
            'published' => fake()->boolean(10),
            'slug' => fake()->slug(),
            'status' => fake()->randomElement(['draft', 'published']),
        ];
    }
}
