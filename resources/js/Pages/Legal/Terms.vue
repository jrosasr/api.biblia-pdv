<script setup>
import { Head } from '@inertiajs/vue3';
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
    <Head title="Términos y Condiciones" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <header class="mb-16 text-center">
                <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Legal</span>
                <h1 class="text-4xl md:text-6xl font-black mt-4 text-[#3A3026] dark:text-[#F5F0E6]">Términos y Condiciones</h1>
                <div class="w-20 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-8 rounded-full"></div>
            </header>

            <div class="space-y-12 bg-white/50 dark:bg-white/5 p-8 md:p-16 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-md shadow-xl">
                <section class="space-y-4">
                    <h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">1. Aceptación de los Términos</h2>
                    <p class="text-lg leading-relaxed opacity-90">
                        Al acceder y utilizar Biblia PDV, aceptas cumplir con estos términos y todas las leyes aplicables. Esta plataforma está diseñada para la edificación espiritual y el estudio de la Biblia.
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">2. Uso de la Cuenta</h2>
                    <p class="text-lg leading-relaxed opacity-90">
                        Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Te comprometes a no utilizar la plataforma para fines ilícitos o que atenten contra la comunidad.
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">3. Propiedad Intelectual</h2>
                    <p class="text-lg leading-relaxed opacity-90">
                        Los textos bíblicos mostrados pertenecen a sus respectivos traductores y editoriales. El diseño de la plataforma y el contenido de los devocionales (a menos que se indique lo contrario) son propiedad de Biblia PDV.
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">4. Limitación de Responsabilidad</h2>
                    <p class="text-lg leading-relaxed opacity-90">
                        Aunque nos esforzamos por mantener la plataforma disponible las 24 horas, no nos hacemos responsables de interrupciones técnicas ocasionales o pérdida de datos debido a causas externas.
                    </p>
                </section>

                <footer class="pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25]">
                    <p class="text-sm italic opacity-70">Última actualización: 5 de enero de 2026</p>
                </footer>
            </div>
        </main>

        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>
