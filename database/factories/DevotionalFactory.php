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
            'content' => [
                'time' => now()->timestamp,
                'blocks' => [
                    [
                        'id' => \Illuminate\Support\Str::random(10),
                        'type' => 'header',
                        'data' => [
                            'text' => fake()->sentence(3),
                            'level' => 2
                        ]
                    ],
                    [
                        'id' => \Illuminate\Support\Str::random(10),
                        'type' => 'paragraph',
                        'data' => [
                            'text' => fake()->paragraph(3)
                        ]
                    ]
                ],
                'version' => '2.30.0'
            ],
            'published' => fake()->boolean(10),
            'slug' => fake()->slug(),
            'status' => fake()->randomElement(['draft', 'published']),
            'readings' => fake()->numberBetween(0, 1000),
        ];
    }
}
