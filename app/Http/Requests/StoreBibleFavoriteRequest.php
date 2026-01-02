<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBibleFavoriteRequest extends FormRequest
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
            'favorites' => 'required|array',
            'favorites.*.id' => 'required|string',
            'favorites.*.versionId' => 'nullable|string',
            'favorites.*.bookNumber' => 'required|integer',
            'favorites.*.bookName' => 'required|string',
            'favorites.*.chapter' => 'required|integer',
            'favorites.*.verse' => 'required|integer',
            'favorites.*.text' => 'required|string',
            'favorites.*.note' => 'nullable|string',
            'favorites.*.verses' => 'nullable|array',
        ];
    }
}
