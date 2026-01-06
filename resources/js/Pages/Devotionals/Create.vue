<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import Editor from '@/Components/Editor.vue';

const form = useForm({
    title: '',
    content: {}, // EditorJS blocks object
    status: 'draft',
    image: '',
    video: '',
    audio: '',
    published_at: '',
});

const submit = () => {
    form.post(route('devotionals.store'));
};
</script>

<template>
    <Head title="Nuevo Devocional" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl text-primary leading-tight">Nuevo Devocional</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <form @submit.prevent="submit" class="space-y-6">
                            
                            <!-- Title -->
                            <div>
                                <InputLabel for="title" value="Título del Devocional" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.title"
                                    required
                                    autofocus
                                    autocomplete="title"
                                />
                                <InputError class="mt-2" :message="form.errors.title" />
                            </div>

                            <!-- Content (EditorJS) -->
                            <div>
                                <InputLabel value="Contenido" />
                                <div class="mt-1">
                                    <Editor v-model="form.content" />
                                </div>
                                <InputError class="mt-2" :message="form.errors.content" />
                            </div>

                            <!-- Status -->
                            <div>
                                <InputLabel for="status" value="Estado" />
                                <select 
                                    id="status" 
                                    v-model="form.status"
                                    class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                                >
                                    <option value="draft">Borrador</option>
                                    <option value="published">Publicado</option>
                                </select>
                                <InputError class="mt-2" :message="form.errors.status" />
                            </div>

                            <!-- Published At -->
                            <div>
                                <InputLabel for="published_at" value="Fecha de Publicación" />
                                <TextInput
                                    id="published_at"
                                    type="datetime-local"
                                    class="mt-1 block w-full"
                                    v-model="form.published_at"
                                />
                                <InputError class="mt-2" :message="form.errors.published_at" />
                            </div>

                            <div class="flex items-center gap-4 pt-4">
                                <PrimaryButton :disabled="form.processing">Publicar / Guardar</PrimaryButton>
                                
                                <Transition
                                    enter-active-class="transition ease-in-out"
                                    enter-from-class="opacity-0"
                                    leave-active-class="transition ease-in-out"
                                    leave-to-class="opacity-0"
                                >
                                    <p v-if="form.recentlySuccessful" class="text-sm text-green-600 font-medium">Guardado.</p>
                                </Transition>
                                
                                <Link :href="route('devotionals.index')" class="text-sm font-bold text-text-tertiary hover:text-primary transition-colors">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
