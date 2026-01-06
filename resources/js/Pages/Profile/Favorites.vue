<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    favorites: Array,
});

const isAboutModalOpen = ref(false);
const isDark = ref(document.documentElement.classList.contains('dark'));

function toggleTheme() {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
});
</script>

<template>
    <Head title="Mis Tesoros Guardados" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans pb-20">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-6xl mx-auto px-4 py-12">
            <header class="text-center mb-16">
                <span class="text-[#8B6F47] dark:text-[#E3C598] font-black tracking-widest uppercase text-xs">Mis Favoritos</span>
                <h1 class="text-4xl md:text-6xl font-black mt-4 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">Tesoros Guardados</h1>
                <p class="text-[#8B6F47] dark:text-[#E3C598] font-bold mt-4 max-w-2xl mx-auto">"Guarda mis mandamientos y vivirás; y mi ley como la niña de tus ojos."</p>
                <div class="w-24 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-10 rounded-full"></div>
            </header>

            <div v-if="favorites.length === 0" class="text-center py-32 bg-white/30 dark:bg-white/5 rounded-[3.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm">
                <div class="w-24 h-24 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Tu tesoro de versículos está vacío</h3>
                <p class="text-[#9B8D82] mt-3 max-w-md mx-auto font-medium">Comienza a guardar los versículos que te inspiran mientras exploras la Biblia.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="fav in favorites" :key="fav.id" class="group bg-white/50 dark:bg-white/5 p-8 md:p-12 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-sm hover:shadow-2xl hover:border-[#8B6F47]/30 transition-all flex flex-col backdrop-blur-sm">
                    <div class="flex justify-between items-start mb-8">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-[#8B6F47] dark:bg-[#E3C598] rounded-full flex items-center justify-center text-white dark:text-[#111111] font-black text-xs shadow-lg">
                                {{ fav.book_name.charAt(0) }}
                            </div>
                            <span class="text-xl font-black text-[#8B6F47] dark:text-[#E3C598]">
                                {{ fav.book_name }} {{ fav.chapter }}:{{ fav.verse }}
                            </span>
                        </div>
                        <span class="px-4 py-1 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598]">
                            {{ fav.version_id }}
                        </span>
                    </div>

                    <p class="text-2xl font-bold leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] flex-1 mb-8">
                        "{{ fav.text }}"
                    </p>

                    <div v-if="fav.note" class="bg-[#FFF8F0] dark:bg-[#1A1A1A] p-6 rounded-2xl border-l-4 border-[#8B6F47] dark:border-[#E3C598] mb-8">
                        <p class="text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-2 opacity-50">Tu Nota</p>
                        <p class="text-[#5A4D41] dark:text-[#D1C7BC] italic font-medium">
                            {{ fav.note }}
                        </p>
                    </div>

                    <div class="flex justify-end pt-6 border-t border-[#E0D5C9] dark:border-[#2E2A25]">
                        <button class="flex items-center gap-2 text-[#9B8D82] hover:text-red-500 font-bold transition-colors text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Quitar de favoritos
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>
