<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

defineProps({
    series: Array,
});

const deleteSeries = (id) => {
    if (confirm('¿Estás seguro de eliminar esta serie? Se eliminarán todas las historias asociadas.')) {
        router.delete(route('bible-series.destroy', id));
    }
};
</script>

<template>
    <Head title="Series Bíblicas" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Series Bíblicas</h2>
                <Link :href="route('bible-series.create')">
                    <PrimaryButton>
                        Nueva Serie
                    </PrimaryButton>
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div v-if="series.length === 0" class="text-center py-4">
                            No hay series registradas.
                        </div>
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div v-for="item in series" :key="item.id" class="bg-gray-50 dark:bg-gray-700 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-600">
                                <img v-if="item.cover_image" :src="item.cover_image" class="w-full h-48 object-cover" :alt="item.title">
                                <div v-else class="w-full h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                    <span class="text-gray-400">Sin imagen</span>
                                </div>
                                <div class="p-4">
                                    <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ item.description }}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                                            {{ item.stories_count }} historias
                                        </span>
                                        <div class="flex space-x-2">
                                            <Link :href="route('bible-series.edit', item.id)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 text-sm font-medium">Editar</Link>
                                            <button @click="deleteSeries(item.id)" class="text-red-600 hover:text-red-900 text-sm font-medium">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
