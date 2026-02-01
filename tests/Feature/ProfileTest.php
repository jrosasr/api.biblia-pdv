<?php

/**
 * Tests de Perfil de Usuario
 * 
 * Estos tests verifican la funcionalidad del perfil de usuario, incluyendo
 * visualización, actualización de información, verificación de email y
 * eliminación de cuenta.
 */

use App\Models\User;

// Test: La página de perfil es mostrada
test('la página de perfil es mostrada', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/profile');

    $response->assertOk();
});

// Test: La información del perfil puede ser actualizada
test('la información del perfil puede ser actualizada', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Actualizar información del perfil
    $response = $this
        ->actingAs($user)
        ->patch('/profile', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    // Verificar que la actualización fue exitosa
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    // Refrescar el usuario desde la base de datos
    $user->refresh();

    // Verificar que los datos fueron actualizados
    $this->assertSame('Test User', $user->name);
    $this->assertSame('test@example.com', $user->email);
    
    // Verificar que el email_verified_at es null porque cambió el email
    $this->assertNull($user->email_verified_at);
});

// Test: El estado de verificación de email no cambia cuando el email no cambia
test('el estado de verificación de email no cambia cuando el email no cambia', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Actualizar solo el nombre, manteniendo el mismo email
    $response = $this
        ->actingAs($user)
        ->patch('/profile', [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    // Verificar que la actualización fue exitosa
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    // Verificar que el email_verified_at no es null (se mantuvo)
    $this->assertNotNull($user->refresh()->email_verified_at);
});

// Test: El usuario puede eliminar su cuenta
test('el usuario puede eliminar su cuenta', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Eliminar la cuenta
    $response = $this
        ->actingAs($user)
        ->delete('/profile', [
            'password' => 'password',
        ]);

    // Verificar que la eliminación fue exitosa
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    // Verificar que el usuario ya no está autenticado
    $this->assertGuest();
    
    // Verificar que el usuario fue eliminado de la base de datos
    $this->assertNull($user->fresh());
});

// Test: La contraseña correcta debe ser proporcionada para eliminar cuenta
test('la contraseña correcta debe ser proporcionada para eliminar cuenta', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Intentar eliminar con contraseña incorrecta
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->delete('/profile', [
            'password' => 'wrong-password',
        ]);

    // Verificar que hay error en el campo password
    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect('/profile');

    // Verificar que el usuario no fue eliminado
    $this->assertNotNull($user->fresh());
});
