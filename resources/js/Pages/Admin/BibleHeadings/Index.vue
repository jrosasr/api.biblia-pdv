<script setup>
import { ref, watch } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, Link } from '@inertiajs/vue3';

const props = defineProps({
    headings: Object,
    books: Array,
    filters: Object,
});

const filterForm = ref({
    book_id: props.filters.book_id || '',
});

watch(() => filterForm.value.book_id, (value) => {
    router.get(route('bible-headings.index'), { book_id: value }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    });
});

const deleteHeading = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este título?')) {
        router.delete(route('bible-headings.destroy', id), {
            preserveScroll: true
        });
    }
};

const getBookName = (id) => {
    const book = props.books.find(b => b.id == id);
    return book ? book.name : `Libro ${id}`;
};
</script>

<template>
    <Head title="Gestión de Títulos" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 class="text-xl font-bold leading-tight text-primary">
                    Títulos de la Biblia (Perícopes)
                </h2>
                <Link 
                    :href="route('bible-headings.create')"
                    class="w-full sm:w-auto text-center px-4 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all font-sans"
                >
                    + Agregar Títulos
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- Filters -->
                <div class="mb-6 bg-surface p-4 rounded-2xl border border-border flex items-center gap-4">
                    <div class="flex-1 max-w-xs">
                        <label class="block text-xs font-bold uppercase tracking-widest text-text-tertiary mb-1">Filtrar por Libro</label>
                        <select 
                            v-model="filterForm.book_id"
                            class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                        >
                            <option value="">Todos los libros</option>
                            <option v-for="book in books" :key="book.id" :value="book.id">
                                {{ book.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden">
                    <table class="w-full text-left">
                        <thead class="bg-background text-text-tertiary text-xs font-bold uppercase tracking-widest border-b border-border">
                            <tr>
                                <th class="px-6 py-4">Libro</th>
                                <th class="px-6 py-4 text-center">Capítulo</th>
                                <th class="px-6 py-4 text-center">Versículo</th>
                                <th class="px-6 py-4">Título</th>
                                <th class="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr v-for="heading in headings.data" :key="heading.id" class="hover:bg-background/50 transition-colors">
                                <td class="px-6 py-4 font-bold">{{ getBookName(heading.book_id) }}</td>
                                <td class="px-6 py-4 text-center">{{ heading.chapter }}</td>
                                <td class="px-6 py-4 text-center">{{ heading.verse }}</td>
                                <td class="px-6 py-4 text-text-secondary italic">"{{ heading.title }}"</td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-2">
                                        <Link :href="route('bible-headings.edit', heading.id)" class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button @click="deleteHeading(heading.id)" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="headings.data.length === 0">
                                <td colspan="5" class="px-6 py-12 text-center text-text-tertiary italic">
                                    No se encontraron títulos registrados.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="headings.meta?.links?.length > 3" class="mt-8 flex justify-center gap-2">
                    <template v-for="link in headings.meta.links" :key="link.label">
                        <button 
                            v-if="link.url"
                            @click="router.visit(link.url)"
                            v-html="link.label"
                            :class="[
                                'px-4 py-2 rounded-xl border transition-all',
                                link.active ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text hover:bg-background'
                            ]"
                        ></button>
                        <span v-else v-html="link.label" class="px-4 py-2 text-text-tertiary"></span>
                    </template>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
