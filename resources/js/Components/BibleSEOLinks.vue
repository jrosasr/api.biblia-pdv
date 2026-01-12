<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    booksList: Array
});
</script>

<template>
    <section class="max-w-4xl mx-auto px-4 py-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] mt-10">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[#8B6F47] mb-6 text-center">Libros de la Biblia</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <Link 
                v-for="book in booksList" 
                :key="book.id" 
                :href="route('bible.show', { book: book.name })"
                class="text-xs text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors text-center p-2 rounded-lg hover:bg-white dark:hover:bg-white/5 shadow-sm border border-transparent hover:border-[#E0D5C9] dark:hover:border-[#2E2A25]"
            >
                {{ book.name }}
            </Link>
        </div>
    </section>
</template>
