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
                        <div class="w-20 h-20 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold text-[#3A3026] dark:text-[#F5F0E6]">Biblia: Palabra de Vida</h4>
                            <p class="text-[#9B8D82]">Versión 1.0.6</p>
                        </div>
                    </div>

                    <div class="bg-[#F5EBE0] dark:bg-[#222222] p-6 rounded-3xl space-y-4">
                        <h5 class="text-xl font-bold text-[#8B6F47] dark:text-[#E3C598]">Nuestra Misión</h5>
                        <p class="text-lg leading-relaxed text-[#6B5D52] dark:text-[#CFC6B8]">
                            Biblia: Palabra de Vida es un proyecto 100% gratuito que ofrece varias versiones de la biblia y 100% sin publicidad.
                        </p>
                        <p class="text-lg leading-relaxed text-[#6B5D52] dark:text-[#CFC6B8]">
                            Nuestro objetivo es facilitar el acceso a las Sagradas Escrituras a través de una interfaz moderna, intuitiva y fácil de usar. Creemos que la palabra de Dios debe estar al alcance de todos, sin distracciones ni barreras económicas.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="feature in ['Múltiples versiones', 'Lectura offline', 'Sin publicidad', 'Interfaz moderna', 'Seguimiento de lectura', 'Devocionales diarios']" :key="feature" class="flex items-center gap-3 p-4 rounded-2xl border border-[#E0D5C9] dark:border-[#2E2A25] text-[#3A3026] dark:text-[#F5F0E6]">
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
