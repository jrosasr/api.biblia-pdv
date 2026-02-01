<?php

/**
 * Tests de Autenticación
 * 
 * Estos tests verifican el flujo completo de autenticación de usuarios,
 * incluyendo login, logout y validación de credenciales.
 */

use App\Models\User;

// Test: La pantalla de login puede ser renderizada
test('la pantalla de login puede ser renderizada', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

// Test: Los usuarios pueden autenticarse usando la pantalla de login
test('los usuarios pueden autenticarse usando la pantalla de login', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Intentar hacer login con las credenciales correctas
    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    // Verificar que el usuario está autenticado
    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

// Test: Los usuarios no pueden autenticarse con contraseña inválida
test('los usuarios no pueden autenticarse con contraseña inválida', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Intentar hacer login con contraseña incorrecta
    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    // Verificar que el usuario no está autenticado
    $this->assertGuest();
});

// Test: Los usuarios pueden cerrar sesión
test('los usuarios pueden cerrar sesión', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Hacer logout
    $response = $this->actingAs($user)->post('/logout');

    // Verificar que el usuario ya no está autenticado
    $this->assertGuest();
    $response->assertRedirect('/');
});
