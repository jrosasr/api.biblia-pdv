<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDevotionalRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'published' => 'boolean',
            'slug' => 'required|string|max:255|unique:devotionals,slug,' . $this->devotional->id,
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => \Illuminate\Support\Str::slug($this->title),
            'published' => $this->status === 'published',
        ]);
    }
}
