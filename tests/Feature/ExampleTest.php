<?php

/**
 * Test de Ejemplo - Feature
 * 
 * Este es un test de ejemplo básico que verifica que la aplicación
 * retorna una respuesta exitosa en la ruta principal.
 */

// Test: La aplicación retorna una respuesta exitosa
test('la aplicación retorna una respuesta exitosa', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
