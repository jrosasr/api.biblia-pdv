<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    devotional: Object,
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

const contentBlocks = computed(() => {
    if (typeof props.devotional.content === 'string') {
        try {
            return JSON.parse(props.devotional.content).blocks || [];
        } catch (e) {
            return [];
        }
    }
    return props.devotional.content?.blocks || [];
});
</script>

<template>
    <Head :title="devotional.title" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans pb-20">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            :showSearch="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-4xl mx-auto px-4 py-12">
            <div class="mb-8">
                <Link :href="route('user-devotionals.public-index')" class="flex items-center gap-2 text-[#8B6F47] dark:text-[#E3C598] font-bold hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver a mi diario
                </Link>
            </div>

            <article class="bg-white/50 dark:bg-white/5 rounded-[3rem] p-8 md:p-16 border border-[#E0D5C9] dark:border-[#2E2A25] shadow-xl backdrop-blur-sm">
                <header class="text-center mb-12">
                    <span class="text-[#8B6F47] dark:text-[#E3C598] font-black tracking-widest uppercase text-xs">
                        {{ new Date(devotional.created_at).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </span>
                    <h1 class="text-4xl md:text-6xl font-black mt-6 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">
                        {{ devotional.title }}
                    </h1>
                    <div class="w-24 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-8 rounded-full"></div>
                </header>

                <div class="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
                    <template v-for="(block, index) in contentBlocks" :key="index">
                        <p v-if="block.type === 'paragraph'" v-html="block.data.text" class="mb-6 leading-relaxed text-[#5A4D41] dark:text-[#D1C7BC]"></p>
                        <h2 v-else-if="block.type === 'header'" class="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[#3A3026] dark:text-[#F5F0E6]">
                            {{ block.data.text }}
                        </h2>
                        <ul v-else-if="block.type === 'list'" class="list-disc pl-8 mb-6 space-y-3">
                            <li v-for="(item, i) in block.data.items" :key="i" v-html="item" class="text-[#5A4D41] dark:text-[#D1C7BC]"></li>
                        </ul>
                    </template>
                </div>
            </article>
        </main>

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>
