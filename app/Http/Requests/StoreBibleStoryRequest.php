<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBibleStoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'series_id' => 'required|exists:bible_series,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|max:2048',
            'book' => 'required|string',
            'chapter_start' => 'required|integer',
            'verse_start' => 'required|integer',
            'chapter_end' => 'nullable|integer',
            'verse_end' => 'nullable|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El campo título es obligatorio.',
            'description.string' => 'El campo descripción debe ser una cadena de texto.',
            'cover_image.string' => 'El campo imagen de cubierta debe ser una cadena de texto.',
            'book.required' => 'El campo libro es obligatorio.',
            'chapter_start.required' => 'El campo capítulo inicial es obligatorio.',
            'verse_start.required' => 'El campo verso inicial es obligatorio.',
            'chapter_end.required' => 'El campo capítulo final es obligatorio.',
            'verse_end.required' => 'El campo verso final es obligatorio.',
        ];
    }
}
