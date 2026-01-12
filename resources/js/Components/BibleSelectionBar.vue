<script setup>
defineProps({
    selectedVerses: Array,
    isCopied: Boolean
});

defineEmits(['copyVerses', 'openNoteModal', 'clearSelection']);
</script>

<template>
    <Transition name="fade">
        <div v-if="selectedVerses.length > 0" class="fixed bottom-8 left-0 right-0 z-40 px-4 flex justify-center">
            <div class="bg-[#3A3026] dark:bg-[#E3C598] text-[#F5F0E6] dark:text-[#3A3026] rounded-full shadow-2xl px-6 py-3 flex items-center gap-6">
                <span class="font-bold text-sm">{{ selectedVerses.length }} seleccionado{{ selectedVerses.length > 1 ? 's' : '' }}</span>
                <div class="h-6 w-px bg-white/20 dark:bg-black/20"></div>
                
                <button @click="$emit('copyVerses')" class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                    <svg v-if="!isCopied" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span :class="{'text-green-400': isCopied}">{{ isCopied ? 'Copiado' : 'Copiar' }}</span>
                </button>
                <div class="h-6 w-px bg-white/20 dark:bg-black/20"></div>
                <button @click="$emit('openNoteModal')" class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favorito <span class="hidden sm:inline">& Nota</span>
                </button>
                <button @click="$emit('clearSelection')" class="p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </Transition>
</template>
