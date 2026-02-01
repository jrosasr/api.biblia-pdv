<?php

/**
 * Tests de Restablecimiento de Contraseña
 * 
 * Estos tests verifican el flujo completo de restablecimiento de contraseña,
 * incluyendo la solicitud del enlace, renderización de pantallas y el proceso
 * de restablecimiento con token válido.
 */

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

// Test: La pantalla de enlace de restablecimiento puede ser renderizada
test('la pantalla de enlace de restablecimiento puede ser renderizada', function () {
    $response = $this->get('/forgot-password');

    $response->assertStatus(200);
});

// Test: El enlace de restablecimiento puede ser solicitado
test('el enlace de restablecimiento puede ser solicitado', function () {
    // Simular notificaciones para verificar que se envía
    Notification::fake();

    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Solicitar enlace de restablecimiento
    $this->post('/forgot-password', ['email' => $user->email]);

    // Verificar que se envió la notificación de restablecimiento
    Notification::assertSentTo($user, ResetPassword::class);
});

// Test: La pantalla de restablecimiento puede ser renderizada
test('la pantalla de restablecimiento puede ser renderizada', function () {
    // Simular notificaciones
    Notification::fake();

    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Solicitar enlace de restablecimiento
    $this->post('/forgot-password', ['email' => $user->email]);

    // Verificar que se puede acceder a la pantalla de restablecimiento
    Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
        $response = $this->get('/reset-password/'.$notification->token);

        $response->assertStatus(200);

        return true;
    });
});

// Test: La contraseña puede ser restablecida con token válido
test('la contraseña puede ser restablecida con token válido', function () {
    // Simular notificaciones
    Notification::fake();

    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Solicitar enlace de restablecimiento
    $this->post('/forgot-password', ['email' => $user->email]);

    // Verificar que se puede restablecer la contraseña con el token
    Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
        // Restablecer contraseña con el token recibido
        $response = $this->post('/reset-password', [
            'token' => $notification->token,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        // Verificar que el restablecimiento fue exitoso
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('login'));

        return true;
    });
});
