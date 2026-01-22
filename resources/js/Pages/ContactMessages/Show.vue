<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    contactMessage: Object,
});

const form = useForm({});

const deleteMessage = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
        form.delete(route('contact-messages.destroy', props.contactMessage.data.id));
    }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<template>
    <Head title="Detalle del Mensaje" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 class="font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight text-center sm:text-left">
                    Detalle del Mensaje
                </h2>
                <Link 
                    :href="route('contact-messages.index')"
                    class="text-[#8B6F47] dark:text-[#E3C598] font-black flex items-center justify-center sm:justify-start gap-2 hover:translate-x-[-4px] transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a la lista
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25]">
                    <div class="p-10 md:p-16">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-[#E0D5C9] dark:border-[#2E2A25]">
                            <div>
                                <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">De:</span>
                                <h3 class="text-3xl font-black text-[#3A3026] dark:text-[#F5F0E6] mt-1">{{ contactMessage.data.name }}</h3>
                                <p class="text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg">{{ contactMessage.data.email }}</p>
                            </div>
                            <div class="text-left md:text-right">
                                <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Recibido el:</span>
                                <p class="text-[#3A3026] dark:text-[#F5F0E6] font-bold mt-1">{{ formatDate(contactMessage.data.created_at) }}</p>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Mensaje:</span>
                            <div class="text-xl leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] bg-[#FFF8F0] dark:bg-white/5 p-8 rounded-[2rem] border border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 whitespace-pre-wrap">
                                {{ contactMessage.data.message }}
                            </div>
                        </div>

                        <div class="mt-12 pt-12 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center">
                            <a 
                                :href="`mailto:${contactMessage.data.email}?subject=RE: Contacto Biblia PDV`"
                                class="px-10 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Responder por Email
                            </a>
                            
                            <button 
                                @click="deleteMessage"
                                class="px-8 py-4 bg-red-500/10 text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar Mensaje
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
