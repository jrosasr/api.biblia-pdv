<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import SecondaryButton from '@/Components/SecondaryButton.vue';

defineProps({
    series: Object,
});
</script>

<template>
    <Head :title="series.title" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detalles de la Serie: {{ series.title }}</h2>
                <Link :href="route('bible-series.index')" class="w-full sm:w-auto">
                    <SecondaryButton class="w-full justify-center">Volver</SecondaryButton>
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/3">
                                <img v-if="series.cover_image" :src="series.cover_image" class="w-full rounded-lg shadow-lg" :alt="series.title">
                                <div v-else class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                                    <span class="text-gray-400">Sin imagen</span>
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ series.title }}</h3>
                                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-8">{{ series.description }}</p>
                                
                                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Historias en esta serie</h4>
                                <div v-if="series.stories.length === 0" class="text-gray-500 italic">
                                    No hay historias en esta serie.
                                </div>
                                <ul v-else class="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg overflow-hidden">
                                    <li v-for="story in series.stories" :key="story.id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center">
                                        <div>
                                            <p class="font-medium text-gray-900 dark:text-white">{{ story.title }}</p>
                                            <p class="text-sm text-gray-500">{{ story.book }} {{ story.chapter_start }}:{{ story.verse_start }}</p>
                                        </div>
                                        <Link :href="route('bible-stories.show', story.id)" class="text-indigo-600 dark:text-indigo-400 hover:underline">Ver detalles</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
