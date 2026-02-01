<?php

/**
 * Tests de Registro de Usuarios
 * 
 * Estos tests verifican el proceso de registro de nuevos usuarios,
 * incluyendo la renderización de la pantalla y el registro exitoso.
 */

// Test: La pantalla de registro puede ser renderizada
test('la pantalla de registro puede ser renderizada', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

// Test: Los nuevos usuarios pueden registrarse
test('los nuevos usuarios pueden registrarse', function () {
    // Registrar un nuevo usuario
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Verificar que el usuario está autenticado después del registro
    $this->assertAuthenticated();
    
    // Verificar redirección al dashboard
    $response->assertRedirect(route('dashboard', absolute: false));
});
