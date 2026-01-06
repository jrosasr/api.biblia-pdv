<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
    versions: Array, // Keep this as it's used in the script
    books: Array,
    initialVerses: Array, // Keep this as it's used in the script
    initialVersion: String, // Keep this as it's used in the script
    initialBook: Number, // Keep this as it's used in the script
    initialChapter: Number, // Keep this as it's used in the script
});

// State
const selectedVersion = ref(props.initialVersion);
const selectedBook = ref(props.books.find(b => b.id === props.initialBook) || props.books[0]);
const selectedChapter = ref(props.initialChapter);
const verses = ref(props.initialVerses);
const booksList = ref(props.books);
const chaptersList = ref([]);
const isLoading = ref(false);
const isBookModalOpen = ref(false);
const isVersionModalOpen = ref(false);
const testamentFilter = ref(1); // 1: Old, 2: New
// Search is now handled by BibleHeader
// We only need to handle the navigation when a result is selected
const isAboutModalOpen = ref(false);
const selectedVerses = ref([]);
const isNoteModalOpen = ref(false);

const noteForm = useForm({
    note: '',
});

// watch removed

const isDark = ref(document.documentElement.classList.contains('dark'));

// Theme toggle
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


// Data loading
async function fetchChapters() {
    if (!selectedBook.value) return;
    const response = await axios.get(`/api/bible/chapters/${selectedVersion.value}/${selectedBook.value.id}`);
    chaptersList.value = response.data;
}

async function fetchVerses() {
    isLoading.value = true;
    try {
        const response = await axios.get(`/api/bible/verses/${selectedVersion.value}/${selectedBook.value.id}/${selectedChapter.value}`);
        verses.value = response.data;
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
        isLoading.value = false;
    }
}

async function handleVersionChange(version) {
    selectedVersion.value = version;
    isVersionModalOpen.value = false;
    isLoading.value = true;
    try {
        const response = await axios.get(`/api/bible/books/${version}`);
        booksList.value = response.data;
        // Keep same book if it exists in new version, else reset to Genesis
        const newBook = booksList.value.find(b => b.name === selectedBook.value.name) || booksList.value[0];
        selectedBook.value = newBook;
        await fetchChapters();
        selectedChapter.value = 1;
        await fetchVerses();
    } finally {
        isLoading.value = false;
    }
}

async function selectBook(book) {
    if (selectedBook.value?.id === book.id) return;
    selectedBook.value = book;
    await fetchChapters();
}

async function selectChapter(chapter) {
    selectedChapter.value = chapter;
    isBookModalOpen.value = false;
    await fetchVerses();
}

// handleSearch removed

async function navigateToSearchResult(result) {
    isLoading.value = true;
    try {
        // Update selected book and chapter
        const book = booksList.value.find(b => b.id === result.book_id);
        if (book) {
            selectedBook.value = book;
            await fetchChapters();
            selectedChapter.value = result.chapter;
            await fetchVerses();
            
            // Highlight the specific verse if it was part of a reference
            setTimeout(() => {
                const element = document.getElementById(`verse-${result.verse}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10');
                    setTimeout(() => {
                        element.classList.remove('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10');
                    }, 3000);
                }
            }, 500);
        }
    } finally {
        isLoading.value = false;
    }
}


async function prevChapter() {
    if (selectedChapter.value > 1) {
        selectedChapter.value--;
        await fetchVerses();
    } else {
        // Go to prev book last chapter
        const prevBookIndex = booksList.value.findIndex(b => b.id === selectedBook.value.id) - 1;
        if (prevBookIndex >= 0) {
            selectedBook.value = booksList.value[prevBookIndex];
            await fetchChapters();
            selectedChapter.value = chaptersList.value[chaptersList.value.length - 1];
            await fetchVerses();
        }
    }
}

async function nextChapter() {
    if (selectedChapter.value < chaptersList.value[chaptersList.value.length - 1]) {
        selectedChapter.value++;
        await fetchVerses();
    } else {
        // Go to next book chapter 1
        const nextBookIndex = booksList.value.findIndex(b => b.id === selectedBook.value.id) + 1;
        if (nextBookIndex < booksList.value.length) {
            selectedBook.value = booksList.value[nextBookIndex];
            await fetchChapters();
            selectedChapter.value = 1;
            await fetchVerses();
        }
    }
}

const filteredBooks = computed(() => {
    return booksList.value.filter(b => {
        if (testamentFilter.value === 1) {
            // Old Testament
            return b.testament_id === 1 && b.id <= 39;
        } else {
            // New Testament
            return b.testament_id === 2 || (b.testament_id === 1 && b.id >= 40);
        }
    });
});



function toggleSelection(verse) {
    const index = selectedVerses.value.findIndex(v => v.id === verse.id);
    if (index === -1) {
        selectedVerses.value.push(verse);
    } else {
        selectedVerses.value.splice(index, 1);
    }
}

function openNoteModal() {
    if (selectedVerses.value.length === 0) return;
    noteForm.reset();
    isNoteModalOpen.value = true;
}

function saveFavorites() {
    const favorites = selectedVerses.value.map(verse => ({
        id: `${selectedVersion.value}-${selectedBook.value.id}-${selectedChapter.value}-${verse.verse}`,
        versionId: selectedVersion.value,
        bookNumber: selectedBook.value.id,
        bookName: selectedBook.value.name,
        chapter: selectedChapter.value,
        verse: verse.verse,
        text: verse.text,
        note: noteForm.note,
    }));

    noteForm.transform((data) => ({
        favorites: favorites
    })).post(route('favorites.store'), {
        onSuccess: () => {
            selectedVerses.value = [];
            isNoteModalOpen.value = false;
            // Optionally show success toast
        },
        onError: (errors) => {
            console.error(errors);
        }
    });
}

onMounted(async () => {
    if (isDark.value) document.documentElement.classList.add('dark');
    await fetchChapters();
    
    // Handle initial navigation if params exist
    const urlParams = new URLSearchParams(window.location.search);
    const verse = urlParams.get('verse');
    if (verse) {
        setTimeout(() => {
            const element = document.getElementById(`verse-${verse}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.classList.add('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10');
                setTimeout(() => {
                    element.classList.remove('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10');
                }, 3000);
            }
        }, 800);
    }
});
</script>

<template>
    <Head title="Biblia - Palabra de Vida" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        
        <BibleHeader 
            :isDark="isDark"
            :selectedVersion="selectedVersion"
            @toggleTheme="toggleTheme"
            @openVersionModal="isVersionModalOpen = true"
            @openAboutModal="isAboutModalOpen = true"
            @navigateToSearchResult="navigateToSearchResult"
        />

        <!-- Main Content -->
        <main class="max-w-4xl mx-auto px-4 py-8 relative">
            
            <!-- Book & Chapter Selector Trigger -->
            <div class="flex flex-col items-center mb-8">
                <div @click="isBookModalOpen = true" class="text-center cursor-pointer group">
                    <h2 class="text-[#6B5D52] dark:text-[#CFC6B8] text-lg font-medium">{{ selectedBook?.name }}</h2>
                    <h1 class="text-3xl font-bold text-[#3A3026] dark:text-[#F5F0E6] flex items-center gap-2">
                        Capítulo {{ selectedChapter }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598] group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </h1>
                </div>
                
                <div class="mt-4 flex gap-4">
                    <button @click="prevChapter" class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button @click="nextChapter" class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Verses List -->
            <div class="space-y-8 leading-relaxed mb-20">
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-4">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]"></div>
                    <span class="text-[#9B8D82] animate-pulse">Cargando Palabra de Vida...</span>
                </div>
                <template v-else>
                    <div 
                        v-for="v in verses" 
                        :key="v.id" 
                        :id="`verse-${v.verse}`" 
                        @click="toggleSelection(v)"
                        :class="[
                            'group flex gap-5 items-start p-3 rounded-xl transition-all duration-300 cursor-pointer select-none',
                            selectedVerses.find(sel => sel.id === v.id) 
                                ? 'bg-[#8B6F47]/20 dark:bg-[#E3C598]/20 translate-x-2' 
                                : 'hover:bg-[#8B6F47]/5 dark:hover:bg-[#E3C598]/5'
                        ]"
                    >
                        <span 
                            class="font-bold text-xs mt-2.5 min-w-[1.5rem] tracking-tighter transition-colors"
                            :class="selectedVerses.find(sel => sel.id === v.id) ? 'text-[#8B6F47] dark:text-[#E3C598] opacity-100' : 'text-[#8B6F47] dark:text-[#E3C598] opacity-60'"
                        >{{ v.verse }}</span>
                        <p 
                            class="text-xl md:text-2xl transition-colors duration-200"
                            :class="selectedVerses.find(sel => sel.id === v.id) ? 'text-[#3A3026] dark:text-[#F5F0E6] font-medium' : 'text-[#3A3026] dark:text-[#F5F0E6] group-hover:text-black dark:group-hover:text-white'"
                        >
                            {{ v.text }}
                        </p>
                    </div>
                </template>
            </div>

            <!-- Floating Action Bar for Selection -->
            <Transition name="fade">
                <div v-if="selectedVerses.length > 0" class="fixed bottom-8 left-0 right-0 z-40 px-4 flex justify-center">
                    <div class="bg-[#3A3026] dark:bg-[#E3C598] text-[#F5F0E6] dark:text-[#3A3026] rounded-full shadow-2xl px-6 py-3 flex items-center gap-6">
                        <span class="font-bold text-sm">{{ selectedVerses.length }} seleccionado{{ selectedVerses.length > 1 ? 's' : '' }}</span>
                        <div class="h-6 w-px bg-white/20 dark:bg-black/20"></div>
                        <button @click="openNoteModal" class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Favorito <span class="hidden sm:inline">& Nota</span>
                        </button>
                        <button @click="selectedVerses = []" class="p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>


            <!-- Bottom Navigation -->
            <div class="mt-16 flex justify-between border-t border-[#E0D5C9] dark:border-[#2E2A25] pt-10 pb-20">
                <button @click="prevChapter" class="text-left group">
                    <span class="text-sm text-[#9B8D82] dark:text-[#9E9487]">Anterior</span>
                    <div class="flex items-center gap-2 group-hover:-translate-x-1 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span class="text-lg font-bold">Capítulo {{ selectedChapter > 1 ? selectedChapter - 1 : 'Previo' }}</span>
                    </div>
                </button>

                <button @click="nextChapter" class="text-right group">
                    <span class="text-sm text-[#9B8D82] dark:text-[#9E9487]">Siguiente</span>
                    <div class="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <span class="text-lg font-bold">Capítulo {{ (selectedChapter < chaptersList[chaptersList.length-1]) ? selectedChapter + 1 : 'Siguiente' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>
        </main>

        <!-- Book Selection Modal -->
        <Transition name="fade">
            <div v-if="isBookModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isBookModalOpen = false"></div>
                <div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
                    <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25]">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold">Seleccionar Libro</h3>
                            <button @click="isBookModalOpen = false" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div class="flex gap-2 bg-[#F5EBE0] dark:bg-[#222222] p-1 rounded-xl">
                            <button 
                                @click="testamentFilter = 1" 
                                :class="testamentFilter === 1 ? 'bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]' : 'text-[#9B8D82]'"
                                class="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
                            >Antiguo Testamento</button>
                            <button 
                                @click="testamentFilter = 2" 
                                :class="testamentFilter === 2 ? 'bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]' : 'text-[#9B8D82]'"
                                class="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
                            >Nuevo Testamento</button>
                        </div>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="book in filteredBooks" :key="book.id" class="space-y-4">
                            <button @click="selectBook(book)" 
                                :class="selectedBook?.id === book.id ? 'bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 border-[#8B6F47] dark:border-[#E3C598]' : 'border-transparent hover:bg-[#F5EBE0] dark:hover:bg-[#222222]'"
                                class="w-full text-left p-4 rounded-2xl border transition-all group"
                            >
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-lg" :class="selectedBook?.id === book.id ? 'text-[#8B6F47] dark:text-[#E3C598]' : ''">{{ book.name }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                            
                            <!-- Chapter mini-grid if book is selected -->
                            <div v-if="selectedBook?.id === book.id" class="grid grid-cols-5 sm:grid-cols-8 gap-2 px-1 pb-4">
                                <button v-for="ch in chaptersList" :key="ch" 
                                    @click="selectChapter(ch)"
                                    :class="selectedChapter === ch ? 'bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]' : 'bg-[#F5EBE0] dark:bg-[#222222] hover:bg-[#8B6F47]/20 dark:hover:bg-[#E3C598]/20'"
                                    class="h-10 rounded-lg text-sm font-bold transition-all"
                                >{{ ch }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Version Selection Modal -->
        <Transition name="fade">
            <div v-if="isVersionModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isVersionModalOpen = false"></div>
                <div class="relative w-full max-w-md bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
                    <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center">
                        <h3 class="text-xl font-bold">Versión de la Biblia</h3>
                        <button @click="isVersionModalOpen = false" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                        <button v-for="v in versions" :key="v" 
                            @click="handleVersionChange(v)"
                            :class="selectedVersion === v ? 'bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]' : 'hover:bg-[#F5EBE0] dark:hover:bg-[#222222]'"
                            class="w-full text-left px-5 py-4 rounded-2xl font-bold text-lg transition-all"
                        >{{ v }}</button>
                    </div>
                </div>
            </div>
        </Transition>
        
        <!-- Search Modal removed -->

        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />

        <!-- Note Modal -->
        <Transition name="fade">
            <div v-if="isNoteModalOpen" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isNoteModalOpen = false"></div>
                <div class="relative w-full max-w-lg bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                    <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#F5EBE0] dark:bg-[#222222]">
                        <h3 class="text-xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Guardar Favorito</h3>
                        <button @click="isNoteModalOpen = false" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#3A3026] dark:text-[#F5F0E6]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div class="p-6 space-y-4">
                        <div class="bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 p-4 rounded-xl border border-[#8B6F47]/10 dark:border-[#E3C598]/10 max-h-32 overflow-y-auto">
                            <p class="text-sm text-[#8B6F47] dark:text-[#E3C598] font-bold mb-2">Versículos seleccionados:</p>
                            <div v-for="v in selectedVerses" :key="v.id" class="flex gap-2 text-[#3A3026] dark:text-[#F5F0E6] text-sm mb-1">
                                <span class="font-black">{{ v.verse }}:</span>
                                <span class="truncate">{{ v.text }}</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-2">Nota Personal (Opcional)</label>
                            <textarea 
                                v-model="noteForm.note"
                                rows="4"
                                class="w-full bg-white dark:bg-[#111111] border-2 border-[#E0D5C9] dark:border-[#2E2A25] rounded-2xl p-4 focus:border-[#8B6F47] dark:focus:border-[#E3C598] focus:ring-0 transition-all text-[#3A3026] dark:text-[#F5F0E6] font-medium resize-none"
                                placeholder="Escribe una reflexión sobre estos versículos..."
                            ></textarea>
                        </div>

                        <button 
                            @click="saveFavorites"
                            :disabled="noteForm.processing"
                            class="w-full py-4 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-2xl hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {{ noteForm.processing ? 'Guardando...' : 'Guardar en Favoritos' }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: #E0D5C9;
    border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
    background: #2E2A25;
}

body {
    -webkit-tap-highlight-color: transparent;
}
</style>
