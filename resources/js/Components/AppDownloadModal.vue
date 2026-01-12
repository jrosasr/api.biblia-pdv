<script setup>
defineProps({
    isOpen: Boolean
});

defineEmits(['close', 'openPlayStore']);
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
            <div class="relative w-full max-w-md bg-gradient-to-br from-[#FFF8F0] to-[#F5EBE0] dark:from-[#1C1C1C] dark:to-[#111111] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8B6F47] dark:border-[#E3C598]">
                <!-- Close button -->
                <button 
                    @click="$emit('close')" 
                    class="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 transition-all z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="p-8 text-center">
                    <!-- App Icon -->
                    <div class="mb-6 flex justify-center">
                        <div class="w-24 h-24 bg-gradient-to-br from-[#8B6F47] to-[#6B5D52] dark:from-[#E3C598] dark:to-[#CFC6B8] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                            <img src="/icon.webp" alt="Logo" class="w-24 h-24">
                        </div>
                    </div>

                    <!-- Title -->
                    <h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] mb-3">
                        ¡Lleva la Palabra de Vida contigo!
                    </h3>

                    <!-- Description -->
                    <p class="text-[#6B5D52] dark:text-[#CFC6B8] mb-6 leading-relaxed">
                        Descarga nuestra app y accede a la Biblia, devocionales diarios y mucho más desde tu dispositivo móvil.
                    </p>

                    <!-- Features -->
                    <div class="mb-8 space-y-3 text-left">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Lectura sin conexión</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Devocionales diarios</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Múltiples versiones de la Biblia</span>
                        </div>
                    </div>

                    <!-- Download Button -->
                    <button 
                        @click="$emit('openPlayStore')"
                        class="w-full group relative overflow-hidden"
                    >
                        <img 
                            src="/disponible-en-google-play-badge.webp" 
                            alt="Disponible en Google Play" 
                            class="w-3/4 h-12 max-w-[150px] mx-auto transform group-hover:scale-105 transition-transform duration-300 hover:drop-shadow-2xl"
                        >
                    </button>

                    <!-- Skip text -->
                    <button 
                        @click="$emit('close')"
                        class="mt-4 text-sm text-[#9B8D82] hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-colors underline"
                    >
                        Continuar en la web
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
