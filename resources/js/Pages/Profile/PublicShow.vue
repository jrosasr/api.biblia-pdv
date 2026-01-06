<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    userDetail: Object,
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

const formatDate = (dateString, long = false) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    const options = long 
        ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        : { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    return new Intl.DateTimeFormat('es-ES', options).format(date);
};

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
});
</script>

<template>
    <Head title="Mi Perfil Espiritual" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-5xl mx-auto px-4 py-12">
            <!-- Hero Profile Section -->
            <div class="relative bg-white/50 dark:bg-white/5 rounded-[3.5rem] p-8 md:p-16 border border-[#E0D5C9] dark:border-[#2E2A25] shadow-xl backdrop-blur-md overflow-hidden mb-12">
                <div class="absolute top-0 right-0 p-12 opacity-10 dark:opacity-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-64 h-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                
                <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div class="w-32 h-32 md:w-48 md:h-48 bg-[#8B6F47] dark:bg-[#E3C598] rounded-full flex items-center justify-center text-5xl md:text-7xl font-black text-white dark:text-[#111111] shadow-2xl">
                        {{ userDetail.name.charAt(0) }}
                    </div>
                    <div class="text-center md:text-left">
                        <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Perfil del Lector</span>
                        <h1 class="text-4xl md:text-6xl font-black mt-2 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">
                            {{ userDetail.name }}
                        </h1>
                        <p class="text-[#8B6F47] dark:text-[#E3C598] font-bold mt-2 opacity-80 italic">"Lámpara es a mis pies tu palabra..."</p>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 relative z-10">
                    <div class="bg-[#FFF8F0] dark:bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] text-center group hover:scale-105 transition-all">
                        <p class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-[10px] mb-2">Racha Actual</p>
                        <p class="text-4xl font-black text-[#3A3026] dark:text-[#F5F0E6] flex items-center justify-center gap-2">
                           {{ userDetail.reading_streak?.current_streak || 0 }}
                           <span class="text-2xl">🔥</span>
                        </p>
                    </div>
                    <div class="bg-[#FFF8F0] dark:bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] text-center group hover:scale-105 transition-all">
                        <p class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-[10px] mb-2">Favoritos</p>
                        <p class="text-4xl font-black text-[#3A3026] dark:text-[#F5F0E6] flex items-center justify-center gap-2">
                           {{ userDetail.favorites.length }}
                           <span class="text-2xl">⭐</span>
                        </p>
                    </div>
                    <div class="bg-[#FFF8F0] dark:bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] text-center group hover:scale-105 transition-all">
                        <p class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-[10px] mb-2">Mejor Racha</p>
                        <p class="text-4xl font-black text-[#3A3026] dark:text-[#F5F0E6] flex items-center justify-center gap-2">
                           {{ userDetail.reading_streak?.longest_streak || 0 }}
                           <span class="text-2xl">🏆</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Reading Progress -->
                <section>
                    <div class="flex items-center gap-4 mb-8 pl-4">
                        <div class="w-12 h-12 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center text-[#8B6F47] dark:text-[#E3C598]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Progreso de Lectura</h2>
                    </div>

                    <div class="bg-white/30 dark:bg-white/5 rounded-[2.5rem] p-8 border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm min-h-[300px]">
                        <div v-if="userDetail.bible_chapter_readings.length === 0" class="text-center py-12">
                            <p class="text-[#9B8D82] italic">Aún no has comenzado tu viaje de lectura.</p>
                        </div>
                        <div v-else class="flex flex-wrap gap-3">
                            <div v-for="reading in userDetail.bible_chapter_readings" :key="reading.id" class="px-5 py-3 bg-[#FFF8F0] dark:bg-[#1A1A1A] border border-[#E0D5C9] dark:border-[#2E2A25] rounded-2xl shadow-sm group hover:border-[#8B6F47] transition-all">
                                <span class="text-sm font-black text-[#5A4D41] dark:text-[#D1C7BC] group-hover:text-[#8B6F47] dark:group-hover:text-[#E3C598]">
                                    {{ reading.book_name }} {{ reading.chapter_number }}
                                </span>
                                <span class="block text-[10px] font-black uppercase tracking-tighter text-[#8B6F47] dark:text-[#E3C598] opacity-50">{{ reading.version_id }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Activity Log -->
                <section>
                    <div class="flex items-center gap-4 mb-8 pl-4">
                        <div class="w-12 h-12 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center text-[#8B6F47] dark:text-[#E3C598]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Actividad Reciente</h2>
                    </div>

                    <div class="bg-white/30 dark:bg-white/5 rounded-[2.5rem] p-8 border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm min-h-[300px]">
                        <ul class="space-y-6">
                            <li v-for="log in userDetail.reading_logs" :key="log.id" class="flex items-center gap-6 group">
                                <div class="w-3 h-3 bg-[#8B6F47] dark:bg-[#E3C598] rounded-full group-hover:scale-150 transition-all shadow-lg shadow-[#8B6F47]/20"></div>
                                <div>
                                    <p class="text-lg font-black text-[#3A3026] dark:text-[#F5F0E6]">{{ formatDate(log.read_date, true) }}</p>
                                    <p class="text-xs text-[#8B6F47] dark:text-[#E3C598] font-bold uppercase tracking-widest mt-1 opacity-70">Lectura completada</p>
                                </div>
                            </li>
                            <li v-if="userDetail.reading_logs.length === 0" class="text-center py-12">
                                <p class="text-[#9B8D82] italic">Sin actividad registrada recientemente.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>

        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>
