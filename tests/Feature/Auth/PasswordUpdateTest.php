<?php

/**
 * Tests de Actualización de Contraseña
 * 
 * Estos tests verifican que los usuarios pueden actualizar su contraseña
 * desde su perfil, validando que se requiera la contraseña actual correcta.
 */

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Test: La contraseña puede ser actualizada
test('la contraseña puede ser actualizada', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Actualizar la contraseña
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    // Verificar que la actualización fue exitosa
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    // Verificar que la nueva contraseña fue guardada correctamente
    $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
});

// Test: La contraseña correcta debe ser proporcionada para actualizar
test('la contraseña correcta debe ser proporcionada para actualizar', function () {
    // Crear un usuario de prueba
    $user = User::factory()->create();

    // Intentar actualizar con contraseña actual incorrecta
    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->put('/password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    // Verificar que hay error en el campo current_password
    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect('/profile');
});
