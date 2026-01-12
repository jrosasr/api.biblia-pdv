<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';

const props = defineProps({
    books: Array,
});

const form = useForm({
    book_id: '',
    headings: [
        { chapter: '', verse: '', title: '' }
    ],
});

const addRow = () => {
    form.headings.push({ chapter: '', verse: '', title: '' });
};

const removeRow = (index) => {
    if (form.headings.length > 1) {
        form.headings.splice(index, 1);
    }
};

const submit = () => {
    form.post(route('bible-headings.store'));
};
</script>

<template>
    <Head title="Agregar Títulos" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold leading-tight text-primary">
                    Agregar Títulos a la Biblia
                </h2>
                <Link 
                    :href="route('bible-headings.index')"
                    class="text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
                >
                    Volver al listado
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden">
                    <form @submit.prevent="submit" class="p-8 space-y-8">
                        <!-- Book Selection -->
                        <div class="max-w-md">
                            <label class="block text-sm font-bold text-text-secondary mb-2">Seleccionar Libro</label>
                            <select 
                                v-model="form.book_id"
                                class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all text-lg font-bold"
                                required
                            >
                                <option value="" disabled>Seleccionar el libro para estos títulos...</option>
                                <option v-for="book in books" :key="book.id" :value="book.id">
                                    {{ book.name }}
                                </option>
                            </select>
                            <div v-if="form.errors.book_id" class="text-red-500 text-sm mt-1">{{ form.errors.book_id }}</div>
                        </div>

                        <!-- Multi-rows -->
                        <div class="space-y-4">
                            <h3 class="text-sm font-black uppercase tracking-widest text-text-tertiary">Lista de Títulos (Perícopes)</h3>
                            
                            <div v-for="(heading, index) in form.headings" :key="index" class="flex flex-wrap md:flex-nowrap gap-4 items-start bg-background/30 p-4 rounded-2xl border border-border/50">
                                <div class="w-24 shrink-0">
                                    <label class="block text-xs font-bold text-text-tertiary mb-1">Cap.</label>
                                    <input 
                                        v-model="heading.chapter"
                                        type="number"
                                        class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                        required
                                        placeholder="1"
                                    >
                                    <div v-if="form.errors[`headings.${index}.chapter`]" class="text-red-500 text-xs mt-1">{{ form.errors[`headings.${index}.chapter`] }}</div>
                                </div>
                                
                                <div class="w-24 shrink-0">
                                    <label class="block text-xs font-bold text-text-tertiary mb-1">Ver.</label>
                                    <input 
                                        v-model="heading.verse"
                                        type="number"
                                        class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                        required
                                        placeholder="1"
                                    >
                                    <div v-if="form.errors[`headings.${index}.verse`]" class="text-red-500 text-xs mt-1">{{ form.errors[`headings.${index}.verse`] }}</div>
                                </div>

                                <div class="flex-1">
                                    <label class="block text-xs font-bold text-text-tertiary mb-1">Texto del Título</label>
                                    <input 
                                        v-model="heading.title"
                                        type="text"
                                        class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                        required
                                        placeholder="Ej: La creación del mundo"
                                    >
                                    <div v-if="form.errors[`headings.${index}.title`]" class="text-red-500 text-xs mt-1">{{ form.errors[`headings.${index}.title`] }}</div>
                                </div>

                                <button 
                                    v-if="form.headings.length > 1"
                                    type="button" 
                                    @click="removeRow(index)"
                                    class="mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <button 
                                type="button" 
                                @click="addRow"
                                class="w-full py-4 border-2 border-dashed border-border rounded-2xl text-text-tertiary hover:border-primary hover:text-primary transition-all font-bold flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Añadir otra fila
                            </button>
                        </div>

                        <div class="pt-8 border-t border-border flex justify-end">
                            <button 
                                type="submit"
                                :disabled="form.processing"
                                class="px-10 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {{ form.processing ? 'Guardando...' : 'Guardar Todos los Títulos' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
