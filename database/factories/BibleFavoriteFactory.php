<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BibleFavorite>
 */
class BibleFavoriteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'favorite_id' => 'fav_' . $this->faker->uuid,
            'version_id' => 'RV1960',
            'book_number' => $this->faker->numberBetween(1, 66),
            'book_name' => $this->faker->word,
            'chapter' => $this->faker->numberBetween(1, 150),
            'verse' => $this->faker->numberBetween(1, 176),
            'text' => $this->faker->sentence,
            'note' => $this->faker->sentence,
            'verses' => null,
        ];
    }
}
