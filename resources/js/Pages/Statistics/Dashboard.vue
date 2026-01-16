<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const stats = ref([]);
const period = ref('24h');
const loading = ref(false);

const periods = [
    { value: '24h', label: 'Últimas 24 Horas' },
    { value: '7d', label: 'Últimos 7 Días' },
    { value: '30d', label: 'Últimos 30 Días' },
];

const fetchStats = async () => {
    loading.value = true;
    try {
        const response = await axios.get(route('statistics.index'), {
            params: { period: period.value }
        });
        stats.value = response.data.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
    } finally {
        loading.value = false;
    }
};

watch(period, () => {
    fetchStats();
});

onMounted(() => {
    fetchStats();
});

function calculateCTR(clicks, impressions) {
    if (!impressions) return '0.00%';
    return ((clicks / impressions) * 100).toFixed(2) + '%';
}
</script>

<template>
    <Head title="Estadísticas" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-text">Estadísticas</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-surface shadow-sm sm:rounded-lg border border-border">
                    <div class="p-6 text-text">
                        
                        <!-- Header with Filters -->
                        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <h3 class="text-lg font-medium">Métricas de Eventos</h3>
                            
                            <div class="flex bg-surface-alt/50 p-1 rounded-xl">
                                <button 
                                    v-for="p in periods" 
                                    :key="p.value"
                                    @click="period = p.value"
                                    class="px-4 py-2 rounded-lg transition-all text-sm font-medium"
                                    :class="period === p.value ? 'bg-[#8B6F47] text-white shadow-md' : 'text-text-secondary hover:text-text hover:bg-surface-alt'"
                                >
                                    {{ p.label }}
                                </button>
                            </div>
                        </div>

                        <!-- Loading State -->
                        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
                            <svg class="animate-spin h-10 w-10 text-[#8B6F47]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p class="mt-4 text-text-secondary">Cargando datos...</p>
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="stats.length === 0" class="text-center py-16 bg-surface-alt/30 rounded-2xl border border-dashed border-border">
                            <div class="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h4 class="text-lg font-medium text-text">No hay datos registrados</h4>
                            <p class="text-text-secondary mt-1 max-w-sm mx-auto">No se han encontrado eventos para el período seleccionado. Las métricas aparecerán aquí una vez que haya actividad.</p>
                        </div>

                        <!-- Table -->
                        <div v-else class="overflow-x-auto rounded-xl border border-border">
                            <table class="w-full text-left text-sm">
                                <thead class="bg-surface-alt text-text-secondary font-semibold border-b border-border">
                                    <tr>
                                        <th class="px-6 py-4">Evento</th>
                                        <th class="px-6 py-4">Descripción</th>
                                        <th class="px-6 py-4 text-center">Impresiones</th>
                                        <th class="px-6 py-4 text-center">Clicks</th>
                                        <th class="px-6 py-4 text-center">CTR</th>
                                        <!-- <th class="px-6 py-4 text-center">Scrolls</th> -->
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-border bg-surface">
                                    <tr v-for="stat in stats" :key="stat.event" class="hover:bg-surface-alt/30 transition-colors">
                                        <td class="px-6 py-4">
                                            <div class="flex flex-col">
                                                <span class="text-base font-medium text-text">{{ stat.name }}</span>
                                                <span class="text-xs text-text-secondary font-mono mt-1 opacity-70">{{ stat.event }}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-text-secondary max-w-xs truncate" :title="stat.description">
                                            {{ stat.description || 'Sin descripción' }}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                {{ stat.impressions.toLocaleString() }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                {{ stat.clicks.toLocaleString() }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center font-bold">
                                            <span :class="parseFloat(calculateCTR(stat.clicks, stat.impressions)) > 0 ? 'text-[#8B6F47]' : 'text-text-secondary opacity-50'">
                                                {{ calculateCTR(stat.clicks, stat.impressions) }}
                                            </span>
                                        </td>
                                        <!-- <td class="px-6 py-4 text-center text-text-secondary">
                                            {{ stat.scrolls.toLocaleString() }}
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="mt-4 text-right">
                            <p class="text-xs text-text-secondary">
                                * CTR (Click Through Rate) = (Clicks / Impresiones) x 100
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
