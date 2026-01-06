<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import TextArea from '@/Components/TextArea.vue';

defineProps({
    series: Array,
});

const form = useForm({
    series_id: '',
    title: '',
    description: '',
    cover_image: null,
    book: '',
    chapter_start: '',
    verse_start: '',
    chapter_end: '',
    verse_end: '',
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
    form.post(route('bible-stories.store'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Nueva Historia Bíblica" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl text-primary leading-tight">
                Nueva Historia Bíblica
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-xl sm:rounded-2xl border border-border">
                    <div class="p-8">
                        <form @submit.prevent="submit" class="space-y-8">
                            
                            <!-- Sección: Información Básica -->
                            <section>
                                <div class="mb-6 pb-2 border-b border-border font-bold">
                                    <h3 class="text-lg text-text">Información General</h3>
                                    <p class="text-sm text-text-tertiary font-normal">Detalles principales de la historia.</p>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-6">
                                        <div>
                                            <InputLabel for="series_id" value="Serie / Categoría" />
                                            <div class="mt-1">
                                                <select
                                                    id="series_id"
                                                    v-model="form.series_id"
                                                    class="block w-full text-text bg-background border-border rounded-xl shadow-sm focus:border-primary focus:ring-primary transition-all py-3 px-4"
                                                    required
                                                >
                                                    <option value="" disabled>Seleccionar Serie</option>
                                                    <option v-for="item in series" :key="item.id" :value="item.id">{{ item.title }}</option>
                                                </select>
                                            </div>
                                            <InputError class="mt-2" :message="form.errors.series_id" />
                                        </div>

                                        <div>
                                            <InputLabel for="title" value="Título de la Historia" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                class="mt-1 block w-full"
                                                v-model="form.title"
                                                required
                                                placeholder="Ej: David y Goliat"
                                            />
                                            <InputError class="mt-2" :message="form.errors.title" />
                                        </div>

                                        <div>
                                            <InputLabel for="description" value="Descripción (Opcional)" />
                                            <TextArea
                                                id="description"
                                                class="mt-1 block w-full"
                                                v-model="form.description"
                                                rows="4"
                                                placeholder="Resumen breve..."
                                            />
                                            <InputError class="mt-2" :message="form.errors.description" />
                                        </div>
                                    </div>

                                    <!-- Columna Derecha: Imagen -->
                                    <div>
                                        <InputLabel for="cover_image" value="Imagen de Portada" />
                                        <div class="mt-2 h-full min-h-[250px] flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:bg-surface-alt transition-colors cursor-pointer relative group items-center">
                                            <div class="space-y-1 text-center w-full">
                                                <div v-if="form.cover_image" class="mb-4">
                                                    <p class="text-sm text-primary font-bold truncate">{{ form.cover_image.name }}</p>
                                                </div>
                                                <svg v-else class="mx-auto h-16 w-16 text-text-tertiary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                
                                                <label for="cover_image" class="relative cursor-pointer bg-background rounded-md px-4 py-2 font-bold text-primary hover:opacity-80 transition-opacity focus-within:outline-none ring-1 ring-border mt-2 inline-block">
                                                    <span>{{ form.cover_image ? 'Cambiar Imagen' : 'Seleccionar Imagen' }}</span>
                                                    <input id="cover_image" type="file" class="sr-only" @input="form.cover_image = $event.target.files[0]" accept="image/*" />
                                                </label>
                                            </div>
                                        </div>
                                        <InputError class="mt-2" :message="form.errors.cover_image" />
                                    </div>
                                </div>
                            </section>

                            <!-- Sección: Referencia Bíblica -->
                            <section class="bg-surface-alt/50 p-6 rounded-2xl border border-border">
                                <div class="mb-6 pb-2 border-b border-border font-bold">
                                    <h3 class="text-lg text-text">Referencia Bíblica</h3>
                                    <p class="text-sm text-text-tertiary font-normal">Defina el pasaje bíblico que cubre la historia.</p>
                                </div>
                                
                                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                    <div class="lg:col-span-1">
                                        <InputLabel for="book" value="Libro" />
                                        <div class="mt-1">
                                            <select
                                                id="book"
                                                v-model="form.book"
                                                class="block w-full text-text bg-background border-border rounded-xl shadow-sm focus:border-primary focus:ring-primary transition-all py-2.5 px-3"
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
                                                class="mt-1 block w-full text-center"
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
                                                class="mt-1 block w-full text-center"
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
                                                class="mt-1 block w-full text-center"
                                                v-model="form.chapter_end"
                                                placeholder="-"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel for="verse_end" value="Vers. Fin" class="truncate" />
                                            <TextInput
                                                id="verse_end"
                                                type="number"
                                                class="mt-1 block w-full text-center"
                                                v-model="form.verse_end"
                                                placeholder="-"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div class="flex items-center justify-end gap-5 pt-4">
                                <Link :href="route('bible-stories.index')" class="text-sm font-bold text-text-tertiary hover:text-primary transition-colors">
                                    Cancelar
                                </Link>
                                <PrimaryButton :disabled="form.processing" class="shadow-lg">
                                    Guardar Historia
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
