# Sistema de Tracking Avanzado

Este documento describe el sistema de tracking avanzado implementado para distinguir usuarios reales de bots y medir el tiempo de permanencia en la aplicación.

## 📋 Características

### 1. **Detección de Usuarios Reales mediante Scroll**

- Trackea cuando un usuario hace scroll en la página
- **Limitación inteligente**: Solo registra un evento de scroll cada 5 minutos por usuario
- Utiliza `localStorage` para mantener el estado entre sesiones
- Ayuda a distinguir usuarios reales de bots (los bots generalmente no hacen scroll)

### 2. **Medición de Tiempo de Permanencia**

- Registra cuánto tiempo pasa cada usuario en la aplicación
- Trackea el tiempo de sesión actual
- Acumula el tiempo total de todas las sesiones
- Guarda automáticamente el tiempo cuando:
    - El usuario cambia de pestaña
    - El usuario cierra la página
    - El usuario recarga la página

### 3. **Gestión de Sesiones**

- Inicia una nueva sesión cuando el usuario entra
- Pausa el contador cuando el usuario cambia de pestaña
- Reanuda el contador cuando el usuario vuelve
- Persiste los datos en `localStorage`

## 🔧 Implementación Técnica

### Composable: `useTracking.js`

El sistema está implementado como un composable de Vue 3 ubicado en:

```
/resources/js/composables/useTracking.js
```

#### Métodos Principales

##### `initTracking()`

Inicializa todo el sistema de tracking:

- Configura listeners de scroll
- Configura listeners de visibilidad de página
- Configura listeners de beforeunload
- Inicia el tracking de sesión

##### `cleanupTracking()`

Limpia todos los listeners y guarda el tiempo de sesión. Debe llamarse en `onUnmounted`.

##### `trackEvent(type, event, name, description)`

Envía un evento de tracking al backend.

**Parámetros:**

- `type`: 'impression', 'scroll', o 'click'
- `event`: Identificador único del evento
- `name`: Nombre descriptivo del evento
- `description`: Descripción opcional

##### `getSessionDuration()`

Retorna la duración de la sesión actual en segundos.

##### `getTotalTimeSpent()`

Retorna el tiempo total acumulado de todas las sesiones en segundos.

##### `formatDuration(seconds)`

Formatea una duración en segundos a un formato legible (ej: "2h 15m 30s").

##### `resetScrollTracking()`

Resetea el tracking de scroll (útil para testing).

##### `resetAllTracking()`

Resetea todo el tracking (útil para testing).

### Uso en Componentes Vue

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useTracking } from "@/composables/useTracking.js";

const {
    initTracking,
    cleanupTracking,
    trackEvent,
    getSessionDuration,
    getTotalTimeSpent,
    formatDuration,
} = useTracking();

onMounted(() => {
    // Inicializar tracking
    initTracking();
});

onUnmounted(() => {
    // Limpiar listeners y guardar datos
    cleanupTracking();
});

// Ejemplo: trackear un evento personalizado
function handleButtonClick() {
    trackEvent(
        "click",
        "custom_button",
        "Botón Personalizado",
        "El usuario hizo click en el botón",
    );
}
</script>
```

## 📊 Datos en localStorage

El sistema utiliza las siguientes claves en `localStorage`:

| Clave              | Descripción                             | Formato               |
| ------------------ | --------------------------------------- | --------------------- |
| `lastScrollTrack`  | Timestamp del último tracking de scroll | Número (milliseconds) |
| `sessionStartTime` | Timestamp de inicio de sesión actual    | Número (milliseconds) |
| `totalTimeSpent`   | Tiempo total acumulado en segundos      | Número (seconds)      |

## 🎯 Eventos de Tracking

### Evento: `user_scroll_interaction`

- **Tipo**: `scroll`
- **Nombre**: "Usuario Real Detectado"
- **Descripción**: "El usuario hizo scroll en la página"
- **Frecuencia**: Máximo una vez cada 5 minutos

### Evento: `session_duration`

- **Tipo**: `impression`
- **Nombre**: "Tiempo de Permanencia"
- **Descripción**: Incluye duración de sesión actual y tiempo total acumulado
- **Cuándo se envía**:
    - Al cambiar de pestaña
    - Al cerrar la página
    - Al desmontar el componente

## 🔍 Visualización en Dashboard

Las estadísticas de scroll y tiempo de permanencia se pueden visualizar en:

```
/es/statistics/dashboard
```

El dashboard muestra:

- **Scrolls**: Número de interacciones de scroll detectadas (usuarios reales)
- **Gráfico de tendencias**: Evolución de impresiones, clicks y scrolls
- **Detalles por evento**: Información detallada de cada evento

## 🧪 Testing y Debugging

### Ver logs en consola

El sistema imprime información útil en la consola del navegador:

```javascript
// Al inicializar
🎯 Advanced tracking initialized
⏱️  Session started at: 10:30:45
📜 Scroll tracking available: Yes

// Al trackear scroll
✅ Scroll tracked - Next tracking available in 5 minutes

// Al guardar sesión
📊 Session duration: 5m 30s
📊 Total time spent: 15m 45s
```

### Resetear tracking para testing

```javascript
// En la consola del navegador
const { resetAllTracking } = useTracking();
resetAllTracking();
```

O manualmente:

```javascript
localStorage.removeItem("lastScrollTrack");
localStorage.removeItem("sessionStartTime");
localStorage.removeItem("totalTimeSpent");
```

## 🔐 Seguridad y Privacidad

- No se almacena información personal en `localStorage`
- Solo se guardan timestamps y duraciones
- Los datos se envían al backend de forma anónima (a menos que el usuario esté autenticado)
- El sistema respeta la privacidad del usuario

## 📈 Métricas Clave

### Tasa de Usuarios Reales

```
Usuarios Reales = (Scrolls / Impresiones) × 100
```

Si esta tasa es baja, puede indicar tráfico de bots.

### Tiempo Promedio de Permanencia

Puedes calcular el tiempo promedio dividiendo el tiempo total acumulado entre el número de sesiones.

## 🚀 Mejoras Futuras

Posibles mejoras al sistema:

1. **Tracking de profundidad de scroll**: Medir qué porcentaje de la página vio el usuario
2. **Heatmaps**: Visualizar dónde hacen click los usuarios
3. **Tracking de inactividad**: Detectar cuándo el usuario está inactivo
4. **Eventos personalizados**: Permitir trackear eventos específicos de la aplicación
5. **Análisis de comportamiento**: Identificar patrones de uso

## 📝 Notas Importantes

- El tracking de scroll tiene un cooldown de 5 minutos para evitar spam
- El tiempo de sesión se guarda automáticamente al cambiar de pestaña o cerrar
- Los datos persisten en `localStorage` entre sesiones
- El sistema es compatible con SSR (Server-Side Rendering)

## 🐛 Solución de Problemas

### El scroll no se está trackeando

1. Verifica que `initTracking()` se llame en `onMounted`
2. Revisa la consola para ver si hay errores
3. Verifica que no esté en cooldown (5 minutos)

### El tiempo de sesión no se guarda

1. Asegúrate de llamar `cleanupTracking()` en `onUnmounted`
2. Verifica que los listeners de `visibilitychange` y `beforeunload` estén activos

### Los datos no aparecen en el dashboard

1. Verifica que el backend esté recibiendo las peticiones
2. Revisa los logs del servidor
3. Asegúrate de que el tipo de evento sea correcto ('impression', 'scroll', 'click')
