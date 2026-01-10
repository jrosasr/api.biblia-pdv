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
    difficulty_level: props.series.difficulty_level || 1,
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
            <h2 class="font-bold text-xl text-primary leading-tight">
                Editar Serie: {{ series.title }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-xl sm:rounded-2xl border border-border">
                    <div class="p-8">
                        <header class="mb-8 border-b border-border pb-4 font-bold">
                            <h3 class="text-lg text-text">Información de la Serie</h3>
                        </header>

                        <form @submit.prevent="submit" class="space-y-6">
                            <div>
                                <InputLabel for="title" value="Título de la Serie" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.title"
                                    required
                                    autofocus
                                />
                                <InputError class="mt-2" :message="form.errors.title" />
                            </div>

                            <div>
                                <InputLabel for="description" value="Descripción" />
                                <TextArea
                                    id="description"
                                    class="mt-1 block w-full"
                                    v-model="form.description"
                                    rows="5"
                                />
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <div>
                                <InputLabel for="difficulty_level" value="Nivel de Dificultad" />
                                <select
                                    id="difficulty_level"
                                    class="mt-1 block w-full border-border bg-surface text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                                    v-model="form.difficulty_level"
                                    required
                                >
                                    <option value="1">Historias cortas</option>
                                    <option value="2">Historias largas</option>
                                    <option value="3">Historias más difíciles</option>
                                </select>
                                <InputError class="mt-2" :message="form.errors.difficulty_level" />
                            </div>

                            <div>
                                <InputLabel for="cover_image" value="Imagen de Portada" />
                                
                                <div class="mt-2 flex gap-4 items-start">
                                    <!-- Vista previa imagen actual -->
                                    <div v-if="series.cover_image && !form.cover_image" class="w-32 h-32 rounded-xl overflow-hidden border border-border flex-shrink-0 shadow-sm">
                                        <img :src="series.cover_image" class="w-full h-full object-cover" alt="Actual cover">
                                    </div>

                                    <div class="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:bg-surface-alt transition-colors cursor-pointer relative group">
                                        <div class="space-y-1 text-center">
                                            <svg v-if="!form.cover_image" class="mx-auto h-12 w-12 text-text-tertiary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-text-secondary">
                                                <label for="cover_image" class="relative cursor-pointer bg-background rounded-md font-bold text-primary hover:opacity-80 focus-within:outline-none focus:ring-2 focus:ring-primary px-2">
                                                    <span>{{ form.cover_image ? 'Cambiar archivo' : 'Subir nueva imagen' }}</span>
                                                    <input id="cover_image" name="cover_image" type="file" class="sr-only" @input="form.cover_image = $event.target.files[0]" accept="image/*" />
                                                </label>
                                            </div>
                                            <p v-if="form.cover_image" class="text-sm text-primary font-bold mt-2">
                                                Seleccionado: {{ form.cover_image.name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <InputError class="mt-2" :message="form.errors.cover_image" />
                                <progress v-if="form.progress" :value="form.progress.percentage" max="100" class="w-full mt-4 h-1 bg-surface-alt rounded-full overflow-hidden">
                                     <div class="bg-primary h-1" :style="{ width: form.progress.percentage + '%' }"></div>
                                </progress>
                            </div>

                            <div class="flex items-center justify-end gap-5 pt-8 border-t border-border">
                                <Link :href="route('bible-series.index')" class="text-sm font-bold text-text-tertiary hover:text-primary transition-colors">
                                    Cancelar
                                </Link>
                                <PrimaryButton :disabled="form.processing" class="shadow-lg">
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
