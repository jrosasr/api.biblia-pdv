<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
    readingsData: Array,
});

const chartData = {
  labels: props.readingsData.map(item => item.date),
  datasets: [
    {
      label: 'Lecturas por día',
      backgroundColor: '#f87979',
      data: props.readingsData.map(item => item.total_readings)
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const sendTestNotification = async () => {
    try {
        const response = await axios.get('/api/test-fcm');
        alert('Notificación enviada con éxito: ' + response.data.message);
    } catch (error) {
        console.error(error);
        alert('Error enviando notificación: ' + (error.response?.data?.message || error.message));
    }
}
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
            >
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                >
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h3 class="text-lg font-medium mb-4">Estadísticas de Lectura</h3>
                        <div class="h-96">
                             <Bar :data="chartData" :options="chartOptions" v-if="readingsData.length > 0"/>
                             <div v-else class="text-center text-gray-500">No hay datos de lectura disponibles.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
