<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';
import InputError from '@/Components/InputError.vue';

const isAboutModalOpen = ref(false);
const isDark = ref(document.documentElement.classList.contains('dark'));
const submitted = ref(false);

const form = useForm({
    message: '',
});

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

const submit = () => {
    form.post(route('contact.store'), {
        onSuccess: () => {
            submitted.value = true;
            form.reset();
            setTimeout(() => {
                submitted.value = false;
            }, 5000);
        },
    });
};

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
});
</script>

<template>
    <Head title="Contacto" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <header class="mb-20 text-center">
                <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Conéctate</span>
                <h1 class="text-5xl md:text-7xl font-black mt-4 text-[#3A3026] dark:text-[#F5F0E6]">Contáctanos</h1>
                <p class="text-[#8B6F47] dark:text-[#9B8D82] font-bold mt-6 max-w-2xl mx-auto text-lg italic">
                    ¿Tienes dudas, sugerencias o simplemente quieres saludarnos? Estamos aquí para escucharte.
                </p>
                <div class="w-24 h-2 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-10 rounded-full"></div>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <!-- Contact Info -->
                <div class="space-y-12">
                    <div class="bg-white/50 dark:bg-white/5 p-10 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-md">
                        <h2 class="text-3xl font-black mb-8 text-[#8B6F47] dark:text-[#E3C598]">Información de Contacto</h2>
                        <div class="space-y-8">
                            <div class="flex items-start gap-6 group">
                                <div class="w-14 h-14 rounded-2xl bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center text-[#8B6F47] dark:text-[#E3C598] group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-black text-[#3A3026] dark:text-[#F5F0E6] text-lg uppercase tracking-tight">Email</h4>
                                    <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium text-lg">elyon.solutions1@gmail.com</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-6 group">
                                <div class="w-14 h-14 rounded-2xl bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center text-[#8B6F47] dark:text-[#E3C598] group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-black text-[#3A3026] dark:text-[#F5F0E6] text-lg uppercase tracking-tight">Presencia Digital</h4>
                                    <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium text-lg">En todo el mundo de habla hispana.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-[#8B6F47] to-[#5A4D41] dark:from-[#E3C598] dark:to-[#8B6F47] p-12 rounded-[3rem] text-white dark:text-[#111111] shadow-2xl relative overflow-hidden group">
                        <div class="absolute -top-10 -right-10 opacity-20 group-hover:scale-110 transition-transform">
                             <svg xmlns="http://www.w3.org/2000/svg" class="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 class="text-3xl font-black mb-4 relative z-10">Misión Biblia PDV</h3>
                        <p class="text-lg font-medium opacity-90 leading-relaxed relative z-10">
                            Nuestra misión es utilizar la tecnología para facilitar el acceso a la Palabra de Dios, proporcionando herramientas modernas que enriquezcan tu vida espiritual diaria.
                        </p>
                    </div>
                </div>

                <!-- Contact Form / Auth Check -->
                <div class="bg-white/50 dark:bg-white/5 p-10 md:p-16 rounded-[3.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-xl backdrop-blur-md">
                    <div v-if="!$page.props.auth.user" class="h-full flex flex-col items-center justify-center text-center py-10">
                        <div class="w-20 h-20 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center text-[#8B6F47] dark:text-[#E3C598] mb-6 font-black text-3xl">!</div>
                        <h3 class="text-3xl font-black mb-4">Inicia Sesión</h3>
                        <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium mb-8">Para enviarnos un mensaje y que podamos responderte personalmente, por favor inicia sesión en tu cuenta.</p>
                        <Link :href="route('login')" class="px-10 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-3xl shadow-xl hover:scale-105 transition-all">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                    <div v-else-if="submitted" class="h-full flex flex-col items-center justify-center text-center py-10">
                        <div class="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 font-bold text-3xl">✓</div>
                        <h3 class="text-3xl font-black mb-4">¡Gracias por escribirnos!</h3>
                        <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium">Hemos recibido tu mensaje correctamente. Te responderemos lo antes posible.</p>
                    </div>
                    <form v-else @submit.prevent="submit" class="space-y-8">
                        <div class="bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 p-6 rounded-[2rem] border border-[#8B6F47]/10 dark:border-[#E3C598]/10 space-y-2 text-center md:text-left">
                            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B6F47] dark:text-[#E3C598] opacity-70">Identidad de Usuario</span>
                            <div class="flex flex-col">
                                <span class="text-xl font-black text-[#3A3026] dark:text-[#F5F0E6]">{{ $page.props.auth.user.name }}</span>
                                <span class="text-[#8B6F47] dark:text-[#9B8D82] font-bold text-sm">{{ $page.props.auth.user.email }}</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-3">Mensaje</label>
                            <textarea 
                                v-model="form.message"
                                rows="5"
                                class="w-full bg-[#FFF8F0]/50 dark:bg-[#1A1A1A]/50 border-2 border-[#E0D5C9] dark:border-[#2E2A25] rounded-3xl p-5 focus:border-[#8B6F47] dark:focus:border-[#E3C598] focus:ring-0 transition-all text-[#3A3026] dark:text-[#F5F0E6] font-bold resize-none"
                                placeholder="¿Cómo podemos ayudarte?"
                                required
                            ></textarea>
                            <InputError class="mt-2" :message="form.errors.message" />
                        </div>

                        <button 
                            type="submit"
                            :disabled="form.processing"
                            class="w-full py-6 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-3xl shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 active:scale-95 text-xl tracking-tight"
                        >
                            {{ form.processing ? 'Enviando...' : 'Enviar Mensaje' }}
                        </button>
                    </form>
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
