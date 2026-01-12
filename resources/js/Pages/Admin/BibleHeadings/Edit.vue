<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';

const props = defineProps({
    heading: Object,
    books: Array,
});

const form = useForm({
    book_id: props.heading.data.book_id,
    chapter: props.heading.data.chapter,
    verse: props.heading.data.verse,
    title: props.heading.data.title,
});

const submit = () => {
    form.put(route('bible-headings.update', props.heading.data.id));
};
</script>

<template>
    <Head title="Editar Título" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold leading-tight text-primary">
                    Editar Título de la Biblia
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
            <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden p-8">
                    <form @submit.prevent="submit" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-text-secondary mb-2">Libro</label>
                            <select 
                                v-model="form.book_id"
                                class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                                required
                            >
                                <option v-for="book in books" :key="book.id" :value="book.id">
                                    {{ book.name }}
                                </option>
                            </select>
                            <div v-if="form.errors.book_id" class="text-red-500 text-sm mt-1">{{ form.errors.book_id }}</div>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold text-text-secondary mb-2">Capítulo</label>
                                <input 
                                    v-model="form.chapter"
                                    type="number"
                                    class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                    required
                                >
                                <div v-if="form.errors.chapter" class="text-red-500 text-sm mt-1">{{ form.errors.chapter }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-text-secondary mb-2">Versículo</label>
                                <input 
                                    v-model="form.verse"
                                    type="number"
                                    class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                    required
                                >
                                <div v-if="form.errors.verse" class="text-red-500 text-sm mt-1">{{ form.errors.verse }}</div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-text-secondary mb-2">Texto del Título (Heading)</label>
                            <textarea 
                                v-model="form.title"
                                rows="3"
                                class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                required
                            ></textarea>
                            <div v-if="form.errors.title" class="text-red-500 text-sm mt-1">{{ form.errors.title }}</div>
                        </div>

                        <div class="pt-6 border-t border-border flex gap-4">
                            <Link 
                                :href="route('bible-headings.index')"
                                class="flex-1 text-center py-4 border border-border text-text font-bold rounded-2xl hover:bg-background transition-all"
                            >
                                Cancelar
                            </Link>
                            <button 
                                type="submit"
                                :disabled="form.processing"
                                class="flex-1 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:opacity-90 transition-all disabled:opacity-50"
                            >
                                {{ form.processing ? 'Guardando...' : 'Guardar Cambios' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
