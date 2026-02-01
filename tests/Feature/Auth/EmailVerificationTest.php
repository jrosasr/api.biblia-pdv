<?php

/**
 * Tests de Verificación de Email
 * 
 * Estos tests verifican el proceso de verificación de email de los usuarios,
 * incluyendo la renderización de la pantalla, verificación exitosa y manejo
 * de hashes inválidos.
 */

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

// Test: La pantalla de verificación de email puede ser renderizada
test('la pantalla de verificación de email puede ser renderizada', function () {
    // Crear un usuario sin verificar
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get('/verify-email');

    $response->assertStatus(200);
});

// Test: El email puede ser verificado
test('el email puede ser verificado', function () {
    // Crear un usuario sin verificar
    $user = User::factory()->unverified()->create();

    // Simular eventos para verificar que se dispara el evento Verified
    Event::fake();

    // Generar URL de verificación firmada temporalmente
    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    // Visitar la URL de verificación
    $response = $this->actingAs($user)->get($verificationUrl);

    // Verificar que se disparó el evento Verified
    Event::assertDispatched(Verified::class);
    
    // Verificar que el usuario ahora tiene el email verificado
    $this->assertTrue($user->fresh()->hasVerifiedEmail());
    
    // Verificar redirección al dashboard con parámetro verified
    $response->assertRedirect(route('dashboard', absolute: false).'?verified=1');
});

// Test: El email no es verificado con hash inválido
test('el email no es verificado con hash inválido', function () {
    // Crear un usuario sin verificar
    $user = User::factory()->unverified()->create();

    // Generar URL de verificación con hash incorrecto
    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1('wrong-email')]
    );

    // Intentar verificar con hash incorrecto
    $this->actingAs($user)->get($verificationUrl);

    // Verificar que el email sigue sin verificar
    $this->assertFalse($user->fresh()->hasVerifiedEmail());
});
