<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    messages: Object,
});

const form = useForm({});

const deleteMessage = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
        form.delete(route('contact-messages.destroy', id));
    }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<template>
    <Head title="Mensajes de Contacto" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight">
                Mensajes de Contacto
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[2rem] border border-[#E0D5C9] dark:border-[#2E2A25]">
                    <div class="p-8">
                        <div v-if="messages.data.length === 0" class="text-center py-12">
                            <p class="text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg">No hay mensajes de contacto aún.</p>
                        </div>
                        
                        <div v-else class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="border-b border-[#E0D5C9] dark:border-[#2E2A25]">
                                        <th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Nombre</th>
                                        <th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Email</th>
                                        <th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Fecha</th>
                                        <th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="message in messages.data" :key="message.id" class="border-b border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 hover:bg-[#8B6F47]/5 transition-colors group">
                                        <td class="py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6] font-bold">{{ message.name }}</td>
                                        <td class="py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6]">{{ message.email }}</td>
                                        <td class="py-4 px-6 text-[#8B6F47] dark:text-[#9B8D82] text-sm">{{ formatDate(message.created_at) }}</td>
                                        <td class="py-4 px-6 text-right space-x-3">
                                            <Link 
                                                :href="route('contact-messages.show', message.id)"
                                                class="inline-flex items-center px-4 py-2 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                                            >
                                                Ver
                                            </Link>
                                            <button 
                                                @click="deleteMessage(message.id)"
                                                class="inline-flex items-center px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                Eliminar
                                            </button>
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
