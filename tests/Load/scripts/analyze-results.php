<?php

/**
 * Analizador de Resultados de Load Testing
 * 
 * Este script analiza los resultados de los tests de carga ejecutados
 * con Apache Bench y genera un reporte consolidado con estadísticas
 * y recomendaciones.
 * 
 * Uso: php analyze-results.php [directorio_resultados]
 */

// Configuración
$resultsDir = $argv[1] ?? __DIR__ . '/../results';

if (!is_dir($resultsDir)) {
    echo "❌ Error: El directorio de resultados no existe: $resultsDir\n";
    exit(1);
}

// Buscar archivos de resultados
$files = glob($resultsDir . '/*.txt');

if (empty($files)) {
    echo "⚠️  No se encontraron archivos de resultados en: $resultsDir\n";
    exit(0);
}

// Banner
echo "╔═══════════════════════════════════════════════════════════════╗\n";
echo "║                                                               ║\n";
echo "║     📊 ANÁLISIS DE RESULTADOS - LOAD TESTING                 ║\n";
echo "║                                                               ║\n";
echo "╚═══════════════════════════════════════════════════════════════╝\n";
echo "\n";

// Analizar cada archivo
$results = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $filename = basename($file);
    
    // Extraer información del nombre del archivo
    if (preg_match('/(\w+)_c(\d+)_r(\d+)_(\d+)\.txt/', $filename, $matches)) {
        $endpoint = $matches[1];
        $concurrency = (int)$matches[2];
        $requests = (int)$matches[3];
        $timestamp = $matches[4];
        
        // Extraer métricas del contenido
        $metrics = extractMetrics($content);
        
        if ($metrics) {
            $results[] = [
                'endpoint' => $endpoint,
                'concurrency' => $concurrency,
                'requests' => $requests,
                'timestamp' => $timestamp,
                'metrics' => $metrics,
                'file' => $filename,
            ];
        }
    }
}

// Ordenar por endpoint y concurrencia
usort($results, function ($a, $b) {
    if ($a['endpoint'] !== $b['endpoint']) {
        return strcmp($a['endpoint'], $b['endpoint']);
    }
    return $a['concurrency'] - $b['concurrency'];
});

// Mostrar resultados agrupados por endpoint
$currentEndpoint = null;

foreach ($results as $result) {
    if ($currentEndpoint !== $result['endpoint']) {
        $currentEndpoint = $result['endpoint'];
        $endpointName = getEndpointName($result['endpoint']);
        
        echo "\n";
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        echo "📍 Endpoint: $endpointName\n";
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }
    
    $m = $result['metrics'];
    
    echo "\n";
    echo "  👥 Concurrencia: {$result['concurrency']} usuarios\n";
    echo "  📊 Total Requests: {$result['requests']}\n";
    echo "  ✅ Completados: {$m['complete_requests']}\n";
    echo "  ❌ Fallidos: {$m['failed_requests']}\n";
    echo "  🚀 Req/s: {$m['requests_per_second']}\n";
    echo "  ⏱️  Tiempo/req: {$m['time_per_request']}ms\n";
    echo "  📈 P50: {$m['p50']}ms | P95: {$m['p95']}ms | P99: {$m['p99']}ms\n";
    echo "  📁 Archivo: {$result['file']}\n";
    
    // Evaluación de rendimiento
    $evaluation = evaluatePerformance($m);
    echo "  " . $evaluation['icon'] . " Evaluación: " . $evaluation['message'] . "\n";
}

// Resumen general
echo "\n";
echo "╔═══════════════════════════════════════════════════════════════╗\n";
echo "║  RESUMEN Y RECOMENDACIONES                                    ║\n";
echo "╚═══════════════════════════════════════════════════════════════╝\n";
echo "\n";

// Encontrar el mejor y peor rendimiento
$bestRps = max(array_column(array_column($results, 'metrics'), 'requests_per_second'));
$worstRps = min(array_column(array_column($results, 'metrics'), 'requests_per_second'));

echo "🏆 Mejor throughput: {$bestRps} req/s\n";
echo "⚠️  Peor throughput: {$worstRps} req/s\n";
echo "\n";

// Recomendaciones
echo "💡 Recomendaciones:\n";
echo "\n";

$totalFailed = array_sum(array_column(array_column($results, 'metrics'), 'failed_requests'));
if ($totalFailed > 0) {
    echo "  ⚠️  Se detectaron {$totalFailed} requests fallidos en total.\n";
    echo "     → Revisar logs del servidor para identificar errores\n";
    echo "     → Verificar límites de conexiones de base de datos\n";
    echo "     → Considerar incrementar recursos del servidor\n";
    echo "\n";
}

$avgP95 = array_sum(array_column(array_column($results, 'metrics'), 'p95')) / count($results);
if ($avgP95 > 1000) {
    echo "  🐌 El percentil 95 promedio es alto ({$avgP95}ms).\n";
    echo "     → Implementar caché (Redis/Memcached)\n";
    echo "     → Optimizar queries de base de datos\n";
    echo "     → Agregar índices necesarios\n";
    echo "\n";
}

if ($bestRps < 50) {
    echo "  📉 El throughput es bajo (< 50 req/s).\n";
    echo "     → Optimizar código PHP\n";
    echo "     → Considerar implementar queue para operaciones pesadas\n";
    echo "     → Evaluar escalamiento horizontal\n";
    echo "\n";
}

echo "✅ Análisis completado.\n";
echo "\n";

/**
 * Extraer métricas de un archivo de resultados de Apache Bench
 */
function extractMetrics(string $content): ?array
{
    $metrics = [];
    
    // Requests completados
    if (preg_match('/Complete requests:\s+(\d+)/', $content, $matches)) {
        $metrics['complete_requests'] = (int)$matches[1];
    }
    
    // Requests fallidos
    if (preg_match('/Failed requests:\s+(\d+)/', $content, $matches)) {
        $metrics['failed_requests'] = (int)$matches[1];
    }
    
    // Requests por segundo
    if (preg_match('/Requests per second:\s+([\d.]+)/', $content, $matches)) {
        $metrics['requests_per_second'] = round((float)$matches[1], 2);
    }
    
    // Tiempo por request
    if (preg_match('/Time per request:\s+([\d.]+)\s+\[ms\]/', $content, $matches)) {
        $metrics['time_per_request'] = round((float)$matches[1], 2);
    }
    
    // Percentiles
    if (preg_match('/50%\s+(\d+)/', $content, $matches)) {
        $metrics['p50'] = (int)$matches[1];
    }
    if (preg_match('/95%\s+(\d+)/', $content, $matches)) {
        $metrics['p95'] = (int)$matches[1];
    }
    if (preg_match('/99%\s+(\d+)/', $content, $matches)) {
        $metrics['p99'] = (int)$matches[1];
    }
    
    return !empty($metrics) ? $metrics : null;
}

/**
 * Obtener nombre legible del endpoint
 */
function getEndpointName(string $endpoint): string
{
    $names = [
        'books' => 'Libros de la Biblia',
        'verses' => 'Versículos',
        'search' => 'Búsqueda',
    ];
    
    return $names[$endpoint] ?? ucfirst($endpoint);
}

/**
 * Evaluar rendimiento basado en métricas
 */
function evaluatePerformance(array $metrics): array
{
    $failRate = ($metrics['failed_requests'] / $metrics['complete_requests']) * 100;
    $avgTime = $metrics['time_per_request'];
    $rps = $metrics['requests_per_second'];
    
    // Criterios de evaluación
    if ($failRate > 5) {
        return [
            'icon' => '🔴',
            'message' => 'CRÍTICO - Alta tasa de fallos',
        ];
    }
    
    if ($avgTime > 2000) {
        return [
            'icon' => '🟠',
            'message' => 'ADVERTENCIA - Tiempos de respuesta muy altos',
        ];
    }
    
    if ($avgTime > 1000) {
        return [
            'icon' => '🟡',
            'message' => 'ACEPTABLE - Tiempos de respuesta moderados',
        ];
    }
    
    if ($rps > 100 && $avgTime < 500) {
        return [
            'icon' => '🟢',
            'message' => 'EXCELENTE - Rendimiento óptimo',
        ];
    }
    
    return [
        'icon' => '🟢',
        'message' => 'BUENO - Rendimiento aceptable',
    ];
}
