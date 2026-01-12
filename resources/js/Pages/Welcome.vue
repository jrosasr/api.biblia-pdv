<script setup>
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Layout & UI Components
import BibleHeader from '@/Components/BibleHeader.vue';
import BibleFooter from '@/Components/BibleFooter.vue';
import AboutModal from '@/Components/AboutModal.vue';

// Refactored Components
import BibleBreadcrumbs from '@/Components/BibleBreadcrumbs.vue';
import BibleChapterHeader from '@/Components/BibleChapterHeader.vue';
import BibleVerseList from '@/Components/BibleVerseList.vue';
import BibleSelectionBar from '@/Components/BibleSelectionBar.vue';
import BookSelectionModal from '@/Components/BookSelectionModal.vue';
import VersionSelectionModal from '@/Components/VersionSelectionModal.vue';
import FavoriteNoteModal from '@/Components/FavoriteNoteModal.vue';
import AppDownloadModal from '@/Components/AppDownloadModal.vue';
import BibleSEOLinks from '@/Components/BibleSEOLinks.vue';

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
    seo: Object,
});

// --- Computed State ---
const structuredData = computed(() => {
    if (!selectedBook.value || !selectedChapter.value) return null;
    return {
        "@context": "https://schema.org",
        "@type": "BiblePassage",
        "name": `${selectedBook.value.name} ${selectedChapter.value}`,
        "description": props.seo?.description || `Lectura de ${selectedBook.value.name} capítulo ${selectedChapter.value}`,
        "url": typeof window !== 'undefined' ? window.location.href : '',
        "language": "es",
        "publisher": {
            "@type": "Organization",
            "name": "Biblia Palabra de Vida",
            "url": "https://biblia-palabradevida.com"
        }
    };
});

const selectedVersion = computed(() => props.initialVersion);
const selectedBook = computed(() => props.books.find(b => b.id === props.initialBook) || props.books[0]);
const selectedChapter = computed(() => props.initialChapter);
const versesList = computed(() => props.initialVerses);
const booksList = computed(() => props.books);
const chaptersList = computed(() => props.initialChapters);

// --- Reactive State ---
const isLoading = ref(false);
const isBookModalOpen = ref(false);
const isVersionModalOpen = ref(false);
const isAboutModalOpen = ref(false);
const isNoteModalOpen = ref(false);
const isAppDownloadModalOpen = ref(false);
const isCopied = ref(false);

const testamentFilter = ref(1);
const expandedBookId = ref(null);
const expandedBookChapters = ref([]);
const selectedVerses = ref([]);

const noteForm = useForm({
    note: '',
});

const isDark = ref(typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false);

// --- Methods ---
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

const visit = (params) => {
    isLoading.value = true;
    let bookName = selectedBook.value.name;
    if (params.book) {
        const book = booksList.value.find(b => b.id === params.book);
        if (book) bookName = book.name;
    }

    router.get(route('bible.show', { book: bookName, chapter: params.chapter || 1 }), { version: params.version || selectedVersion.value }, {
        preserveScroll: true,
        preserveState: true,
        only: ['books', 'initialChapters', 'initialVerses', 'initialVersion', 'initialBook', 'initialChapter', 'seo'],
        onFinish: () => { 
            isLoading.value = false; 
            isBookModalOpen.value = false; 
            isVersionModalOpen.value = false; 
        }
    });
};

function handleVersionChange(version) {
    visit({ version, book: selectedBook.value.id, chapter: 1 });
}

async function expandBook(book) {
    if (expandedBookId.value === book.id) {
        expandedBookId.value = null;
        return;
    }
    expandedBookId.value = book.id;
    expandedBookChapters.value = []; 
    try {
        const response = await axios.get(`/es/api/bible/chapters/${selectedVersion.value}/${book.id}`);
        expandedBookChapters.value = response.data;
    } catch (e) {
        console.error("Failed to fetch chapters for modal", e);
    }
}

function navigateToChapter(bookId, chapter) {
    visit({ version: selectedVersion.value, book: bookId, chapter });
}

function navigateToSearchResult(result) {
    visit({ version: selectedVersion.value, book: result.book_id, chapter: result.chapter });
}

function prevChapter() {
    if (selectedChapter.value > 1) {
        navigateToChapter(selectedBook.value.id, selectedChapter.value - 1);
    } else {
        const idx = booksList.value.findIndex(b => b.id === selectedBook.value.id) - 1;
        if (idx >= 0) navigateToChapter(booksList.value[idx].id, 1);
    }
}

function nextChapter() {
    const maxChapter = chaptersList.value[chaptersList.value.length - 1]; 
    if (selectedChapter.value < maxChapter) {
        navigateToChapter(selectedBook.value.id, selectedChapter.value + 1);
    } else {
        const idx = booksList.value.findIndex(b => b.id === selectedBook.value.id) + 1;
        if (idx < booksList.value.length) navigateToChapter(booksList.value[idx].id, 1);
    }
}

function toggleSelection(verse) {
    const index = selectedVerses.value.findIndex(v => v.id === verse.id);
    if (index === -1) selectedVerses.value.push(verse);
    else selectedVerses.value.splice(index, 1);
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

    noteForm.transform((data) => ({ favorites })).post(route('favorites.store'), {
        onSuccess: () => {
            selectedVerses.value = [];
            isNoteModalOpen.value = false;
        }
    });
}

function copyVerses() {
    const sortedVerses = [...selectedVerses.value].sort((a, b) => a.verse - b.verse);
    const versesText = sortedVerses.map(v => `${v.verse}. ${v.text}`).join('\n');
    const reference = `${selectedBook.value.name} ${selectedChapter.value}:${sortedVerses.map(v => v.verse).join(', ')}`;
    const url = `https://biblia-palabradevida.com/es/leer/${selectedBook.value.name}/${selectedChapter.value}`;
    const finalContent = `${reference}\n${versesText}\n\nCompartido desde ${url}`;

    navigator.clipboard.writeText(finalContent).then(() => {
        isCopied.value = true;
        setTimeout(() => isCopied.value = false, 2000);
    });
}

function closeAppDownloadModal() {
    isAppDownloadModalOpen.value = false;
    localStorage.setItem('hasSeenAppDownloadModal', 'true');
}

function openPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida', '_blank');
    closeAppDownloadModal();
}

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
    expandedBookId.value = props.initialBook;
    expandedBookChapters.value = props.initialChapters;

    const verse = new URLSearchParams(window.location.search).get('verse');
    if (verse) {
        setTimeout(() => {
            const el = document.getElementById(`verse-${verse}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
    }

    if (!localStorage.getItem('hasSeenAppDownloadModal')) {
        setTimeout(() => isAppDownloadModalOpen.value = true, 3000);
    }
});
</script>

<template>
    <Head>
        <title>{{ seo?.title || 'Biblia - Palabra de Vida' }}</title>
        <meta name="description" :content="seo?.description" />
        <meta property="og:title" :content="seo?.title" />
        <meta property="og:description" :content="seo?.description" />
        <meta property="og:type" content="book" />
        <meta name="twitter:card" content="summary" />
        <component is="script" type="application/ld+json">
            {{ JSON.stringify(structuredData) }}
        </component>
    </Head>

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">
        
        <BibleHeader 
            :isDark="isDark"
            :selectedVersion="selectedVersion"
            @toggleTheme="toggleTheme"
            @openVersionModal="isVersionModalOpen = true"
            @openAboutModal="isAboutModalOpen = true"
            @navigateToSearchResult="navigateToSearchResult"
        />

        <main class="max-w-4xl mx-auto px-4 py-8 relative">
            <BibleBreadcrumbs 
                :selectedBook="selectedBook" 
                :selectedChapter="selectedChapter"
                @openBookModal="isBookModalOpen = true"
            />

            <BibleChapterHeader 
                :selectedBook="selectedBook"
                :selectedChapter="selectedChapter"
                @openBookModal="isBookModalOpen = true"
                @prevChapter="prevChapter"
                @nextChapter="nextChapter"
            />

            <BibleVerseList 
                :verses="versesList"
                :selectedVerses="selectedVerses"
                :isLoading="isLoading"
                @toggleSelection="toggleSelection"
            />

            <BibleSelectionBar 
                :selectedVerses="selectedVerses"
                :isCopied="isCopied"
                @copyVerses="copyVerses"
                @openNoteModal="isNoteModalOpen = true"
                @clearSelection="selectedVerses = []"
            />

            <!-- Bottom Navigation for accessibility/crawlers -->
            <div class="mt-16 flex justify-between border-t border-[#E0D5C9] dark:border-[#2E2A25] pt-10 pb-20">
                <button @click="prevChapter" class="text-left group">
                    <span class="text-sm text-[#9B8D82]">Anterior</span>
                    <div class="flex items-center gap-2 group-hover:-translate-x-1 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span class="text-lg font-bold">Capítulo {{ selectedChapter > 1 ? selectedChapter - 1 : 'Previo' }}</span>
                    </div>
                </button>
                <button @click="nextChapter" class="text-right group">
                    <span class="text-sm text-[#9B8D82]">Siguiente</span>
                    <div class="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <span class="text-lg font-bold">Capítulo {{ (selectedChapter < chaptersList[chaptersList.length-1]) ? selectedChapter + 1 : 'Siguiente' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>
        </main>

        <BibleSEOLinks :booksList="booksList" />
        <BibleFooter @openAboutModal="isAboutModalOpen = true" />

        <!-- Modals -->
        <BookSelectionModal 
            :isOpen="isBookModalOpen"
            :booksList="booksList"
            :selectedBook="selectedBook"
            :selectedChapter="selectedChapter"
            :expandedBookId="expandedBookId"
            :expandedBookChapters="expandedBookChapters"
            :testamentFilter="testamentFilter"
            @close="isBookModalOpen = false"
            @expandBook="expandBook"
            @navigateToChapter="navigateToChapter"
            @setTestamentFilter="f => testamentFilter = f"
        />

        <VersionSelectionModal 
            :isOpen="isVersionModalOpen"
            :versions="versions"
            :selectedVersion="selectedVersion"
            @close="isVersionModalOpen = false"
            @selectVersion="handleVersionChange"
        />

        <FavoriteNoteModal 
            :isOpen="isNoteModalOpen"
            :selectedVerses="selectedVerses"
            :processing="noteForm.processing"
            v-model="noteForm.note"
            @close="isNoteModalOpen = false"
            @save="saveFavorites"
        />

        <AppDownloadModal 
            :isOpen="isAppDownloadModalOpen"
            @close="closeAppDownloadModal"
            @openPlayStore="openPlayStore"
        />

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #E0D5C9; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #2E2A25; }

body { -webkit-tap-highlight-color: transparent; }
</style>
