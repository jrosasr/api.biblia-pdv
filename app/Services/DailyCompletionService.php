<?php

namespace App\Services;

use App\Models\DailyCompletion;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DailyCompletionService
{
    /**
     * Completions for a user within a date range, oldest first.
     */
    public function getRange(User $user, string $from, string $to): Collection
    {
        return $user->dailyCompletions()
            // whereDate, not whereBetween: the date cast stores a full
            // timestamp, and "2026-08-31 00:00:00" sorts after "2026-08-31"
            // in a string comparison, silently dropping the last day.
            ->whereDate('date', '>=', $from)
            ->whereDate('date', '<=', $to)
            ->orderBy('date')
            ->orderBy('completed_at')
            ->get();
    }

    /**
     * Mirrors a batch of completions sent by a device.
     *
     * A completion is identified by user, day and habit rather than by its
     * uuid: the uuid makes a retry from one device idempotent, but two
     * devices minting their own uuid for the same day would otherwise create
     * a second row for one lived day.
     *
     * When a row already exists, the newer `completedAt` wins. Without that,
     * a device syncing an old backlog could overwrite a reflection the user
     * edited more recently on another device.
     */
    public function sync(User $user, array $completions): Collection
    {
        return DB::transaction(function () use ($user, $completions) {
            $saved = collect();

            foreach ($completions as $item) {
                $completedAt = Carbon::parse($item['completedAt']);

                $existing = $user->dailyCompletions()
                    // whereDate leaves the comparison to the database, so it
                    // works whether the column holds a date or a timestamp.
                    ->whereDate('date', $item['date'])
                    ->where('habit_key', $item['habitKey'])
                    ->lockForUpdate()
                    ->first();

                if ($existing === null) {
                    $saved->push($user->dailyCompletions()->create([
                        'uuid' => $item['uuid'],
                        'date' => $item['date'],
                        'habit_key' => $item['habitKey'],
                        'completed_at' => $completedAt,
                        'payload' => $item['payload'] ?? null,
                    ]));

                    continue;
                }

                if ($completedAt->greaterThanOrEqualTo($existing->completed_at)) {
                    $existing->update([
                        'uuid' => $item['uuid'],
                        'completed_at' => $completedAt,
                        'payload' => $item['payload'] ?? null,
                    ]);
                }

                $saved->push($existing);
            }

            return $saved;
        });
    }
}
