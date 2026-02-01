<?php

/*
|--------------------------------------------------------------------------
| Configuración de Pest
|--------------------------------------------------------------------------
|
| Este archivo configura Pest para el proyecto. Pest es un framework de
| testing moderno para PHP que proporciona una sintaxis más expresiva.
|
*/

uses(
    Tests\TestCase::class,
    Illuminate\Foundation\Testing\RefreshDatabase::class,
)->in('Feature');

uses(
    Tests\TestCase::class,
)->in('Unit');

/*
|--------------------------------------------------------------------------
| Expectativas Personalizadas
|--------------------------------------------------------------------------
|
| Aquí puedes definir expectativas personalizadas para tus tests.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Funciones Helper
|--------------------------------------------------------------------------
|
| Aquí puedes definir funciones helper que estarán disponibles en todos
| tus tests.
|
*/

function something()
{
    // ...
}
