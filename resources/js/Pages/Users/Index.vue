<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    users: Object,
});
</script>

<template>
    <Head title="Usuarios" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl text-primary leading-tight">Gestión de Usuarios</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <div v-if="users.data.length === 0" class="text-center py-8 text-text-tertiary">
                            No hay usuarios registrados.
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-border">
                                <thead class="bg-surface-alt/50">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Nombre</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Email</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Racha Actual</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">Favoritos</th>
                                        <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-surface divide-y divide-border">
                                    <tr v-for="user in users.data" :key="user.id" class="hover:bg-surface-alt/30 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text">
                                            {{ user.name }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            {{ user.email }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider">
                                                {{ user.reading_streak?.current_streak || 0 }} 🔥
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-center font-bold">
                                            {{ user.favorites_count }} ⭐
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                                            <Link :href="route('users.show', user.id)" class="text-primary hover:opacity-80 transition-opacity">Ver Detalle</Link>
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
