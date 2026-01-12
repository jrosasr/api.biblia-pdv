<script setup>
defineProps({
    verses: Array,
    selectedVerses: Array,
    isLoading: Boolean
});

defineEmits(['toggleSelection']);
</script>

<template>
    <div class="space-y-8 leading-relaxed mb-20">
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]"></div>
            <span class="text-[#9B8D82] animate-pulse">Cargando Palabra de Vida...</span>
        </div>
        <template v-else>
            <div 
                v-for="v in verses" 
                :key="v.id" 
                :id="`verse-${v.verse}`" 
                @click="$emit('toggleSelection', v)"
                :class="[
                    'group flex gap-5 items-start p-3 rounded-xl transition-all duration-300 cursor-pointer select-none',
                    selectedVerses.find(sel => sel.id === v.id) 
                        ? 'bg-[#8B6F47]/20 dark:bg-[#E3C598]/20 translate-x-2' 
                        : 'hover:bg-[#8B6F47]/5 dark:hover:bg-[#E3C598]/5'
                ]"
            >
                <span 
                    class="font-bold text-xs mt-2.5 min-w-[1.5rem] tracking-tighter transition-colors"
                    :class="selectedVerses.find(sel => sel.id === v.id) ? 'text-[#8B6F47] dark:text-[#E3C598] opacity-100' : 'text-[#8B6F47] dark:text-[#E3C598] opacity-60'"
                >{{ v.verse }}</span>
                <p 
                    class="text-xl md:text-2xl transition-colors duration-200"
                    :class="selectedVerses.find(sel => sel.id === v.id) ? 'text-[#3A3026] dark:text-[#F5F0E6] font-medium' : 'text-[#3A3026] dark:text-[#F5F0E6] group-hover:text-black dark:group-hover:text-white'"
                >
                    {{ v.text }}
                </p>
            </div>
        </template>
    </div>
</template>
