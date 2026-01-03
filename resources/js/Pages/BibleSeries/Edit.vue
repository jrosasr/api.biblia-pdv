<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import TextArea from '@/Components/TextArea.vue';

const props = defineProps({
    series: Object,
});

const form = useForm({
    title: props.series.title,
    description: props.series.description || '',
    cover_image: null,
    _method: 'patch',
});

const submit = () => {
    form.post(route('bible-series.update', props.series.id));
};
</script>

<template>
    <Head title="Editar Serie Bíblica" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                Editar Serie: {{ series.title }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div class="p-8">
                        <header class="mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Información de la Serie</h3>
                        </header>

                        <form @submit.prevent="submit" class="space-y-6">
                            <div>
                                <InputLabel for="title" value="Título de la Serie" class="text-base font-medium" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    class="mt-2 block w-full text-base py-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
                                    v-model="form.title"
                                    required
                                    autofocus
                                />
                                <InputError class="mt-2" :message="form.errors.title" />
                            </div>

                            <div>
                                <InputLabel for="description" value="Descripción" class="text-base font-medium" />
                                <TextArea
                                    id="description"
                                    class="mt-2 block w-full text-base rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
                                    v-model="form.description"
                                    rows="5"
                                />
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <div>
                                <InputLabel for="cover_image" value="Imagen de Portada" class="text-base font-medium" />
                                
                                <div class="mt-2 flex gap-4 items-start">
                                    <!-- Vista previa imagen actual -->
                                    <div v-if="series.cover_image && !form.cover_image" class="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img :src="series.cover_image" class="w-full h-full object-cover" alt="Actual cover">
                                    </div>

                                    <div class="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative group">
                                        <div class="space-y-1 text-center">
                                            <svg v-if="!form.cover_image" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label for="cover_image" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>{{ form.cover_image ? 'Cambiar archivo' : 'Subir nueva imagen' }}</span>
                                                    <input id="cover_image" name="cover_image" type="file" class="sr-only" @input="form.cover_image = $event.target.files[0]" accept="image/*" />
                                                </label>
                                            </div>
                                            <p v-if="form.cover_image" class="text-sm text-green-600 font-semibold mt-2">
                                                Seleccionado: {{ form.cover_image.name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <InputError class="mt-2" :message="form.errors.cover_image" />
                                <progress v-if="form.progress" :value="form.progress.percentage" max="100" class="w-full mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                                     <div class="bg-indigo-600 h-1" :style="{ width: form.progress.percentage + '%' }"></div>
                                </progress>
                            </div>

                            <div class="flex items-center justify-end gap-5 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <Link :href="route('bible-series.index')" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                    Cancelar
                                </Link>
                                <PrimaryButton :disabled="form.processing" class="px-8 py-3 text-base shadow-lg hover:shadow-indigo-500/30 transition-shadow">
                                    Actualizar Serie
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
