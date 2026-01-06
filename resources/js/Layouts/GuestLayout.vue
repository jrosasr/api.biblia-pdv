<script setup>
import { ref, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

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
    <div class="min-h-screen flex flex-col transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111]">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            :showSearch="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md">
                <div class="bg-surface p-8 shadow-2xl rounded-[2.5rem] border border-border">
                    <slot />
                </div>
            </div>
        </main>

        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>

