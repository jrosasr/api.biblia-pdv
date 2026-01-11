<script setup>
import { Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    isDark: Boolean,
    selectedVersion: {
        type: String,
        default: 'RV1960'
    },
    showVersionSelector: {
        type: Boolean,
        default: true
    },
    showSearch: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits([
    'toggleTheme', 
    'openVersionModal', 
    'openSearchModal', 
    'openAboutModal',
    'navigateToSearchResult'
]);

const isSearchModalOpen = ref(false);
const isMenuModalOpen = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const searchType = ref('search');

watch(isSearchModalOpen, (val) => {
    if (!val) {
        searchResults.value = [];
        searchQuery.value = '';
    }
});

async function handleSearch() {
    if (!searchQuery.value.trim()) return;
    isSearching.value = true;
    try {
        const response = await axios.get('/es/api/bible/search', {
            params: {
                version: props.selectedVersion,
                query: searchQuery.value
            }
        });
        
        searchResults.value = response.data.results;
        searchType.value = response.data.type;

        if (searchType.value === 'reference' && response.data.results.length > 0) {
            navigateToResult(response.data.results[0]);
        }
    } catch (e) {
        console.error("Search failed", e);
    } finally {
        isSearching.value = false;
    }
}

function navigateToResult(result) {
    isSearchModalOpen.value = false;
    
    // Check if we are on the home page (reader)
    if (route().current('home')) {
        emit('navigateToSearchResult', result);
    } else {
        // Redirect to home with parameters
        router.get(route('home'), {
            version: props.selectedVersion,
            book: result.book_id,
            chapter: result.chapter,
            verse: result.verse
        });
    }
}
</script>

<template>
    <header class="sticky top-0 z-30 bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-[#E0D5C9] dark:border-[#2E2A25] px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2 sm:gap-4">
            <button @click="$emit('toggleTheme')" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors">
                <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            
            <div v-if="showVersionSelector" class="flex items-center gap-1 sm:gap-2 cursor-pointer group" @click="$emit('openVersionModal')">
                <span class="font-medium text-[#8B6F47] dark:text-[#E3C598] text-sm sm:text-base">{{ selectedVersion }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4 text-[#8B6F47] dark:text-[#E3C598] transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <button v-if="showSearch" @click="isSearchModalOpen = true" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            <!-- Back to Bible (Mobile/Tablet only, hidden if version selector is shown) -->
            <Link v-if="!showVersionSelector" :href="route('home')" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598] lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </Link>
        </div>

        <div class="flex items-center gap-2">
            <!-- Navigation Modal Button (Mobile/Tablet) -->
            <button @click="isMenuModalOpen = true" class="lg:hidden p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex gap-2 items-center">
                <Link :href="route('home')" class="px-3 py-2 rounded-full text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Inicio</span>
                </Link>
                <!-- Only show "Sobre nosotros" in desktop if not redundant -->
                <button @click="$emit('openAboutModal')" class="px-3 py-2 rounded-full text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Nosotros</span>
                </button>
                <Link :href="route('devotionals.public')" class="px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span class="hidden sm:inline">Devocional diario</span>
                </Link>
                <template v-if="$page.props.auth.user">
                    <Link 
                        :href="route('profile.favorites')" 
                        class="px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5" 
                        title="Mis Favoritos"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span class="hidden lg:inline">Favoritos</span>
                    </Link>
                    
                    <Link 
                        :href="route('user-devotionals.public-index')" 
                        class="px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span class="hidden sm:inline">Diario</span>
                    </Link>
                    
                    <Link 
                        :href="route('profile.public-show')" 
                        class="px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5" 
                        title="Mi Perfil"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="hidden lg:inline">Perfil</span>
                    </Link>
                    
                    <Link 
                        :href="route('logout')" 
                        method="post" 
                        as="button" 
                        class="px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-1.5" 
                        title="Cerrar sesión"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span class="hidden xl:inline">Salir</span>
                    </Link>
                    
                    <Link 
                        v-if="$page.props.auth.user.roles.includes('admin') || $page.props.auth.user.roles.includes('writer')"
                        :href="route('dashboard')" 
                        class="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        Dashboard
                    </Link>
                </template>
                <template v-else>
                    <Link :href="route('login')" class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] shadow-lg shadow-[#8B6F47]/20 dark:shadow-[#000]/20 hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap">
                        <span class="hidden sm:inline">Iniciar Sesión / Registrarse</span>
                        <span class="sm:hidden">Entrar</span>
                    </Link>
                </template>
            </nav>
        </div>

        <!-- Navigation Modal (Centered Mobile Menu) -->
        <Teleport to="body">
            <Transition name="fade-pop">
                <div v-if="isMenuModalOpen" class="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 lg:hidden">
                    <!-- Backdrop -->
                    <div class="fixed inset-0 bg-black/60 backdrop-blur-md" @click="isMenuModalOpen = false"></div>
                    
                    <!-- Modal content card -->
                    <div class="relative w-full max-w-sm bg-[#FFF8F0] dark:bg-[#111111] rounded-[2.5rem] shadow-2xl flex flex-col border border-[#E0D5C9] dark:border-[#2E2A25] overflow-hidden max-h-[82vh] mt-10 sm:mt-0">
                        <!-- Modal Header -->
                        <div class="flex-shrink-0 p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10">
                            <div class="flex items-center gap-3">
                                <img src="/icon.webp" alt="Logo" class="w-16 h-16">
                                <span class="font-black text-xl text-[#3A3026] dark:text-[#F5F0E6]">Biblia: Palabra de Vida</span>
                            </div>
                            <button @click="isMenuModalOpen = false" class="p-2 rounded-full hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 text-[#8B6F47] dark:text-[#E3C598] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="flex-1 overflow-y-auto p-4 space-y-1.5">
                            <!-- Navigation Links -->
                            <Link :href="route('home')" @click="isMenuModalOpen = false" class="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                Inicio
                            </Link>

                            <Link :href="route('devotionals.public')" @click="isMenuModalOpen = false" class="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                Devocional Diario
                            </Link>

                            <template v-if="$page.props.auth.user">
                                <Link :href="route('profile.favorites')" @click="isMenuModalOpen = false" class="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                    <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    Favoritos
                                </Link>

                                <Link :href="route('user-devotionals.public-index')" @click="isMenuModalOpen = false" class="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                    <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    Mi Diario
                                </Link>

                                <Link :href="route('profile.public-show')" @click="isMenuModalOpen = false" class="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                    <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    Mi Perfil
                                </Link>
                            </template>

                            <button @click="$emit('openAboutModal'); isMenuModalOpen = false" class="flex items-center gap-4 w-full text-left px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group">
                                <div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                Nosotros
                            </button>
                        </div>

                        <!-- Footer / Account Actions -->
                        <div class="flex-shrink-0 p-6 border-t border-[#E0D5C9] dark:border-[#2E2A25] bg-white/30 dark:bg-white/5 backdrop-blur-sm">
                            <template v-if="$page.props.auth.user">
                                <div :class="($page.props.auth.user.roles.includes('admin') || $page.props.auth.user.roles.includes('writer')) ? 'grid grid-cols-2 gap-3' : 'block'">
                                    <Link 
                                        v-if="$page.props.auth.user.roles.includes('admin') || $page.props.auth.user.roles.includes('writer')"
                                        :href="route('dashboard')" 
                                        @click="isMenuModalOpen = false" 
                                        class="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span class="text-xs uppercase tracking-widest">Panel</span>
                                    </Link>
                                    <Link 
                                        :href="route('logout')" 
                                        method="post" 
                                        as="button" 
                                        @click="isMenuModalOpen = false"
                                        class="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-red-500/10 dark:bg-red-500/20 text-red-500 font-black group w-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span class="text-xs uppercase tracking-widest">Salir</span>
                                    </Link>
                                </div>
                            </template>
                            <template v-else>
                                <Link 
                                    :href="route('login')" 
                                    @click="isMenuModalOpen = false"
                                    class="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-3xl font-black text-white bg-[#8B6F47] dark:bg-[#E3C598] dark:text-[#111111] shadow-xl shadow-[#8B6F47]/20 dark:shadow-black/20 hover:scale-[1.02] transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Iniciar Sesión
                                </Link>
                            </template>
                            
                            <!-- Google Play Badge -->
                            <div class="mt-6 pt-6 border-t border-[#E0D5C9] dark:border-[#2E2A25]">
                                <p class="text-center text-sm font-bold text-[#3A3026] dark:text-[#F5F0E6] mb-3">Descarga nuestra app</p>
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida" 
                                    target="_blank"
                                    @click="isMenuModalOpen = false"
                                    class="block hover:scale-105 transition-transform duration-300"
                                >
                                    <img 
                                        src="/disponible-en-google-play-badge.webp" 
                                        alt="Disponible en Google Play" 
                                        class="w-auto h-12 max-w-[150px] mx-auto"
                                    >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Shared Search Modal -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="isSearchModalOpen" class="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-0 sm:p-4 mr-[var(--removed-body-scroll-bar-size,0px)]">
                    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isSearchModalOpen = false"></div>
                    <div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] mt-16 sm:mt-0 overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25]">
                        <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25]">
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-2xl font-bold text-[#3A3026] dark:text-[#F5F0E6]">Buscar en la Biblia</h3>
                                <button @click="isSearchModalOpen = false" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598]">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div class="relative">
                                <input 
                                    v-model="searchQuery" 
                                    @keyup.enter="handleSearch"
                                    type="text" 
                                    placeholder="Ej: Juan 3:16 o 'amor'"
                                    class="w-full bg-[#F5EBE0] dark:bg-[#222222] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8B6F47] dark:focus:ring-[#E3C598] transition-all text-[#3A3026] dark:text-[#F5F0E6] placeholder-[#9B8D82]"
                                    autofocus
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B8D82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        
                        <div class="flex-1 overflow-y-auto p-4 space-y-2">
                            <div v-if="isSearching" class="flex flex-col items-center py-10 gap-2">
                                <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]"></div>
                                <span class="text-sm text-[#9B8D82]">Buscando...</span>
                            </div>
                            
                            <template v-else-if="searchResults.length > 0">
                                <div v-for="result in searchResults" :key="result.id" 
                                    @click="navigateToResult(result)"
                                    class="p-4 rounded-2xl hover:bg-[#F5EBE0] dark:hover:bg-[#222222] cursor-pointer transition-all border border-transparent hover:border-[#E0D5C9] dark:hover:border-[#2E2A25]"
                                >
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="font-bold text-[#8B6F47] dark:text-[#E3C598] text-sm">
                                            {{ result.book_name }} {{ result.chapter }}:{{ result.verse }}
                                        </span>
                                    </div>
                                    <p class="text-sm line-clamp-2 text-[#3A3026] dark:text-[#F5F0E6]">
                                        {{ result.text }}
                                    </p>
                                </div>
                            </template>
                            
                            <div v-else-if="searchQuery" class="text-center py-10">
                                <p class="text-[#9B8D82]">No se encontraron resultados para "{{ searchQuery }}"</p>
                            </div>
                            <div v-else class="text-center py-10">
                                <p class="text-[#9B8D82] text-sm italic">Escribe una palabra o referencia bíblica para comenzar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-pop-enter-active, .fade-pop-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-pop-enter-from, .fade-pop-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
}
</style>
