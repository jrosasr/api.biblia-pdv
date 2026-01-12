<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    selectedBook: Object,
    selectedChapter: Number
});

defineEmits(['openBookModal']);
</script>

<template>
    <nav class="flex mb-6 text-sm text-[#8B6F47] dark:text-[#9B8D82] overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
            <li>
                <Link :href="route('home')" class="hover:text-[#3A3026] dark:hover:text-[#F5F0E6]">Inicio</Link>
            </li>
            <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
                <span class="hover:text-[#3A3026] dark:hover:text-[#F5F0E6] cursor-pointer" @click="$emit('openBookModal')">{{ selectedBook?.name }}</span>
            </li>
            <li class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
                <span class="font-bold text-[#3A3026] dark:text-[#F5F0E6]">Capítulo {{ selectedChapter }}</span>
            </li>
        </ol>
    </nav>
</template>
