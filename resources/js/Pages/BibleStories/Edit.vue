<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import TextArea from '@/Components/TextArea.vue';

const props = defineProps({
    story: Object,
    series: Array,
});

const form = useForm({
    series_id: props.story.series_id,
    title: props.story.title,
    description: props.story.description || '',
    cover_image: null,
    book: props.story.book,
    chapter_start: props.story.chapter_start,
    verse_start: props.story.verse_start,
    chapter_end: props.story.chapter_end || '',
    verse_end: props.story.verse_end || '',
    _method: 'patch',
});

const bibleBooks = [
    "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut",
    "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras",
    "Nehemías", "Ester", "Job", "Salmos", "Proverbios", "Eclesiastés", "Cantares",
    "Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel",
    "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo",
    "Zacarías", "Malaquías", "Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos",
    "1 Corintios", "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses",
    "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemón",
    "Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas",
    "Apocalipsis"
];

const submit = () => {
    form.post(route('bible-stories.update', props.story.id));
};
</script>

<template>
    <Head title="Editar Historia Bíblica" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                Editar Historia: {{ story.title }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div class="p-8">
                        <form @submit.prevent="submit" class="space-y-8">
                            
                            <!-- Sección: Información Básica -->
                            <section>
                                <div class="mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Información General</h3>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-6">
                                        <div>
                                            <InputLabel for="series_id" value="Serie / Categoría" class="font-medium" />
                                            <div class="mt-2">
                                                <select
                                                    id="series_id"
                                                    v-model="form.series_id"
                                                    class="block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-3"
                                                    required
                                                >
                                                    <option value="" disabled>Seleccionar Serie</option>
                                                    <option v-for="item in series" :key="item.id" :value="item.id">{{ item.title }}</option>
                                                </select>
                                            </div>
                                            <InputError class="mt-2" :message="form.errors.series_id" />
                                        </div>

                                        <div>
                                            <InputLabel for="title" value="Título de la Historia" class="font-medium" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                class="mt-2 block w-full text-base py-3 rounded-lg"
                                                v-model="form.title"
                                                required
                                            />
                                            <InputError class="mt-2" :message="form.errors.title" />
                                        </div>

                                        <div>
                                            <InputLabel for="description" value="Descripción" class="font-medium" />
                                            <TextArea
                                                id="description"
                                                class="mt-2 block w-full text-base rounded-lg"
                                                v-model="form.description"
                                                rows="4"
                                            />
                                            <InputError class="mt-2" :message="form.errors.description" />
                                        </div>
                                    </div>

                                    <!-- Columna Derecha: Imagen -->
                                    <div class="space-y-4">
                                        <InputLabel for="cover_image" value="Imagen de Portada" class="font-medium" />
                                        
                                        <div class="flex flex-col gap-4">
                                            <!-- Imagen actual -->
                                            <div v-if="story.cover_image && !form.cover_image" class="w-full h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <img :src="story.cover_image" class="w-full h-full object-cover" alt="Portada actual">
                                            </div>

                                            <div class="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative group items-center">
                                                <div class="space-y-1 text-center w-full">
                                                     <div v-if="form.cover_image" class="mb-4">
                                                        <p class="text-sm text-green-600 font-semibold truncate">{{ form.cover_image.name }}</p>
                                                    </div>
                                                    <svg v-else class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    
                                                    <label for="cover_image" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                                        <span>{{ form.cover_image ? 'Cambiar archivo' : 'Subir nueva imagen' }}</span>
                                                        <input id="cover_image" type="file" class="sr-only" @input="form.cover_image = $event.target.files[0]" accept="image/*" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <InputError class="mt-2" :message="form.errors.cover_image" />
                                    </div>
                                </div>
                            </section>

                            <!-- Sección: Referencia Bíblica -->
                            <section class="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl">
                                <div class="mb-6 pb-2 border-b border-gray-200 dark:border-gray-600">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Referencia Bíblica</h3>
                                </div>
                                
                                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                    <div class="lg:col-span-1">
                                        <InputLabel for="book" value="Libro" />
                                        <div class="mt-2">
                                            <select
                                                id="book"
                                                v-model="form.book"
                                                class="block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-2.5"
                                                required
                                            >
                                                <option value="" disabled>Seleccionar Libro</option>
                                                <option v-for="book in bibleBooks" :key="book" :value="book">{{ book }}</option>
                                            </select>
                                        </div>
                                        <InputError class="mt-2" :message="form.errors.book" />
                                    </div>
                                    
                                    <div class="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <InputLabel for="chapter_start" value="Cap. Inicio" class="truncate" />
                                            <TextInput
                                                id="chapter_start"
                                                type="number"
                                                class="mt-2 block w-full text-center"
                                                v-model="form.chapter_start"
                                                required
                                            />
                                            <InputError class="mt-2" :message="form.errors.chapter_start" />
                                        </div>
                                        <div>
                                            <InputLabel for="verse_start" value="Vers. Inicio" class="truncate" />
                                            <TextInput
                                                id="verse_start"
                                                type="number"
                                                class="mt-2 block w-full text-center"
                                                v-model="form.verse_start"
                                                required
                                            />
                                            <InputError class="mt-2" :message="form.errors.verse_start" />
                                        </div>
                                        <div>
                                            <InputLabel for="chapter_end" value="Cap. Fin" class="truncate" />
                                            <TextInput
                                                id="chapter_end"
                                                type="number"
                                                class="mt-2 block w-full text-center"
                                                v-model="form.chapter_end"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel for="verse_end" value="Vers. Fin" class="truncate" />
                                            <TextInput
                                                id="verse_end"
                                                type="number"
                                                class="mt-2 block w-full text-center"
                                                v-model="form.verse_end"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div class="flex items-center justify-end gap-5 pt-4">
                                <Link :href="route('bible-stories.index')" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                    Cancelar
                                </Link>
                                <PrimaryButton :disabled="form.processing" class="px-8 py-3 text-base shadow-lg hover:shadow-indigo-500/30 transition-shadow">
                                    Actualizar Historia
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
