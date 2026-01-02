<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import SecondaryButton from '@/Components/SecondaryButton.vue';

defineProps({
    story: Object,
});
</script>

<template>
    <Head :title="story.title" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detalles de la Historia: {{ story.title }}</h2>
                <Link :href="route('bible-stories.index')">
                    <SecondaryButton>Volver</SecondaryButton>
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/3">
                                <img v-if="story.cover_image" :src="story.cover_image" class="w-full rounded-lg shadow-lg" :alt="story.title">
                                <div v-else class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                                    <span class="text-gray-400">Sin imagen</span>
                                </div>
                            </div>
                            <div class="md:w-2/3">
                                <div class="mb-4">
                                    <span class="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                                        Serie: {{ story.series?.title }}
                                    </span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ story.title }}</h3>
                                <p class="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                                    {{ story.book }} {{ story.chapter_start }}:{{ story.verse_start }}
                                    <span v-if="story.chapter_end"> - {{ story.chapter_end }}:{{ story.verse_end }}</span>
                                    <span v-else-if="story.verse_end"> - {{ story.verse_end }}</span>
                                </p>
                                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ story.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
