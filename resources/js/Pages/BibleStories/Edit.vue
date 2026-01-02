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

const submit = () => {
    form.post(route('bible-stories.update', props.story.id));
};
</script>

<template>
    <Head title="Editar Historia Bíblica" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar Historia Bíblica: {{ story.title }}</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <form @submit.prevent="submit" class="space-y-6 max-w-2xl">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel for="series_id" value="Serie" />
                                    <select
                                        id="series_id"
                                        v-model="form.series_id"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                        required
                                    >
                                        <option value="" disabled>Selecciona una serie</option>
                                        <option v-for="item in series" :key="item.id" :value="item.id">{{ item.title }}</option>
                                    </select>
                                    <InputError class="mt-2" :message="form.errors.series_id" />
                                </div>

                                <div>
                                    <InputLabel for="title" value="Título" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.title"
                                        required
                                    />
                                    <InputError class="mt-2" :message="form.errors.title" />
                                </div>
                            </div>

                            <div>
                                <InputLabel for="description" value="Descripción" />
                                <TextArea
                                    id="description"
                                    class="mt-1 block w-full"
                                    v-model="form.description"
                                    rows="3"
                                />
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <div>
                                <InputLabel for="cover_image" value="Imagen de portada" />
                                <div v-if="story.cover_image" class="mb-2">
                                    <img :src="story.cover_image" class="w-24 h-24 object-cover rounded-lg border dark:border-gray-600">
                                </div>
                                <input
                                    id="cover_image"
                                    type="file"
                                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    @input="form.cover_image = $event.target.files[0]"
                                    accept="image/*"
                                />
                                <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                                    {{ form.progress.percentage }}%
                                </progress>
                                <InputError class="mt-2" :message="form.errors.cover_image" />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <InputLabel for="book" value="Libro" />
                                    <TextInput
                                        id="book"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.book"
                                        required
                                        placeholder="Ej: Génesis"
                                    />
                                    <InputError class="mt-2" :message="form.errors.book" />
                                </div>
                                <div>
                                    <InputLabel for="chapter_start" value="Capítulo Inicio" />
                                    <TextInput
                                        id="chapter_start"
                                        type="number"
                                        class="mt-1 block w-full"
                                        v-model="form.chapter_start"
                                        required
                                    />
                                    <InputError class="mt-2" :message="form.errors.chapter_start" />
                                </div>
                                <div>
                                    <InputLabel for="verse_start" value="Versículo Inicio" />
                                    <TextInput
                                        id="verse_start"
                                        type="number"
                                        class="mt-1 block w-full"
                                        v-model="form.verse_start"
                                        required
                                    />
                                    <InputError class="mt-2" :message="form.errors.verse_start" />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel for="chapter_end" value="Capítulo Fin (Opcional)" />
                                    <TextInput
                                        id="chapter_end"
                                        type="number"
                                        class="mt-1 block w-full"
                                        v-model="form.chapter_end"
                                    />
                                    <InputError class="mt-2" :message="form.errors.chapter_end" />
                                </div>
                                <div>
                                    <InputLabel for="verse_end" value="Versículo Fin (Opcional)" />
                                    <TextInput
                                        id="verse_end"
                                        type="number"
                                        class="mt-1 block w-full"
                                        v-model="form.verse_end"
                                    />
                                    <InputError class="mt-2" :message="form.errors.verse_end" />
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <PrimaryButton :disabled="form.processing">Actualizar</PrimaryButton>
                                <Link :href="route('bible-stories.index')" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline">
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
