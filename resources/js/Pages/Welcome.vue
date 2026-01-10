<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

const props = defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    versions: Array,
    books: Array,
    initialChapters: Array,
    initialVerses: Array,
    initialVersion: String,
    initialBook: Number,
    initialChapter: Number,
});

// State derived from props
const selectedVersion = computed(() => props.initialVersion);
const selectedBook = computed(() => props.books.find(b => b.id === props.initialBook) || props.books[0]);
const selectedChapter = computed(() => props.initialChapter);
const verses = computed(() => props.initialVerses);
const booksList = computed(() => props.books);
const chaptersList = computed(() => props.initialChapters);

// Modal state
const expandedBookId = ref(null);
const expandedBookChapters = ref([]);

const isLoading = ref(false);
const isBookModalOpen = ref(false);
const isVersionModalOpen = ref(false);
const testamentFilter = ref(1);
const isAboutModalOpen = ref(false);
const selectedVerses = ref([]);
const isNoteModalOpen = ref(false);
const isAppDownloadModalOpen = ref(false);

const noteForm = useForm({
    note: '',
});

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

// Navigation Helpers (Inertia)
const visit = (params) => {
    isLoading.value = true;
    router.get(route('home'), params, {
        preserveScroll: true,
        preserveState: true,
        only: ['books', 'initialChapters', 'initialVerses', 'initialVersion', 'initialBook', 'initialChapter'],
        onFinish: () => { isLoading.value = false; isBookModalOpen.value = false; isVersionModalOpen.value = false; }
    });
};

function handleVersionChange(version) {
    visit({ 
        version: version,
        book: selectedBook.value.id,
        chapter: 1 
    });
}

// Just expands the book in the modal, does not navigate
async function expandBook(book) {
    if (expandedBookId.value === book.id) {
        expandedBookId.value = null;
        return;
    }
    expandedBookId.value = book.id;
    expandedBookChapters.value = []; 
    // Fetch chapters for this book to show in modal
    try {
        const response = await axios.get(`/es/api/bible/chapters/${selectedVersion.value}/${book.id}`);
        expandedBookChapters.value = response.data;
    } catch (e) {
        console.error("Failed to fetch chapters for modal", e);
    }
}

// Navigates to a specific chapter of a specific book
function navigateToChapter(bookId, chapter) {
    visit({ 
        version: selectedVersion.value,
        book: bookId,
        chapter: chapter
    });
}

function selectChapter(chapter) {
    navigateToChapter(selectedBook.value.id, chapter);
}

function navigateToSearchResult(result) {
    visit({
        version: selectedVersion.value,
        book: result.book_id,
        chapter: result.chapter,
        verse: result.verse
    });
}

function prevChapter() {
    if (selectedChapter.value > 1) {
        selectChapter(selectedChapter.value - 1);
    } else {
        const prevBookIndex = booksList.value.findIndex(b => b.id === selectedBook.value.id) - 1;
        if (prevBookIndex >= 0) {
            const prevBook = booksList.value[prevBookIndex];
            visit({
                version: selectedVersion.value,
                book: prevBook.id,
                chapter: 1
            });
        }
    }
}

function nextChapter() {
    const maxChapter = chaptersList.value[chaptersList.value.length - 1]; 
    if (selectedChapter.value < maxChapter) {
        selectChapter(selectedChapter.value + 1);
    } else {
        const nextBookIndex = booksList.value.findIndex(b => b.id === selectedBook.value.id) + 1;
        if (nextBookIndex < booksList.value.length) {
            visit({
                version: selectedVersion.value,
                book: booksList.value[nextBookIndex].id,
                chapter: 1
            });
        }
    }
}

const filteredBooks = computed(() => {
    return booksList.value.filter(b => {
        if (testamentFilter.value === 1) {
            // Old Testament
            return b.testament_id === 1 || b.id <= 39;
        } else {
            // New Testament
            return b.testament_id === 2 || b.id >= 40;
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

const isCopied = ref(false);

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
        },
        onError: (errors) => {
            console.error(errors);
        }
    });
}

function copyVerses() {
    if (selectedVerses.value.length === 0) return;

    // Ordenar por número de versículo
    const sortedVerses = [...selectedVerses.value].sort((a, b) => a.verse - b.verse);

    const versesText = sortedVerses.map(v => `${v.verse}. ${v.text}`).join('\n');
    const verseNumbers = sortedVerses.map(v => v.verse).join(', ');
    
    // Construir la referencia y el mensaje final
    const reference = `${selectedBook.value.name} ${selectedChapter.value}:${verseNumbers}`;
    
    // Create params for the URL
    const params = new URLSearchParams({
        version: selectedVersion.value,
        book: selectedBook.value.id,
        chapter: selectedChapter.value
    });

    const url = `https://biblia-palabradevida.com/es?${params.toString()}`;
    
    const finalContent = `${reference}\n${versesText}\n\nCompartido desde ${url}`;

    navigator.clipboard.writeText(finalContent).then(() => {
        isCopied.value = true;
        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
    
    // Initialize modal state to current book
    expandedBookId.value = props.initialBook;
    expandedBookChapters.value = props.initialChapters;

    const urlParams = new URLSearchParams(window.location.search);
    const verse = urlParams.get('verse');
    if (verse) {
        setTimeout(() => {
            const element = document.getElementById(`verse-${verse}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.classList.add('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10');
                setTimeout(() => element.classList.remove('bg-[#8B6F47]/10', 'dark:bg-[#E3C598]/10'), 3000);
            }
        }, 800);
    }

    // Check if app download modal has been shown
    const hasSeenAppModal = localStorage.getItem('hasSeenAppDownloadModal');
    if (!hasSeenAppModal) {
        setTimeout(() => {
            isAppDownloadModalOpen.value = true;
        }, 3000); // Show after 3 seconds
    }
});

function closeAppDownloadModal() {
    isAppDownloadModalOpen.value = false;
    localStorage.setItem('hasSeenAppDownloadModal', 'true');
}

function openPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida', '_blank');
    closeAppDownloadModal();
}
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
                        
                        <button @click="copyVerses" class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                            <svg v-if="!isCopied" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span :class="{'text-green-400': isCopied}">{{ isCopied ? 'Copiado' : 'Copiar' }}</span>
                        </button>
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
                            <button @click="expandBook(book)" 
                                :class="expandedBookId === book.id ? 'bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 border-[#8B6F47] dark:border-[#E3C598]' : 'border-transparent hover:bg-[#F5EBE0] dark:hover:bg-[#222222]'"
                                class="w-full text-left p-4 rounded-2xl border transition-all group"
                            >
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-lg" :class="expandedBookId === book.id ? 'text-[#8B6F47] dark:text-[#E3C598]' : ''">{{ book.name }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                         class="w-5 h-5 transition-transform text-[#8B6F47] dark:text-[#E3C598]" 
                                         :class="expandedBookId === book.id ? 'rotate-180 opacity-100' : 'opacity-0 group-hover:opacity-100'"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            
                            <!-- Chapter mini-grid if book is expanded -->
                            <div v-if="expandedBookId === book.id" class="grid grid-cols-5 sm:grid-cols-8 gap-2 px-1 pb-4">
                                <button v-for="ch in expandedBookChapters" :key="ch" 
                                    @click="navigateToChapter(book.id, ch)"
                                    :class="(selectedBook.id === book.id && selectedChapter === ch) ? 'bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]' : 'bg-[#F5EBE0] dark:bg-[#222222] hover:bg-[#8B6F47]/20 dark:hover:bg-[#E3C598]/20'"
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

        <!-- App Download Modal -->
        <Transition name="fade">
            <div v-if="isAppDownloadModalOpen" class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeAppDownloadModal"></div>
                <div class="relative w-full max-w-md bg-gradient-to-br from-[#FFF8F0] to-[#F5EBE0] dark:from-[#1C1C1C] dark:to-[#111111] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8B6F47] dark:border-[#E3C598]">
                    <!-- Close button -->
                    <button 
                        @click="closeAppDownloadModal" 
                        class="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 transition-all z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="p-8 text-center">
                        <!-- App Icon -->
                        <div class="mb-6 flex justify-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-[#8B6F47] to-[#6B5D52] dark:from-[#E3C598] dark:to-[#CFC6B8] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                                <img src="/icon.webp" alt="Logo" class="w-36 h-36">
                            </div>
                        </div>

                        <!-- Title -->
                        <h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] mb-3">
                            ¡Lleva la Palabra de Vida contigo!
                        </h3>

                        <!-- Description -->
                        <p class="text-[#6B5D52] dark:text-[#CFC6B8] mb-6 leading-relaxed">
                            Descarga nuestra app y accede a la Biblia, devocionales diarios y mucho más desde tu dispositivo móvil.
                        </p>

                        <!-- Features -->
                        <div class="mb-8 space-y-3 text-left">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Lectura sin conexión</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Devocionales diarios</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Múltiples versiones de la Biblia</span>
                            </div>
                        </div>

                        <!-- Download Button -->
                        <button 
                            @click="openPlayStore"
                            class="w-full group relative overflow-hidden"
                        >
                            <img 
                                src="/disponible-en-google-play-badge.webp" 
                                alt="Disponible en Google Play" 
                                class="w-3/4 h-20 max-w-[150px] mx-auto transform group-hover:scale-105 transition-transform duration-300 hover:drop-shadow-2xl"
                            >
                        </button>

                        <!-- Skip text -->
                        <button 
                            @click="closeAppDownloadModal"
                            class="mt-4 text-sm text-[#9B8D82] hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-colors underline"
                        >
                            Continuar en la web
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
