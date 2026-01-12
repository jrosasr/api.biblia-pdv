<script setup>
defineProps({
    isOpen: Boolean,
    versions: Array,
    selectedVersion: String
});

defineEmits(['close', 'selectVersion']);
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>
            <div class="relative w-full max-w-md bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
                <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center">
                    <h3 class="text-xl font-bold">Versión de la Biblia</h3>
                    <button @click="$emit('close')" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                    <button v-for="v in versions" :key="v" 
                        @click="$emit('selectVersion', v)"
                        :class="selectedVersion === v ? 'bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]' : 'hover:bg-[#F5EBE0] dark:hover:bg-[#222222]'"
                        class="w-full text-left px-5 py-4 rounded-2xl font-bold text-lg transition-all"
                    >{{ v }}</button>
                </div>
            </div>
        </div>
    </Transition>
</template>
