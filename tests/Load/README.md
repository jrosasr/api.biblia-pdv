# Tests de Carga para Consultas de Biblia

Este directorio contiene un sistema completo de tests de carga (load testing) y estrés (stress testing) para determinar la capacidad de la aplicación al manejar consultas de la Biblia.

## 📋 Contenido

- **BibleLoadTest.php** - Tests de carga automatizados con Pest
- **scripts/** - Scripts de Apache Bench y utilidades
- **results/** - Directorio para almacenar resultados de tests

## 🎯 Endpoints Testeados

1. **Obtener Libros**: `GET /api/bible/books/{version}`
2. **Obtener Versículos**: `GET /api/bible/verses/{version}/{bookId}/{chapter}`
3. **Búsqueda**: `GET /api/bible/search?version={version}&query={query}`

## 🚀 Inicio Rápido

### Requisitos Previos

```bash
# Verificar que Apache Bench está instalado
ab -V

# Si no está instalado (Ubuntu/Debian)
sudo apt-get install apache2-utils

# Si no está instalado (macOS)
# Ya viene incluido con macOS
```

### Ejecutar Tests de Carga con Pest

```bash
# Ejecutar todos los tests de carga
./vendor/bin/pest tests/Load/BibleLoadTest.php

# Ejecutar test específico
./vendor/bin/pest tests/Load/BibleLoadTest.php --filter="10 usuarios"
```

### Ejecutar Tests con Apache Bench

```bash
# Dar permisos de ejecución a los scripts
chmod +x tests/Load/scripts/*.sh

# Ejecutar test individual (ejemplo: 100 usuarios, 1000 requests)
./tests/Load/scripts/ab-bible-verses.sh 100 1000

# Ejecutar suite completa de tests
./tests/Load/scripts/run-load-tests.sh
```

## 📊 Interpretación de Resultados

### Métricas Clave

| Métrica | Descripción | Valor Ideal |
|---------|-------------|-------------|
| **Requests per second** | Cantidad de requests procesados por segundo | > 100 |
| **Time per request** | Tiempo promedio de respuesta | < 500ms |
| **Failed requests** | Cantidad de requests fallidos | 0 |
| **95th percentile** | 95% de requests completados en este tiempo | < 1000ms |

### Ejemplo de Salida de Apache Bench

```
Concurrency Level:      50
Time taken for tests:   10.234 seconds
Complete requests:      1000
Failed requests:        0
Requests per second:    97.71 [#/sec] (mean)
Time per request:       511.732 [ms] (mean)
Time per request:       10.235 [ms] (mean, across all concurrent requests)

Percentage of the requests served within a certain time (ms)
  50%    450
  66%    520
  75%    580
  80%    620
  90%    750
  95%    890
  98%   1020
  99%   1150
 100%   1500 (longest request)
```

## 🔧 Configuración

### Variables de Entorno

Copia el archivo `.env.example` y ajusta según tu entorno:

```bash
cp tests/Load/.env.example tests/Load/.env
```

Variables disponibles:

- `APP_URL` - URL base de la aplicación (default: http://localhost:8000)
- `MAX_CONCURRENT_USERS` - Máximo de usuarios concurrentes a testear (default: 1000)
- `TEST_DURATION` - Duración de cada test en segundos (default: 30)

## 📈 Niveles de Carga

El script maestro ejecuta tests con los siguientes niveles de concurrencia:

1. **10 usuarios** - Carga baja (baseline)
2. **50 usuarios** - Carga moderada
3. **100 usuarios** - Carga alta
4. **500 usuarios** - Carga muy alta
5. **1000 usuarios** - Estrés extremo

## 🛠️ Scripts Disponibles

### Apache Bench Scripts

- `ab-bible-books.sh [concurrency] [requests]` - Test de endpoint de libros
- `ab-bible-verses.sh [concurrency] [requests]` - Test de endpoint de versículos
- `ab-bible-search.sh [concurrency] [requests]` - Test de endpoint de búsqueda
- `run-load-tests.sh` - Ejecuta suite completa de tests

### Utilidades

- `analyze-results.php` - Analiza resultados y genera reportes

## 📝 Ejemplos de Uso

### Test Básico con 10 Usuarios

```bash
# 10 usuarios concurrentes, 100 requests totales
./tests/Load/scripts/ab-bible-verses.sh 10 100
```

### Test de Estrés con 500 Usuarios

```bash
# 500 usuarios concurrentes, 5000 requests totales
./tests/Load/scripts/ab-bible-verses.sh 500 5000
```

### Suite Completa de Tests

```bash
# Ejecuta todos los niveles de carga y genera reporte
./tests/Load/scripts/run-load-tests.sh
```

### Analizar Resultados

```bash
# Analizar resultados de la última ejecución
php tests/Load/scripts/analyze-results.php
```

## ⚠️ Advertencias Importantes

> **NUNCA ejecutes estos tests en producción**
> 
> Los tests de carga pueden:
> - Consumir recursos significativos del servidor
> - Afectar el rendimiento para usuarios reales
> - Generar alta carga en la base de datos

### Recomendaciones

1. **Ejecutar en entorno de desarrollo o staging**
2. **Monitorear recursos del servidor** durante las pruebas
3. **Tener backups** antes de ejecutar tests de estrés extremos
4. **Escalar gradualmente** - empezar con pocos usuarios e incrementar
5. **Revisar logs** después de cada test para identificar errores

## 🔍 Troubleshooting

### Error: "ab: command not found"

Instala Apache Bench:

```bash
# Ubuntu/Debian
sudo apt-get install apache2-utils

# CentOS/RHEL
sudo yum install httpd-tools
```

### Error: "Connection refused"

Asegúrate de que el servidor está corriendo:

```bash
php artisan serve
```

### Resultados inconsistentes

1. Cierra otras aplicaciones que consuman recursos
2. Ejecuta múltiples veces y promedia los resultados
3. Verifica que no haya otros procesos compitiendo por recursos

## 📊 Optimizaciones Sugeridas

Basado en los resultados, considera:

### Si el tiempo de respuesta es alto (> 1s)

- Implementar caché (Redis/Memcached)
- Agregar índices en la base de datos
- Optimizar queries SQL
- Implementar lazy loading

### Si hay muchos requests fallidos

- Incrementar límites de PHP-FPM
- Ajustar configuración de base de datos
- Revisar límites de memoria
- Implementar rate limiting

### Si el throughput es bajo (< 50 req/s)

- Optimizar código PHP
- Implementar queue para operaciones pesadas
- Considerar CDN para assets estáticos
- Escalar horizontalmente (más servidores)

## 📚 Recursos Adicionales

- [Apache Bench Documentation](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [Pest Testing Framework](https://pestphp.com/)
- [Laravel Performance Optimization](https://laravel.com/docs/optimization)

## 🤝 Contribuir

Para agregar nuevos tests de carga:

1. Crea un nuevo script en `tests/Load/scripts/`
2. Sigue el patrón de los scripts existentes
3. Actualiza este README con el nuevo test
4. Agrega el test al script maestro `run-load-tests.sh`

## 📄 Licencia

Este proyecto está bajo la misma licencia que la aplicación principal.
