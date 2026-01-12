<script setup>
defineProps({
    isOpen: Boolean,
    selectedVerses: Array,
    processing: Boolean,
    modelValue: String
});

defineEmits(['close', 'save', 'update:modelValue']);
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>
            <div class="relative w-full max-w-lg bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#F5EBE0] dark:bg-[#222222]">
                    <h3 class="text-xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Guardar Favorito</h3>
                    <button @click="$emit('close')" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#3A3026] dark:text-[#F5F0E6]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div class="p-6 space-y-4">
                    <div class="bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 p-4 rounded-xl border border-[#8B6F47]/10 dark:border-[#E3C598]/10 max-h-32 overflow-y-auto">
                        <p class="text-sm text-[#8B6F47] dark:text-[#E3C598] font-bold mb-2">Versículos seleccionados:</p>
                        <div v-for="v in selectedVerses" :key="v.id" class="flex gap-2 text-[#3A3026] dark:text-[#F5F0E6] text-sm mb-1">
                            <span class="font-black">{{ v.verse }}:</span>
                            <span class="truncate">{{ v.text }}</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-2">Nota Personal (Opcional)</label>
                        <textarea 
                            :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)"
                            rows="4"
                            class="w-full bg-white dark:bg-[#111111] border-2 border-[#E0D5C9] dark:border-[#2E2A25] rounded-2xl p-4 focus:border-[#8B6F47] dark:focus:border-[#E3C598] focus:ring-0 transition-all text-[#3A3026] dark:text-[#F5F0E6] font-medium resize-none"
                            placeholder="Escribe una reflexión sobre estos versículos..."
                        ></textarea>
                    </div>

                    <button 
                        @click="$emit('save')"
                        :disabled="processing"
                        class="w-full py-4 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-2xl hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {{ processing ? 'Guardando...' : 'Guardar en Favoritos' }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
