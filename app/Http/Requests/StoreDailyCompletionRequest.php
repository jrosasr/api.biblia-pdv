<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @bodyParam completions array required Lista de hábitos cumplidos a sincronizar.
 * @bodyParam completions[].uuid string required Identificador generado en el dispositivo. Example: 6f9619ff-8b86-d011-b42d-00cf4fc964ff
 * @bodyParam completions[].date string required Día local en formato YYYY-MM-DD. Example: 2026-08-29
 * @bodyParam completions[].habitKey string required Clave del hábito. Example: bible_reading
 * @bodyParam completions[].completedAt string required Momento en que se cumplió, en ISO 8601. Example: 2026-08-29T21:30:00Z
 * @bodyParam completions[].payload object Datos propios del hábito. Example: {"text":"Lo que me dejó la lectura"}
 */
class StoreDailyCompletionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Bounded so a device with a long backlog syncs in batches
            // instead of one request the server has to swallow whole.
            'completions' => 'required|array|max:500',
            'completions.*.uuid' => 'required|uuid',
            'completions.*.date' => 'required|date_format:Y-m-d',
            'completions.*.habitKey' => 'required|string|max:64',
            'completions.*.completedAt' => 'required|date',
            'completions.*.payload' => 'nullable|array',
        ];
    }
}
