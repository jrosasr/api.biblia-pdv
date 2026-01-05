<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @bodyParam favorites array required Lista de versículos favoritos.
 * @bodyParam favorites[].id string required El ID único del favorito (UUID o similar). Example: fav_123
 * @bodyParam favorites[].versionId string ID de la versión de la Biblia. Example: RV1960
 * @bodyParam favorites[].bookNumber int required Número del libro (1-66). Example: 1
 * @bodyParam favorites[].bookName string required Nombre del libro. Example: Génesis
 * @bodyParam favorites[].chapter int required Número del capítulo. Example: 1
 * @bodyParam favorites[].verse int required Número del versículo inicial. Example: 1
 * @bodyParam favorites[].text string required El contenido del versículo. Example: En el principio...
 * @bodyParam favorites[].note string Una nota personal opcional. Example: Mi versículo favorito.
 * @bodyParam favorites[].verses array Arreglo de versículos adicionales si es un rango.
 */
class StoreBibleFavoriteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
