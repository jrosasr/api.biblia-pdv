<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    devotionals: [Array, Object],
});

const devotionalsList = ref(props.devotionals?.data || props.devotionals || []);
const loading = ref(false); 
const isAboutModalOpen = ref(false);
const currentDevotional = computed(() => (devotionalsList.value && devotionalsList.value.length > 0) ? devotionalsList.value[0] : null);
const previousDevotionals = computed(() => (devotionalsList.value && devotionalsList.value.length > 1) ? devotionalsList.value.slice(1, 4) : []);

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

function selectDevotional(devotional) {
    devotionalsList.value = [devotional, ...devotionalsList.value.filter(d => d.id !== devotional.id)];
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
});
</script>

<template>
    <Head :title="currentDevotional ? currentDevotional.title : 'Devocional Diario'" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            :showSearch="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main v-if="currentDevotional" class="max-w-7xl mx-auto px-4 py-12">
            <!-- Main Content -->
            <div class="text-center mb-16">
                <span class="text-[#8B6F47] dark:text-[#E3C598] font-bold tracking-widest uppercase text-sm">
                    {{ new Date(currentDevotional.published_at).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                </span>
                <h2 class="text-4xl md:text-6xl font-black mt-6 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">
                    {{ currentDevotional.title }}
                </h2>
            </div>

            <article class="prose prose-base sm:prose-xl dark:prose-invert max-w-7xl mx-auto bg-white dark:bg-[#1C1C1C] p-8 md:p-16 rounded-[2rem] shadow-xl border border-[#E0D5C9] dark:border-[#2E2A25]">
                <div v-for="block in currentDevotional.content.blocks" :key="block.id" class="mb-8">
                    <h2 v-if="block.type === 'header' && block.data.level === 2" class="text-3xl font-bold mb-6 text-[#8B6F47] dark:text-[#E3C598]" v-html="block.data.text"></h2>
                    <h3 v-else-if="block.type === 'header' && block.data.level === 3" class="text-2xl font-bold mb-4" v-html="block.data.text"></h3>
                    <p v-else-if="block.type === 'paragraph'" class="text-lg md:text-xl leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] mb-6" v-html="block.data.text"></p>
                    <blockquote v-else-if="block.type === 'quote'" class="border-l-8 border-[#8B6F47] pl-8 italic my-12 bg-[#F5EBE0] dark:bg-[#222222] py-8 pr-8 rounded-r-3xl">
                        <p class="text-2xl font-serif text-[#6B5D52] dark:text-[#CFC6B8] mb-4" v-html="block.data.text"></p>
                        <cite v-if="block.data.caption" class="block text-base font-bold text-[#8B6F47]">— {{ block.data.caption }}</cite>
                    </blockquote>
                    <ul v-else-if="block.type === 'list'" class="space-y-4 mb-8">
                        <li v-for="(item, i) in block.data.items" :key="i" class="flex gap-4 items-start">
                            <span class="w-2 h-2 rounded-full bg-[#8B6F47] mt-3 flex-shrink-0"></span>
                            <span class="text-lg md:text-xl" v-html="typeof item === 'string' ? item : item.content"></span>
                        </li>
                    </ul>
                </div>
            </article>

            <!-- Bottom Section: Previous Devotionals -->
            <section class="mt-24">
                <h4 class="text-2xl font-bold mb-10 flex items-center gap-4 px-4 text-[#8B6F47] dark:text-[#E3C598]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Lecturas anteriores
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="prev in previousDevotionals" :key="prev.id" 
                        @click="selectDevotional(prev)"
                        class="bg-white dark:bg-[#1C1C1C] p-8 rounded-[2rem] cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#8B6F47] group shadow-lg"
                    >
                        <span class="text-sm font-bold text-[#9B8D82] dark:text-[#9E9487]">
                            {{ new Date(prev.published_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' }) }}
                        </span>
                        <h5 class="text-2xl font-bold mt-4 line-clamp-2 group-hover:text-[#8B6F47] transition-colors leading-tight">
                            {{ prev.title }}
                        </h5>
                        <div class="mt-6 flex items-center gap-2 text-[#8B6F47] font-bold text-sm">
                            Leer ahora
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <div v-else class="flex flex-col items-center justify-center py-40 gap-6">
            <template v-if="!devotionalsList.length">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#9B8D82]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <div class="text-center">
                    <h3 class="text-xl font-bold text-[#3A3026] dark:text-[#F5F0E6]">No hay devocionales disponibles</h3>
                    <p class="text-[#9B8D82] mt-2 text-sm">Vuelve más tarde para ver nuevas lecturas.</p>
                </div>
                <Link :href="route('home')" class="mt-4 px-6 py-2 bg-[#8B6F47] text-white rounded-full text-sm font-bold">Volver al inicio</Link>
            </template>
            <template v-else>
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]"></div>
                <span class="text-[#9B8D82]">Cargando Palabra de Vida...</span>
            </template>
        </div>

        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>

<style scoped>
.prose :deep(b), .prose :deep(strong) {
    color: var(--primary);
    font-weight: 800;
}
</style>
