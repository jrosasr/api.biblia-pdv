<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\UserActivity;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all of the activities for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activities(): HasMany
    {
        return $this->hasMany(UserActivity::class);
    }

    /**
     * Get the favorites for the user.
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(BibleFavorite::class);
    }

    /**
     * Get the reading streak for the user.
     */
    public function readingStreak(): HasOne
    {
        return $this->hasOne(ReadingStreak::class);
    }

    /**
     * Get the reading logs for the user.
     */
    public function readingLogs(): HasMany
    {
        return $this->hasMany(ReadingLog::class);
    }

    /**
     * Get the bible chapters read by the user.
     */
    public function bibleChapterReadings(): HasMany
    {
        return $this->hasMany(BibleChapterReading::class);
    }
}
