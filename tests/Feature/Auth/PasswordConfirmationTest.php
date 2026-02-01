<?php

/**
 * Tests de Confirmación de Contraseña
 * 
 * Estos tests verifican el proceso de confirmación de contraseña para
 * acciones sensibles, validando tanto confirmaciones exitosas como fallidas.
 */

use App\Models\User;

// Test: La pantalla de confirmación de contraseña puede ser renderizada
test('la pantalla de confirmación de contraseña puede ser renderizada', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/confirm-password');

    $response->assertStatus(200);
});

// Test: La contraseña puede ser confirmada
test('la contraseña puede ser confirmada', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Confirmar contraseña con la contraseña correcta
    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'password',
    ]);

    // Verificar que la confirmación fue exitosa
    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
});

// Test: La contraseña no es confirmada con contraseña inválida
test('la contraseña no es confirmada con contraseña inválida', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Intentar confirmar con contraseña incorrecta
    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'wrong-password',
    ]);

    // Verificar que hay errores en la sesión
    $response->assertSessionHasErrors();
});
