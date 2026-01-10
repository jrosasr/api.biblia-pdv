<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';

defineProps({
    stories: Array,
});

const deleteStory = (id) => {
    if (confirm('¿Estás seguro de eliminar esta historia?')) {
        router.delete(route('bible-stories.destroy', id));
    }
};
</script>

<template>
    <Head title="Historias Bíblicas" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-xl text-primary leading-tight">Historias Bíblicas</h2>
                <Link :href="route('bible-stories.create')">
                    <PrimaryButton>
                        Nueva Historia
                    </PrimaryButton>
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <div v-if="stories.length === 0" class="text-center py-8 text-text-tertiary">
                            No hay historias registradas.
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-border">
                                <thead class="bg-surface-alt/50">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Título</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Serie</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Cita</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Dificultad</th>
                                        <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-surface divide-y divide-border">
                                    <tr v-for="story in stories" :key="story.id" class="hover:bg-surface-alt/30 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text">
                                            {{ story.title }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            <span class="px-2 py-0.5 bg-primary/5 text-primary rounded-md text-[11px] font-bold uppercase tracking-tight">
                                                {{ story.series?.title }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            {{ story.book }} {{ story.chapter_start }}:{{ story.verse_start }}
                                            <span v-if="story.chapter_end"> - {{ story.chapter_end }}:{{ story.verse_end }}</span>
                                            <span v-else-if="story.verse_end"> - {{ story.verse_end }}</span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <span 
                                                class="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-tight"
                                                :class="{
                                                    'bg-blue-100 text-blue-700': story.difficulty_level === 1,
                                                    'bg-orange-100 text-orange-700': story.difficulty_level === 2,
                                                    'bg-red-100 text-red-700': story.difficulty_level === 3,
                                                }"
                                            >
                                                {{ story.difficulty_level === 1 ? 'Historias cortas' : story.difficulty_level === 2 ? 'Historias largas' : 'Historias más difíciles' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                                            <Link :href="route('bible-stories.edit', story.id)" class="text-primary hover:opacity-80 transition-opacity mr-4">Editar</Link>
                                            <button @click="deleteStory(story.id)" class="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
