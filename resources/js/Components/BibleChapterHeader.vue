<script setup>
defineProps({
    selectedBook: Object,
    selectedChapter: Number
});

defineEmits(['openBookModal', 'prevChapter', 'nextChapter']);
</script>

<template>
    <div class="flex flex-col items-center mb-8">
        <div @click="$emit('openBookModal')" class="text-center cursor-pointer group">
            <h2 class="text-[#6B5D52] dark:text-[#CFC6B8] text-lg font-medium">{{ selectedBook?.name }}</h2>
            <h1 class="text-3xl font-bold text-[#3A3026] dark:text-[#F5F0E6] flex items-center gap-2">
                Capítulo {{ selectedChapter }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598] group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </h1>
        </div>
        
        <div class="mt-4 flex gap-4">
            <button @click="$emit('prevChapter')" class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button @click="$emit('nextChapter')" class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>
