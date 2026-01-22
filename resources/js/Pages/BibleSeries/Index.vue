<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

defineProps({
    series: Array,
});

const deleteSeries = (id) => {
    if (confirm('¿Estás seguro de eliminar esta serie? Se eliminarán todas las historias asociadas.')) {
        router.delete(route('bible-series.destroy', id));
    }
};
</script>

<template>
    <Head title="Biblia de Corazón" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 class="font-bold text-xl text-primary leading-tight">Series Bíblicas</h2>
                <Link :href="route('bible-series.create')" class="w-full sm:w-auto">
                    <PrimaryButton class="w-full justify-center">
                        Nueva Serie
                    </PrimaryButton>
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <div v-if="series.length === 0" class="text-center py-8 text-text-tertiary">
                            No hay series registradas.
                        </div>
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div v-for="item in series" :key="item.id" class="bg-background rounded-2xl shadow-sm overflow-hidden border border-border hover:border-primary/50 transition-colors group">
                                <div class="relative">
                                    <img v-if="item.cover_image" :src="item.cover_image" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" :alt="item.title">
                                    <div v-else class="w-full h-48 bg-surface-alt flex items-center justify-center">
                                        <span class="text-text-tertiary text-xs">Sin imagen</span>
                                    </div>
                                </div>
                                <div class="p-5">
                                    <h3 class="text-lg font-bold mb-2 text-text">{{ item.title }}</h3>
                                    <p class="text-sm text-text-secondary mb-4 line-clamp-2 h-10">{{ item.description }}</p>
                                    <div class="flex flex-wrap gap-2 items-center mb-4">
                                        <span class="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                            {{ item.stories_count }} historias
                                        </span>
                                        <span v-if="item.difficulty_level" class="text-[10px] font-bold px-3 py-1 bg-accent/10 text-accent rounded-full uppercase tracking-wider">
                                            {{ item.difficulty_level === 1 ? 'Historias cortas' : item.difficulty_level === 2 ? 'Historias largas' : 'Historias más difíciles' }}
                                        </span>
                                    </div>
                                    <div class="flex justify-end items-center space-x-4 border-t border-border pt-4">
                                        <Link :href="route('bible-series.edit', item.id)" class="text-primary hover:opacity-80 transition-opacity text-sm font-bold">Editar</Link>
                                        <button @click="deleteSeries(item.id)" class="text-red-500 hover:text-red-700 transition-colors text-sm font-bold">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
