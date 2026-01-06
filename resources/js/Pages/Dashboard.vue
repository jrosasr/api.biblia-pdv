<script setup>
import { ref, computed, onMounted } from 'vue';

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

import { useForm } from '@inertiajs/vue3';

const form = useForm({
    title: '',
    body: '',
});

const sendCustomNotification = () => {
    form.post(route('notifications.custom'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            alert('Notificación enviada con éxito');
        },
        onError: (errors) => {
            console.error(errors);
            alert('Error al enviar la notificación');
        }
    });
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-bold leading-tight text-primary"
            >
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border"
                >
                    <div class="p-6 text-text">
                        <h3 class="text-lg font-bold mb-4">Estadísticas de Lectura</h3>
                        <div class="h-96">
                             <Bar :data="chartData" :options="chartOptions" v-if="readingsData.length > 0"/>
                             <div v-else class="text-center text-text-tertiary">No hay datos de lectura disponibles.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pb-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <h3 class="text-lg font-bold mb-4">Enviar Notificación Personalizada</h3>
                        <form @submit.prevent="sendCustomNotification" class="space-y-4">
                            <div>
                                <label for="title" class="block text-sm font-bold text-text-secondary">Título</label>
                                <input 
                                    v-model="form.title" 
                                    type="text" 
                                    id="title" 
                                    class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                                    required
                                >
                                <div v-if="form.errors.title" class="text-red-500 text-sm mt-1">{{ form.errors.title }}</div>
                            </div>
                            <div>
                                <label for="body" class="block text-sm font-bold text-text-secondary">Mensaje</label>
                                <textarea 
                                    v-model="form.body" 
                                    id="body" 
                                    rows="3"
                                    class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                                    required
                                ></textarea>
                                <div v-if="form.errors.body" class="text-red-500 text-sm mt-1">{{ form.errors.body }}</div>
                            </div>
                            <div class="flex items-center gap-4">
                                <button 
                                    type="submit" 
                                    class="inline-flex items-center px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
                                    :disabled="form.processing"
                                >
                                    Enviar Notificación
                                </button>
                                <span v-if="form.recentlySuccessful" class="text-sm text-green-600 font-medium">Enviada.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
