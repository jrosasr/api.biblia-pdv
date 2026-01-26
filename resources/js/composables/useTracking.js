import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

/**
 * Composable para tracking avanzado de usuarios
 * - Detecta scroll para distinguir usuarios reales de bots
 * - Limita el tracking de scroll a una vez cada 5 minutos
 * - Mide el tiempo de permanencia del usuario en la aplicación
 */
export function useTracking() {
    const SCROLL_TRACKING_INTERVAL = 5 * 60 * 1000; // 5 minutos en milisegundos
    const SCROLL_STORAGE_KEY = 'lastScrollTrack';
    const SESSION_START_KEY = 'sessionStartTime';
    const TOTAL_TIME_KEY = 'totalTimeSpent';
    
    const sessionStartTime = ref(null);
    const scrollTracked = ref(false);
    const scrollListener = ref(null);
    const visibilityListener = ref(null);
    const beforeUnloadListener = ref(null);

    /**
     * Envía un evento de tracking al backend
     */
    function trackEvent(type, event, name, description = null) {
        axios.post('/es/api/statistics/track', {
            type,
            event,
            name,
            description
        }).catch(e => console.error('Tracking error', e));
    }

    /**
     * Verifica si han pasado más de 5 minutos desde el último tracking de scroll
     */
    function canTrackScroll() {
        const lastTrack = localStorage.getItem(SCROLL_STORAGE_KEY);
        if (!lastTrack) return true;
        
        const lastTrackTime = parseInt(lastTrack);
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTrackTime;
        
        return timeDiff >= SCROLL_TRACKING_INTERVAL;
    }

    /**
     * Registra el tracking de scroll y actualiza el timestamp en localStorage
     */
    function trackScroll() {
        if (scrollTracked.value || !canTrackScroll()) return;
        
        scrollTracked.value = true;
        const currentTime = Date.now();
        
        // Guardar timestamp del tracking
        localStorage.setItem(SCROLL_STORAGE_KEY, currentTime.toString());
        
        // Enviar evento de scroll
        trackEvent('scroll', 'user_scroll_interaction', 'Usuario Real Detectado', 'El usuario hizo scroll en la página');
        
        console.log('✅ Scroll tracked - Next tracking available in 5 minutes');
    }

    /**
     * Maneja el evento de scroll
     */
    function handleScroll() {
        if (!scrollTracked.value && canTrackScroll()) {
            trackScroll();
        }
    }

    /**
     * Inicia el tracking de sesión
     */
    function startSessionTracking() {
        const existingSession = localStorage.getItem(SESSION_START_KEY);
        
        if (!existingSession) {
            // Nueva sesión
            sessionStartTime.value = Date.now();
            localStorage.setItem(SESSION_START_KEY, sessionStartTime.value.toString());
        } else {
            // Sesión existente
            sessionStartTime.value = parseInt(existingSession);
        }
    }

    /**
     * Calcula el tiempo de permanencia en la sesión actual
     */
    function getSessionDuration() {
        if (!sessionStartTime.value) return 0;
        return Math.floor((Date.now() - sessionStartTime.value) / 1000); // en segundos
    }

    /**
     * Calcula el tiempo total acumulado
     */
    function getTotalTimeSpent() {
        const stored = localStorage.getItem(TOTAL_TIME_KEY);
        return stored ? parseInt(stored) : 0;
    }

    /**
     * Guarda el tiempo de permanencia cuando el usuario sale o cambia de pestaña
     */
    function saveSessionTime() {
        const sessionDuration = getSessionDuration();
        if (sessionDuration > 0) {
            const totalTime = getTotalTimeSpent() + sessionDuration;
            localStorage.setItem(TOTAL_TIME_KEY, totalTime.toString());
            
            // Enviar tracking de tiempo de permanencia
            trackEvent('impression', 'session_duration', 'Tiempo de Permanencia', 
                `Usuario permaneció ${formatDuration(sessionDuration)} en esta sesión. Total acumulado: ${formatDuration(totalTime)}`);
            
            console.log(`📊 Session duration: ${formatDuration(sessionDuration)}`);
            console.log(`📊 Total time spent: ${formatDuration(totalTime)}`);
        }
    }

    /**
     * Formatea la duración en un formato legible
     */
    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }

    /**
     * Maneja el cambio de visibilidad de la página
     */
    function handleVisibilityChange() {
        if (document.hidden) {
            // Usuario cambió de pestaña o minimizó
            saveSessionTime();
            // Reiniciar el tiempo de sesión
            localStorage.removeItem(SESSION_START_KEY);
            sessionStartTime.value = null;
        } else {
            // Usuario volvió a la pestaña
            startSessionTracking();
        }
    }

    /**
     * Maneja el evento antes de cerrar/recargar la página
     */
    function handleBeforeUnload() {
        saveSessionTime();
    }

    /**
     * Inicializa el tracking
     */
    function initTracking() {
        // Iniciar tracking de sesión
        startSessionTracking();
        
        // Verificar si podemos trackear scroll inmediatamente
        scrollTracked.value = !canTrackScroll();
        
        // Agregar listener de scroll
        scrollListener.value = handleScroll;
        window.addEventListener('scroll', scrollListener.value, { passive: true });
        
        // Agregar listener de visibilidad
        visibilityListener.value = handleVisibilityChange;
        document.addEventListener('visibilitychange', visibilityListener.value);
        
        // Agregar listener antes de cerrar
        beforeUnloadListener.value = handleBeforeUnload;
        window.addEventListener('beforeunload', beforeUnloadListener.value);
        
        console.log('🎯 Advanced tracking initialized');
        console.log(`⏱️  Session started at: ${new Date(sessionStartTime.value).toLocaleTimeString()}`);
        console.log(`📜 Scroll tracking available: ${canTrackScroll() ? 'Yes' : 'No (waiting for cooldown)'}`);
    }

    /**
     * Limpia los listeners cuando el componente se desmonta
     */
    function cleanupTracking() {
        if (scrollListener.value) {
            window.removeEventListener('scroll', scrollListener.value);
        }
        if (visibilityListener.value) {
            document.removeEventListener('visibilitychange', visibilityListener.value);
        }
        if (beforeUnloadListener.value) {
            window.removeEventListener('beforeunload', beforeUnloadListener.value);
        }
        
        // Guardar tiempo de sesión al desmontar
        saveSessionTime();
    }

    /**
     * Resetea el tracking de scroll (útil para testing)
     */
    function resetScrollTracking() {
        localStorage.removeItem(SCROLL_STORAGE_KEY);
        scrollTracked.value = false;
        console.log('🔄 Scroll tracking reset');
    }

    /**
     * Resetea todo el tracking (útil para testing)
     */
    function resetAllTracking() {
        localStorage.removeItem(SCROLL_STORAGE_KEY);
        localStorage.removeItem(SESSION_START_KEY);
        localStorage.removeItem(TOTAL_TIME_KEY);
        scrollTracked.value = false;
        sessionStartTime.value = null;
        console.log('🔄 All tracking data reset');
    }

    return {
        // Métodos públicos
        initTracking,
        cleanupTracking,
        trackEvent,
        resetScrollTracking,
        resetAllTracking,
        getSessionDuration,
        getTotalTimeSpent,
        formatDuration,
        
        // Estado reactivo
        scrollTracked,
        sessionStartTime,
    };
}
