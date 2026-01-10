<script setup>
import { Link } from '@inertiajs/vue3';

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-[#FFF8F0] dark:bg-[#111111] border-t border-[#E0D5C9] dark:border-[#2E2A25] transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <!-- Brand Section -->
                <div class="col-span-1 md:col-span-2 space-y-6">
                    <Link :href="route('home')" class="flex items-center gap-3 group">
                        <div class="w-32 h-32 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25]">
                            <img src="/icon.webp" alt="Biblia PDV" class="w-full h-full object-cover" />
                        </div>
                        <span class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] tracking-tight">Biblia: Palabra de Vida</span>
                    </Link>
                    <p class="text-[#8B6F47] dark:text-[#9B8D82] text-lg leading-relaxed max-w-md">
                        Una experiencia digital diseñada para profundizar en la Palabra de Vida. Encuentra devocionales diarios y mantén tu propio diario espiritual.
                    </p>
                    <!-- <div class="flex gap-4">
                        <a href="#" class="p-3 rounded-xl bg-white dark:bg-white/5 text-[#8B6F47] dark:text-[#E3C598] shadow-sm hover:scale-110 transition-transform border border-[#E0D5C9]/50 dark:border-[#2E2A25]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <a href="#" class="p-3 rounded-xl bg-white dark:bg-white/5 text-[#8B6F47] dark:text-[#E3C598] shadow-sm hover:scale-110 transition-transform border border-[#E0D5C9]/50 dark:border-[#2E2A25]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                    </div> -->
                </div>

                <!-- Navigation Links -->
                <div class="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
                    <div class="space-y-6">
                        <h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black uppercase tracking-widest text-sm">Explora</h4>
                        <nav class="flex flex-col gap-4">
                            <Link :href="route('home')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Inicio</Link>
                            <Link :href="route('devotionals.public')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Devocional Diario</Link>
                            <button @click="$emit('openAboutModal')" class="text-left text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Nosotros</button>
                        </nav>
                    </div>
                    <div class="space-y-6">
                        <h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black uppercase tracking-widest text-sm">Cuenta</h4>
                        <nav class="flex flex-col gap-4">
                            <template v-if="!$page.props.auth.user">
                                <Link :href="route('login')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Iniciar Sesión</Link>
                                <Link :href="route('register')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Registrarse</Link>
                            </template>
                            <template v-else>
                                <Link :href="route('dashboard')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Panel de Control</Link>
                                <Link :href="route('profile.public-show')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Mi Perfil</Link>
                            </template>
                        </nav>
                    </div>
                </div>
            </div>


            <!-- Google Play Badge Section -->
            <div class="mt-12 pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col items-left gap-4">
                <h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black text-lg">Descarga nuestra app</h4>
                <a 
                    href="https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida" 
                    target="_blank"
                    class="block hover:scale-105 transition-transform duration-300 hover:drop-shadow-2xl"
                >
                    <img 
                        src="/disponible-en-google-play-badge.webp" 
                        alt="Disponible en Google Play" 
                        class="h-14 w-auto"
                    >
                </a>
            </div>

            <!-- Bottom Section -->
            <div class="mt-12 pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium text-center md:text-left">
                    © {{ currentYear }} <span class="text-[#3A3026] dark:text-[#F5F0E6] font-black">Biblia PDV</span>. Todos los derechos reservados.
                </p>
                <div class="flex gap-8">
                    <Link :href="route('privacy')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors">Privacidad</Link>
                    <Link :href="route('terms')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors">Términos y Condiciones</Link>
                    <Link :href="route('contact')" class="text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors">Contacto</Link>
                </div>
            </div>
        </div>
    </footer>
</template>
