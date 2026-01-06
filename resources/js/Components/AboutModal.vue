<script setup>
const props = defineProps({
    isOpen: Boolean
});
const emit = defineEmits(['close']);
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')"></div>
            <div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center">
                    <h3 class="text-2xl font-bold italic text-[#3A3026] dark:text-[#F5F0E6]">Acerca de nosotros</h3>
                    <button @click="emit('close')" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] text-[#3A3026] dark:text-[#F5F0E6]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-8 space-y-8">
                    <div class="flex flex-col items-center text-center space-y-4">
                        <div class="w-24 h-24 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25] transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <img src="/icon.webp" alt="Biblia PDV" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Biblia: Palabra de Vida</h4>
                            <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium">Versión 1.0.6</p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-[#8B6F47] to-[#5A4D41] dark:from-[#E3C598] dark:to-[#8B6F47] p-8 sm:p-12 rounded-[2.5rem] text-white dark:text-[#111111] shadow-xl relative overflow-hidden group">
                        <div class="absolute -top-10 -right-10 opacity-20 group-hover:scale-110 transition-transform">
                             <svg xmlns="http://www.w3.org/2000/svg" class="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 class="text-2xl sm:text-3xl font-black mb-4 relative z-10">Misión Biblia PDV</h3>
                        <p class="text-base sm:text-lg font-medium opacity-90 leading-relaxed relative z-10">
                            Nuestra misión es utilizar la tecnología para facilitar el acceso a la Palabra de Dios, proporcionando herramientas modernas que enriquezcan tu vida espiritual diaria.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="feature in ['Múltiples versiones', 'Sin publicidad', 'Interfaz moderna', 'Seguimiento de lectura', 'Devocionales diarios']" :key="feature" class="flex items-center gap-3 p-4 rounded-2xl border border-[#E0D5C9] dark:border-[#2E2A25] text-[#3A3026] dark:text-[#F5F0E6]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="font-medium">{{ feature }}</span>
                        </div>
                    </div>

                    <p class="text-center text-[#9B8D82] text-sm pt-8">
                        © {{ new Date().getFullYear() }} Elyon Solutions. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    </Transition>
</template>
