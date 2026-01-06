<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';

defineProps({
    devotionals: Object,
});

const notifyNewDevotional = () => {
    if (confirm('¿Deseas enviar una notificación a todos los dispositivos sobre el nuevo devocional?')) {
        router.post(route('notifications.new-devotional'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Success message is handled by Inertia flash
            }
        });
    }
};

const deleteDevotional = (id) => {
    if (confirm('¿Estás seguro de eliminar este devocional?')) {
        router.delete(route('devotionals.destroy', id));
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};
</script>

<template>
    <Head title="Devocionales" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-xl text-primary leading-tight">Devocionales</h2>
                <div class="flex space-x-3">
                    <SecondaryButton @click="notifyNewDevotional">
                        Notificar sobre nuevo devocional
                    </SecondaryButton>
                    <Link :href="route('devotionals.create')">
                        <PrimaryButton>
                            Nuevo Devocional
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <div v-if="devotionals.data.length === 0" class="text-center py-8 text-text-tertiary">
                            No hay devocionales registrados.
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-border">
                                <thead class="bg-surface-alt/50">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Título</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Estado</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Lecturas</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Fecha de publicación</th>
                                        <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-surface divide-y divide-border">
                                    <tr v-for="devotional in devotionals.data" :key="devotional.id" class="hover:bg-surface-alt/30 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text">
                                            {{ devotional.title }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <span 
                                                class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full"
                                                :class="{
                                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': devotional.status === 'published',
                                                    'bg-surface-alt text-text-secondary': devotional.status !== 'published'
                                                }"
                                            >
                                                {{ devotional.status === 'published' ? 'Publicado' : 'Borrador' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-secondary">
                                            {{ devotional.readings }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            {{ formatDate(devotional.published_at) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                                            <Link :href="route('devotionals.edit', devotional.id)" class="text-primary hover:opacity-80 transition-opacity mr-4">Editar</Link>
                                            <button @click="deleteDevotional(devotional.id)" class="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
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
