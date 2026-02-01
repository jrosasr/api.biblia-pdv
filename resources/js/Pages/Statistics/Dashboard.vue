<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

// Computed property para preparar los datos del gráfico
const chartData = computed(() => {
    // Agrupar datos por fecha
    const groupedData = {};
    
    // Iterar stats (que pueden tener varios eventos por día) y sumar métricas por fecha
    stats.value.forEach(stat => {
        const dateKey = stat.date.split('T')[0];
        if (!groupedData[dateKey]) {
            groupedData[dateKey] = { impressions: 0, clicks: 0, scrolls: 0 };
        }
        groupedData[dateKey].impressions += stat.impressions || 0;
        groupedData[dateKey].clicks += stat.clicks || 0;
        groupedData[dateKey].scrolls += stat.scrolls || 0;
    });

    // Ordenar fechas ascendente para el gráfico
    const sortedDates = Object.keys(groupedData).sort();
    
    const labels = sortedDates.map(date => date.split('-').reverse().join('/'));
    const impressionsData = sortedDates.map(date => groupedData[date].impressions);
    const clicksData = sortedDates.map(date => groupedData[date].clicks);

    return {
        labels: labels,
        datasets: [
            {
                label: 'Impresiones',
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6', // Azul Tailwind
                data: impressionsData,
                tension: 0.4, // Curva suave
                fill: false
            },
            {
                label: 'Clicks',
                backgroundColor: '#10B981',
                borderColor: '#10B981', // Verde Tailwind
                data: clicksData,
                tension: 0.4,
                fill: false
            }
        ]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(156, 163, 175, 0.1)' // Gray-400 with opacity
            },
            ticks: { color: '#6B7280' }
        },
        x: {
            grid: { display: false },
            ticks: { color: '#6B7280' }
        }
    },
    plugins: {
        legend: {
            labels: { color: '#374151' } // Gray-700
        }
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

// Modal & Details State
const showModal = ref(false);
const modalLoading = ref(false);
const selectedStat = ref(null);
const hitDetails = ref({
    hits: { data: [] },
    aggregates: { browsers: [], platforms: [], devices: [] }
});
const hitSearch = ref('');
const hitPage = ref(1);

const fetchEventDetails = async (statId, page = 1) => {
    selectedStat.value = stats.value.find(s => s.id === statId);
    showModal.value = true;
    modalLoading.value = true;
    hitPage.value = page;
    
    try {
        const response = await axios.get(route('statistics.show', statId), {
            params: { 
                search: hitSearch.value,
                page: page
            }
        });
        hitDetails.value = response.data;
    } catch (error) {
        console.error('Error fetching event details:', error);
    } finally {
        modalLoading.value = false;
    }
};

watch(hitSearch, () => {
    if (selectedStat.value) {
        fetchEventDetails(selectedStat.value.id, 1);
    }
});
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

                        <div v-else>
                            <!-- Chart Section -->
                            <div v-if="stats.length > 0" class="mb-8 p-4 bg-surface rounded-xl border border-border h-80">
                                <h4 class="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">Tendencia de Actividad</h4>
                                <div class="h-64 w-full">
                                    <Line :data="chartData" :options="chartOptions" />
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div v-if="stats.length === 0" class="text-center py-16 bg-surface-alt/30 rounded-2xl border border-dashed border-border">
                                <div class="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h4 class="text-lg font-medium text-text">No hay datos registrados</h4>
                                <p class="text-text-secondary mt-1 max-w-sm mx-auto">No se han encontrado eventos para el período seleccionado. Las métricas aparecerán aquí una vez que haya actividad.</p>
                            </div>

                            <!-- Table -->
                            <div v-if="stats.length > 0" class="overflow-x-auto rounded-xl border border-border">
                            <table class="w-full text-left text-sm">
                                <thead class="bg-surface-alt text-text-secondary font-semibold border-b border-border">
                                    <tr>
                                        <th class="px-6 py-4">Fecha</th>
                                        <th class="px-6 py-4">Evento</th>
                                        <th class="px-6 py-4">Descripción</th>
                                        <th class="px-6 py-4 text-center">Impresiones</th>
                                        <th class="px-6 py-4 text-center">Unicos</th>
                                        <th class="px-6 py-4 text-center">Scrolls</th>
                                        <th class="px-6 py-4 text-center">Clicks</th>
                                        <th class="px-6 py-4 text-center">CTR</th>
                                        <th class="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-border bg-surface">
                                    <tr 
                                        v-for="stat in stats" 
                                        :key="stat.id" 
                                        @click="fetchEventDetails(stat.id)"
                                        class="hover:bg-surface-alt/50 transition-all cursor-pointer group"
                                    >
                                        <td class="px-6 py-4 text-text font-mono whitespace-nowrap">
                                            {{ stat.date.split('T')[0].split('-').reverse().join('/') }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex flex-col">
                                                <span class="text-base font-medium text-text group-hover:text-[#8B6F47] transition-colors">{{ stat.name }}</span>
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
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                {{ (stat.uniques || 0).toLocaleString() }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                                {{ (stat.scrolls || 0).toLocaleString() }}
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
                                        <td class="px-6 py-4 text-right">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="mt-4 text-right">
                            <p class="text-xs text-text-secondary">
                                * CTR (Click Through Rate) = (Clicks / Impresiones) x 100
                            </p>
                        </div>
                        
                        </div> <!-- End v-else wrapper -->

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

    <!-- Detailed Stats Modal -->
    <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <div class="relative w-full max-w-5xl bg-surface rounded-[2rem] shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]">
                
                <!-- Close button -->
                <button @click="showModal = false" class="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-alt transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Modal Header -->
                <div class="p-8 border-b border-border bg-surface-alt/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 class="text-2xl font-black text-text">{{ selectedStat?.name }}</h3>
                            <p class="text-text-secondary font-mono text-sm mt-1">{{ selectedStat?.event }} • {{ selectedStat?.date.split('T')[0].split('-').reverse().join('/') }}</p>
                        </div>
                        <div class="flex gap-4 mr-12">
                            <div class="text-center px-4 py-2 bg-surface rounded-xl border border-border">
                                <span class="block text-xs text-text-secondary uppercase font-bold tracking-tighter">Únicos</span>
                                <span class="text-xl font-black text-purple-600">{{ selectedStat?.uniques || 0 }}</span>
                            </div>
                            <div class="text-center px-4 py-2 bg-surface rounded-xl border border-border">
                                <span class="block text-xs text-text-secondary uppercase font-bold tracking-tighter">Total Hits</span>
                                <span class="text-xl font-black text-[#8B6F47]">{{ selectedStat?.impressions + selectedStat?.clicks }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Content -->
                <div class="flex-1 overflow-y-auto p-8">
                    <div v-if="modalLoading" class="flex flex-col items-center justify-center py-20">
                        <svg class="animate-spin h-10 w-10 text-[#8B6F47]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p class="mt-4 text-text-secondary">Obteniendo detalles...</p>
                    </div>

                    <div v-else class="space-y-8">
                        <!-- Aggregate Charts/Lists -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="p-6 bg-surface-alt/30 rounded-2xl border border-border">
                                <h4 class="text-sm font-bold text-text-secondary uppercase mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                    Navegadores
                                </h4>
                                <div class="space-y-3">
                                    <div v-for="b in hitDetails.aggregates.browsers" :key="b.browser" class="flex justify-between items-center text-sm">
                                        <span class="text-text font-medium">{{ b.browser }}</span>
                                        <span class="text-text-secondary">{{ b.total }}</span>
                                    </div>
                                    <p v-if="!hitDetails.aggregates.browsers.length" class="text-xs text-text-secondary italic">Sin datos</p>
                                </div>
                            </div>

                            <div class="p-6 bg-surface-alt/30 rounded-2xl border border-border">
                                <h4 class="text-sm font-bold text-text-secondary uppercase mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Sistemas
                                </h4>
                                <div class="space-y-3">
                                    <div v-for="p in hitDetails.aggregates.platforms" :key="p.platform" class="flex justify-between items-center text-sm">
                                        <span class="text-text font-medium">{{ p.platform }}</span>
                                        <span class="text-text-secondary">{{ p.total }}</span>
                                    </div>
                                    <p v-if="!hitDetails.aggregates.platforms.length" class="text-xs text-text-secondary italic">Sin datos</p>
                                </div>
                            </div>

                            <div class="p-6 bg-surface-alt/30 rounded-2xl border border-border">
                                <h4 class="text-sm font-bold text-text-secondary uppercase mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    Dispositivos
                                </h4>
                                <div class="space-y-3">
                                    <div v-for="d in hitDetails.aggregates.devices" :key="d.device" class="flex justify-between items-center text-sm">
                                        <span class="text-text font-medium capitalize">{{ d.device }}</span>
                                        <span class="text-text-secondary">{{ d.total }}</span>
                                    </div>
                                    <p v-if="!hitDetails.aggregates.devices.length" class="text-xs text-text-secondary italic">Sin datos</p>
                                </div>
                            </div>
                        </div>

                        <!-- Hit List with Search -->
                        <div class="space-y-4">
                            <div class="flex justify-between items-center pb-2 border-b border-border">
                                <h4 class="text-lg font-bold text-text">Registro de Actividad Reciente</h4>
                                <div class="relative w-64">
                                    <input 
                                        type="text" 
                                        v-model="hitSearch" 
                                        placeholder="Buscar IP o Usuario..." 
                                        class="w-full pl-10 pr-4 py-2 rounded-xl border-border bg-surface-alt/20 text-sm focus:ring-[#8B6F47] focus:border-[#8B6F47]"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-4 top-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div class="overflow-x-auto rounded-xl border border-border">
                                <table class="w-full text-left text-sm">
                                    <thead class="bg-surface-alt text-text-secondary font-semibold">
                                        <tr>
                                            <th class="px-6 py-4">Usuario / IP</th>
                                            <th class="px-6 py-4">Ubicación Técnica</th>
                                            <th class="px-6 py-4">Navegador</th>
                                            <th class="px-6 py-4 text-right">Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-border">
                                        <tr v-for="hit in hitDetails.hits.data" :key="hit.id" class="hover:bg-surface-alt/10 transition-colors">
                                            <td class="px-6 py-4">
                                                <div class="flex flex-col">
                                                    <span class="font-bold border-b border-transparent hover:border-[#8B6F47] transition-colors inline-block w-fit cursor-default">{{ hit.user?.name || 'Visitante Anónimo' }}</span>
                                                    <span class="text-xs font-mono text-text-secondary opacity-60">{{ hit.ip_address }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <span class="px-2 py-0.5 rounded-lg bg-surface-alt text-[10px] font-bold uppercase tracking-wider">{{ hit.platform }}</span>
                                                    <span class="px-2 py-0.5 rounded-lg bg-surface-alt text-[10px] font-bold uppercase tracking-wider">{{ hit.device }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-text-secondary text-xs truncate max-w-[120px]">
                                                {{ hit.browser }}
                                            </td>
                                            <td class="px-6 py-4 text-right text-text-secondary whitespace-nowrap">
                                                {{ new Date(hit.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) }}
                                            </td>
                                        </tr>
                                        <tr v-if="!hitDetails.hits.data.length">
                                            <td colspan="4" class="px-6 py-12 text-center text-text-secondary italic">No se encontraron registros para esta búsqueda.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Modal Pagination -->
                            <div v-if="hitDetails.hits.last_page > 1" class="flex justify-center gap-2 pt-4">
                                <button 
                                    v-for="p in hitDetails.hits.links" 
                                    :key="p.label"
                                    v-html="p.label"
                                    @click="p.url && fetchEventDetails(selectedStat.id, parseInt(p.url.split('page=')[1]))"
                                    :disabled="!p.url"
                                    class="px-3 py-1 rounded-lg text-xs"
                                    :class="p.active ? 'bg-[#8B6F47] text-white' : 'text-text-secondary hover:bg-surface-alt hover:text-text'"
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="p-8 border-t border-border bg-surface-alt/10 flex justify-end">
                    <button @click="showModal = false" class="px-8 py-3 bg-[#3A3026] text-white rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95">
                        Cerrar Detalles
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
