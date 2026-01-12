<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBibleHeadingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        return [
            'book_id' => 'required|integer',
            'chapter' => 'required|integer',
            'verse' => 'required|integer',
            'title' => 'required|string|max:255',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $headingId = $this->route('bible_heading'); // Get ID from route

            $exists = \App\Models\BibleHeading::where('book_id', $this->book_id)
                ->where('chapter', $this->chapter)
                ->where('verse', $this->verse)
                ->where('id', '!=', $headingId)
                ->exists();

            if ($exists) {
                $validator->errors()->add("verse", "Ese versículo ya tiene otro título registrado en este libro y capítulo.");
            }
        });
    }
}
