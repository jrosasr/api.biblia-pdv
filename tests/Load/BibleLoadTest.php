<?php

/**
 * Tests de Carga para Consultas de Biblia
 * 
 * Estos tests simulan múltiples usuarios concurrentes realizando consultas
 * a la API de la Biblia para medir el rendimiento y capacidad del sistema.
 * 
 * ADVERTENCIA: Estos tests pueden generar alta carga en el servidor.
 * Ejecutar SOLO en entornos de desarrollo o staging.
 */

use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

// Configuración base
$baseUrl = env('APP_URL', 'http://localhost:8000');
$apiPrefix = '/es'; // Prefijo de localización
$version = 'RV1960';
$bookId = 1; // Génesis
$chapter = 1;

/**
 * Helper: Simular múltiples usuarios concurrentes
 */
function simulateConcurrentUsers(int $users, string $url): array
{
    $startTime = microtime(true);
    
    // Crear cliente HTTP
    $client = new Client([
        'timeout' => 30,
        'connect_timeout' => 10,
    ]);
    
    // Crear requests concurrentes
    $promises = [];
    for ($i = 0; $i < $users; $i++) {
        $promises[] = $client->getAsync($url);
    }
    
    // Esperar a que todos completen
    $responses = Promise\Utils::settle($promises)->wait();

    $endTime = microtime(true);
    $duration = $endTime - $startTime;

    // Analizar resultados
    $successful = 0;
    $failed = 0;

    foreach ($responses as $response) {
        if ($response['state'] === 'fulfilled' && $response['value']->getStatusCode() === 200) {
            $successful++;
        } else {
            $failed++;
        }
    }

    return [
        'total_users' => $users,
        'successful' => $successful,
        'failed' => $failed,
        'duration' => round($duration, 2),
        'requests_per_second' => $duration > 0 ? round($users / $duration, 2) : 0,
        'success_rate' => round(($successful / $users) * 100, 2),
    ];
}

/**
 * Test: Carga con 10 usuarios concurrentes - Endpoint de Libros
 */
test('endpoint de libros soporta 10 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version) {
    // Simular 10 usuarios obteniendo la lista de libros
    $results = simulateConcurrentUsers(10, "{$baseUrl}{$apiPrefix}/api/bible/books/{$version}");

    // Verificar que todos los requests fueron exitosos
    expect($results['successful'])->toBe(10)
        ->and($results['failed'])->toBe(0)
        ->and($results['success_rate'])->toBe(100.0);

    // Mostrar métricas
    echo "\n📊 Resultados - 10 usuarios (Libros):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-light');

/**
 * Test: Carga con 50 usuarios concurrentes - Endpoint de Libros
 */
test('endpoint de libros soporta 50 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version) {
    $results = simulateConcurrentUsers(50, "{$baseUrl}{$apiPrefix}/api/bible/books/{$version}");

    // Permitir hasta 5% de fallos en carga moderada
    expect($results['success_rate'])->toBeGreaterThanOrEqual(95.0);

    echo "\n📊 Resultados - 50 usuarios (Libros):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-moderate');

/**
 * Test: Carga con 10 usuarios concurrentes - Endpoint de Versículos
 */
test('endpoint de versículos soporta 10 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version, $bookId, $chapter) {
    $results = simulateConcurrentUsers(10, "{$baseUrl}{$apiPrefix}/api/bible/verses/{$version}/{$bookId}/{$chapter}");

    expect($results['successful'])->toBe(10)
        ->and($results['failed'])->toBe(0)
        ->and($results['success_rate'])->toBe(100.0);

    echo "\n📊 Resultados - 10 usuarios (Versículos):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-light');

/**
 * Test: Carga con 50 usuarios concurrentes - Endpoint de Versículos
 */
test('endpoint de versículos soporta 50 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version, $bookId, $chapter) {
    $results = simulateConcurrentUsers(50, "{$baseUrl}{$apiPrefix}/api/bible/verses/{$version}/{$bookId}/{$chapter}");

    expect($results['success_rate'])->toBeGreaterThanOrEqual(95.0);

    echo "\n📊 Resultados - 50 usuarios (Versículos):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-moderate');

/**
 * Test: Carga con 100 usuarios concurrentes - Endpoint de Versículos
 */
test('endpoint de versículos soporta 100 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version, $bookId, $chapter) {
    $results = simulateConcurrentUsers(100, "{$baseUrl}{$apiPrefix}/api/bible/verses/{$version}/{$bookId}/{$chapter}");

    // Permitir hasta 10% de fallos en carga alta
    expect($results['success_rate'])->toBeGreaterThanOrEqual(90.0);

    echo "\n📊 Resultados - 100 usuarios (Versículos):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-high');

/**
 * Test: Carga con 10 usuarios concurrentes - Endpoint de Búsqueda
 */
test('endpoint de búsqueda soporta 10 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version) {
    $results = simulateConcurrentUsers(10, "{$baseUrl}{$apiPrefix}/api/bible/search?version={$version}&query=amor");

    expect($results['successful'])->toBe(10)
        ->and($results['failed'])->toBe(0)
        ->and($results['success_rate'])->toBe(100.0);

    echo "\n📊 Resultados - 10 usuarios (Búsqueda):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-light');

/**
 * Test: Carga con 50 usuarios concurrentes - Endpoint de Búsqueda
 */
test('endpoint de búsqueda soporta 50 usuarios concurrentes', function () use ($baseUrl, $apiPrefix, $version) {
    $results = simulateConcurrentUsers(50, "{$baseUrl}{$apiPrefix}/api/bible/search?version={$version}&query=amor");

    expect($results['success_rate'])->toBeGreaterThanOrEqual(95.0);

    echo "\n📊 Resultados - 50 usuarios (Búsqueda):\n";
    echo "   ✓ Exitosos: {$results['successful']}\n";
    echo "   ✗ Fallidos: {$results['failed']}\n";
    echo "   ⏱ Duración: {$results['duration']}s\n";
    echo "   🚀 Req/s: {$results['requests_per_second']}\n";
    echo "   📈 Tasa de éxito: {$results['success_rate']}%\n";
})->group('load', 'load-moderate');

/**
 * Test: Estrés incremental - Encontrar el límite del sistema
 * 
 * Este test incrementa gradualmente la carga para identificar
 * en qué punto el sistema comienza a degradarse.
 */
test('test de estrés incremental para encontrar límite del sistema', function () use ($baseUrl, $apiPrefix, $version, $bookId, $chapter) {
    $levels = [10, 25, 50, 75, 100, 200, 500, 1000, 2000, 3000, 5000];
    $results = [];

    echo "\n🔥 Iniciando test de estrés incremental hasta 5000 usuarios...\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

    foreach ($levels as $users) {
        $result = simulateConcurrentUsers($users, "{$baseUrl}{$apiPrefix}/api/bible/verses/{$version}/{$bookId}/{$chapter}");

        $results[$users] = $result;

        echo "\n📊 Nivel: {$users} usuarios\n";
        echo "   ✓ Exitosos: {$result['successful']}\n";
        echo "   ✗ Fallidos: {$result['failed']}\n";
        echo "   ⏱ Duración: {$result['duration']}s\n";
        echo "   🚀 Req/s: {$result['requests_per_second']}\n";
        echo "   📈 Tasa de éxito: {$result['success_rate']}%\n";

        // Si la tasa de éxito cae por debajo del 50%, hemos encontrado el límite crítico
        if ($result['success_rate'] < 50.0) {
            echo "\n🔴 LÍMITE CRÍTICO ALCANZADO: El sistema falla significativamente con {$users} usuarios\n";
            break;
        }
        
        // Advertencia si la tasa de éxito está entre 50-80%
        if ($result['success_rate'] < 80.0) {
            echo "\n⚠️  ADVERTENCIA: El sistema comienza a degradarse con {$users} usuarios\n";
        }

        // Pequeña pausa entre niveles para permitir recuperación
        sleep(2);
    }

    echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "✅ Test de estrés incremental completado\n\n";

    // Verificar que al menos el primer nivel fue exitoso
    expect($results[10]['success_rate'])->toBe(100.0);
})->group('load', 'stress-test');
