<script setup>
import { computed } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    booksList: Array,
    selectedBook: Object,
    selectedChapter: Number,
    expandedBookId: Number,
    expandedBookChapters: Array,
    testamentFilter: Number
});

const emit = defineEmits(['close', 'expandBook', 'navigateToChapter', 'setTestamentFilter']);

const filteredBooks = computed(() => {
    return props.booksList.filter(b => {
        if (props.testamentFilter === 1) {
            return b.id <= 39;
        } else {
            return b.id >= 40;
        }
    });
});
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>
            <div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
                <div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25]">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold">Seleccionar Libro</h3>
                        <button @click="$emit('close')" class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div class="flex gap-2 bg-[#F5EBE0] dark:bg-[#222222] p-1 rounded-xl">
                        <button 
                            @click="$emit('setTestamentFilter', 1)" 
                            :class="testamentFilter === 1 ? 'bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]' : 'text-[#9B8D82]'"
                            class="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
                        >Antiguo Testamento</button>
                        <button 
                            @click="$emit('setTestamentFilter', 2)" 
                            :class="testamentFilter === 2 ? 'bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]' : 'text-[#9B8D82]'"
                            class="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
                        >Nuevo Testamento</button>
                    </div>
                </div>
                
                <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div v-for="book in filteredBooks" :key="book.id" class="space-y-4">
                        <button @click="$emit('expandBook', book)" 
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
                                @click="$emit('navigateToChapter', book.id, ch)"
                                :class="(selectedBook.id === book.id && selectedChapter === ch) ? 'bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]' : 'bg-[#F5EBE0] dark:bg-[#222222] hover:bg-[#8B6F47]/20 dark:hover:bg-[#E3C598]/20'"
                                class="h-10 rounded-lg text-sm font-bold transition-all"
                            >{{ ch }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
