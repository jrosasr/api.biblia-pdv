<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    userDetail: Object,
});

const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    // Usamos el locale es-ES para formato DD/MM/YYYY
    // Si queremos hora, podemos añadir opciones, pero last_read_date es solo fecha
    return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC' // Importante para evitar desfases en fechas sin hora
    }).format(date);
};
</script>

<template>
    <Head :title="'Usuario: ' + userDetail.name" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detalle de Usuario: {{ userDetail.name }}</h2>
                <Link :href="route('users.index')" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">&larr; Volver</Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <!-- Estadísticas de Racha -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg overflow-x-auto">
                    <div class="p-6">
                        <h3 class="text-lg font-bold mb-4">Estadísticas de Racha</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p class="text-sm text-gray-600 dark:text-gray-400">Racha Actual</p>
                                <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ userDetail.reading_streak?.current_streak || 0 }} 🔥</p>
                            </div>
                            <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <p class="text-sm text-gray-600 dark:text-gray-400">Racha más larga</p>
                                <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ userDetail.reading_streak?.longest_streak || 0 }} 🏆</p>
                            </div>
                            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <p class="text-sm text-gray-600 dark:text-gray-400">Último día leído</p>
                                <p class="text-xl font-bold text-green-600 dark:text-green-400">{{ formatDate(userDetail.reading_streak?.last_read_date) }} 📅</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lista de Favoritos -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-bold mb-4 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded inline-block">Capítulos Leídos</h3>
                        <div v-if="userDetail.bible_chapter_readings.length === 0" class="text-gray-500 italic">
                            No hay capítulos registrados como leídos.
                        </div>
                        <div v-else class="flex flex-wrap gap-2">
                            <span v-for="reading in userDetail.bible_chapter_readings" :key="reading.id" class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-sm font-medium border border-indigo-100 dark:border-indigo-800">
                                {{ reading.book_name }} {{ reading.chapter_number }}
                                <span class="text-[10px] opacity-70 ml-1">({{ reading.version_id }})</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Lista de Favoritos -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-bold mb-4">Versículos Favoritos</h3>
                        <div v-if="userDetail.favorites.length === 0" class="text-gray-500 italic">
                            No tiene versículos favoritos.
                        </div>
                        <div v-else class="space-y-4">
                            <div v-for="fav in userDetail.favorites" :key="fav.id" class="border dark:border-gray-700 p-4 rounded-lg">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="font-bold text-indigo-600 dark:text-indigo-400">
                                        {{ fav.book_name }} {{ fav.chapter }}:{{ fav.verse }}
                                    </span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400 uppercase">
                                        {{ fav.version_id }}
                                    </span>
                                </div>
                                <p class="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-2">
                                    {{ fav.text }}
                                </p>
                                <p v-if="fav.note" class="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700 italic">
                                    Nota: {{ fav.note }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Historial de lectura (Logs) -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-bold mb-4">Historial de Lectura (Últimos 30)</h3>
                        <div v-if="userDetail.reading_logs.length === 0" class="text-gray-500 italic">
                            No hay registros de lectura.
                        </div>
                        <div v-else class="flex flex-wrap gap-2">
                            <span v-for="log in userDetail.reading_logs" :key="log.id" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300">
                                {{ formatDate(log.read_date) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
