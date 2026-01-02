<?php

namespace App\Services;

use App\Models\User;
use App\Models\ReadingStreak;
use App\Models\ReadingLog;
use App\Models\BibleChapterReading;
use Carbon\Carbon;

class ReadingService
{
    /**
     * Track user reading progress and update streaks.
     *
     * @param User $user
     * @param array $data
     * @return ReadingStreak
     */
    public function trackProgress(User $user, array $data): ReadingStreak
    {
        $today = Carbon::today();

        // 1. Mark the day as read (Reading Log)
        ReadingLog::firstOrCreate([
            'user_id' => $user->id,
            'read_date' => $today->toDateString(),
        ]);

        // 2. Update the streak logic
        $streak = $user->readingStreak ?? ReadingStreak::create(['user_id' => $user->id]);
        $this->updateStreakLogic($streak);

        // 3. Track specific chapter reading
        BibleChapterReading::firstOrCreate([
            'user_id' => $user->id,
            'version_id' => $data['versionId'],
            'book_number' => $data['bookNumber'],
            'chapter_number' => $data['chapterNumber'],
        ], [
            'book_name' => $data['bookName'],
        ]);

        return $streak;
    }

    /**
     * Logic to update reading streak.
     * 
     * @param ReadingStreak $streak
     * @return void
     */
    protected function updateStreakLogic(ReadingStreak $streak): void
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        if ($streak->last_read_date) {
            if ($streak->last_read_date->isSameDay($today)) {
                return;
            }

            if ($streak->last_read_date->isSameDay($yesterday)) {
                $streak->current_streak++;
            } else {
                $streak->current_streak = 1;
            }
        } else {
            $streak->current_streak = 1;
        }

        if ($streak->current_streak > $streak->longest_streak) {
            $streak->longest_streak = $streak->current_streak;
        }

        $streak->last_read_date = $today;
        $streak->save();
    }
}
