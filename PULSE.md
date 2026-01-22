# Laravel Pulse - Configuración

## Descripción

Laravel Pulse es una herramienta de monitoreo de aplicaciones en tiempo real que proporciona información valiosa sobre el rendimiento de tu aplicación Laravel.

## Instalación Completada

Laravel Pulse ha sido instalado y configurado en este proyecto con las siguientes características:

### 1. Paquetes Instalados

- `laravel/pulse` (v1.5.0)
- `livewire/livewire` (v4.0.1) - Dependencia de Pulse

### 2. Configuración de Seguridad

- **Acceso Restringido**: Solo los usuarios con rol `admin` pueden acceder a Pulse
- **Middleware Personalizado**: Se creó `EnsureUserIsAdmin` para validar el acceso
- **Ruta Protegida**: `/es/pulse` está protegida con los middlewares `web`, `auth` y `admin`

### 3. Archivos Creados/Modificados

#### Archivos Nuevos:

- `app/Http/Middleware/EnsureUserIsAdmin.php` - Middleware de autorización
- `config/pulse.php` - Configuración de Pulse
- Migraciones de Pulse en `database/migrations/`

#### Archivos Modificados:

- `bootstrap/app.php` - Registro del middleware `admin`
- `config/pulse.php` - Configuración de middlewares
- `.env` y `.env.example` - Variables de entorno de Pulse
- `resources/js/Layouts/AuthenticatedLayout.vue` - Enlace en navegación

### 4. Variables de Entorno

```env
PULSE_ENABLED=true
PULSE_PATH=pulse
PULSE_STORAGE_DRIVER=database
PULSE_INGEST_DRIVER=storage
```

## Acceso a Pulse

### Para Administradores:

1. Inicia sesión con una cuenta que tenga el rol `admin`
2. Navega a `/es/pulse` o haz clic en el enlace "Pulse" en el menú de navegación
3. Verás el dashboard de Pulse con métricas en tiempo real

### Para Otros Usuarios:

- Los usuarios sin rol `admin` recibirán un error 403 (Acceso no autorizado) al intentar acceder a Pulse

## Características de Pulse

Pulse monitorea automáticamente:

1. **Solicitudes Lentas** (Slow Requests)
    - Umbral: 1000ms
    - Muestra las rutas más lentas de tu aplicación

2. **Consultas Lentas** (Slow Queries)
    - Umbral: 1000ms
    - Identifica consultas de base de datos que necesitan optimización

3. **Trabajos Lentos** (Slow Jobs)
    - Umbral: 1000ms
    - Monitorea el rendimiento de los trabajos en cola

4. **Excepciones** (Exceptions)
    - Rastrea todas las excepciones que ocurren en la aplicación

5. **Colas** (Queues)
    - Monitorea el estado de las colas de trabajos

6. **Interacciones de Caché** (Cache Interactions)
    - Muestra hits y misses del caché

7. **Solicitudes Salientes Lentas** (Slow Outgoing Requests)
    - Umbral: 1000ms
    - Monitorea llamadas HTTP a APIs externas

8. **Uso del Servidor** (Servers)
    - CPU, memoria y uso de disco

9. **Solicitudes de Usuario** (User Requests)
    - Actividad de usuarios autenticados

10. **Trabajos de Usuario** (User Jobs)
    - Trabajos ejecutados por usuarios específicos

## Comandos Importantes

### Procesar Datos de Pulse

Para que Pulse funcione correctamente, necesitas ejecutar el comando de procesamiento:

```bash
php artisan pulse:check
```

Este comando debe ejecutarse periódicamente. Puedes:

1. **Ejecutarlo manualmente** cuando necesites ver datos actualizados
2. **Agregarlo al cron** para ejecución automática:
    ```bash
    * * * * * cd /ruta/a/tu/proyecto && php artisan pulse:check >> /dev/null 2>&1
    ```
3. **Usar un supervisor** para mantenerlo corriendo continuamente

### Limpiar Datos Antiguos

Pulse limpia automáticamente los datos antiguos, pero puedes forzar la limpieza:

```bash
php artisan pulse:purge
```

### Reiniciar Pulse

Si necesitas reiniciar Pulse:

```bash
php artisan pulse:restart
```

## Personalización

### Cambiar Umbrales

Puedes ajustar los umbrales en `config/pulse.php` o mediante variables de entorno:

```env
PULSE_SLOW_REQUESTS_THRESHOLD=2000
PULSE_SLOW_QUERIES_THRESHOLD=500
PULSE_SLOW_JOBS_THRESHOLD=1500
```

### Ignorar Rutas Específicas

En `config/pulse.php`, puedes agregar patrones para ignorar ciertas rutas:

```php
'ignore' => [
    '#^/admin#',
    '#^/api/internal#',
],
```

### Cambiar la Ruta de Pulse

Si deseas cambiar la ruta `/pulse`, modifica la variable de entorno:

```env
PULSE_PATH=monitoring
```

## Solución de Problemas

### No se muestran datos

1. Verifica que `PULSE_ENABLED=true` en `.env`
2. Ejecuta `php artisan pulse:check`
3. Asegúrate de que las migraciones se ejecutaron: `php artisan migrate`
4. Limpia la caché de configuración: `php artisan config:clear`

### Error 403 al acceder

- Verifica que tu usuario tenga el rol `admin`
- Puedes asignar el rol desde la interfaz de usuarios o mediante:
    ```bash
    php artisan tinker
    >>> $user = User::find(1);
    >>> $user->assignRole('admin');
    ```

### Rendimiento

Si Pulse afecta el rendimiento:

1. Ajusta los `sample_rate` en `config/pulse.php` (valores entre 0 y 1)
2. Considera usar Redis como driver de ingest:
    ```env
    PULSE_INGEST_DRIVER=redis
    PULSE_REDIS_CONNECTION=default
    ```

## Recursos Adicionales

- [Documentación Oficial de Laravel Pulse](https://laravel.com/docs/12.x/pulse)
- [Repositorio de GitHub](https://github.com/laravel/pulse)

## Notas de Seguridad

⚠️ **IMPORTANTE**:

- Pulse puede exponer información sensible sobre tu aplicación
- Mantén siempre el acceso restringido a administradores
- No expongas Pulse en producción sin autenticación adecuada
- Considera usar variables de entorno para deshabilitar Pulse en ciertos ambientes:
    ```env
    PULSE_ENABLED=false
    ```
