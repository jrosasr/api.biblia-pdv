<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreBibleHeadingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        return [
            'book_id' => 'required|integer',
            'headings' => 'required|array|min:1',
            'headings.*.chapter' => 'required|integer',
            'headings.*.verse' => 'required|integer',
            'headings.*.title' => 'required|string|max:255',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $bookId = $this->book_id;
            $headings = $this->headings ?: [];
            $seen = [];

            foreach ($headings as $index => $heading) {
                $key = "{$heading['chapter']}-{$heading['verse']}";
                
                // 1. Check duplicates within the request
                if (isset($seen[$key])) {
                    $validator->errors()->add("headings.{$index}.verse", "Este versículo ya está repetido en tu lista.");
                    continue;
                }
                $seen[$key] = true;

                // 2. Check against database
                $exists = \App\Models\BibleHeading::where('book_id', $bookId)
                    ->where('chapter', $heading['chapter'])
                    ->where('verse', $heading['verse'])
                    ->exists();

                if ($exists) {
                    $validator->errors()->add("headings.{$index}.verse", "El versículo {$heading['verse']} del capítulo {$heading['chapter']} ya tiene un título registrado.");
                }
            }
        });
    }
}
