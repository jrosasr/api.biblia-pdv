<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import Editor from '@/Components/Editor.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    devotionals: Array,
});

const isModalOpen = ref(false);
const editingDevotional = ref(null);

const form = useForm({
    title: '',
    content: { blocks: [] },
});

const openCreateModal = () => {
    editingDevotional.value = null;
    form.reset();
    form.content = { blocks: [] };
    isModalOpen.value = true;
};

const openEditModal = (devotional) => {
    editingDevotional.value = devotional;
    form.title = devotional.title;
    form.content = devotional.content;
    isModalOpen.value = true;
};

const submit = () => {
    if (editingDevotional.value) {
        form.put(route('user-devotionals.update', editingDevotional.value.id), {
            onSuccess: () => closeModal(),
        });
    } else {
        form.post(route('user-devotionals.store'), {
            onSuccess: () => closeModal(),
        });
    }
};

const deleteDevotional = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este devocional?')) {
        form.delete(route('user-devotionals.destroy', id), {
            preserveScroll: true
        });
    }
};

const closeModal = () => {
    isModalOpen.value = false;
    form.reset();
    editingDevotional.value = null;
};
</script>

<template>
    <Head title="Mis Devocionales" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 class="text-xl font-bold leading-tight text-primary">Mis Devocionales</h2>
                <button 
                    @click="openCreateModal"
                    class="w-full sm:w-auto px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Escribir reflexión
                </button>
            </div>
        </template>

        <div class="py-12 px-4">
            <div class="mx-auto max-w-7xl">
                <div v-if="devotionals.length === 0" class="text-center py-32 bg-surface rounded-[2.5rem] border border-border">
                    <div class="w-24 h-24 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-text">Tu diario espiritual</h3>
                    <p class="text-text-secondary mt-3 max-w-md mx-auto">Guarda tus pensamientos, oraciones y lo que Dios habla a tu vida cada día.</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="devotional in devotionals" :key="devotional.id" class="group bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col min-h-[250px] relative overflow-hidden">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="px-3 py-1 bg-surface-alt text-[10px] font-black uppercase tracking-widest text-primary rounded-full">
                                    {{ new Date(devotional.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) }}
                                </span>
                            </div>
                            <h4 class="text-2xl font-black text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight">{{ devotional.title }}</h4>
                        </div>
                        
                        <div class="mt-8 flex justify-between items-center border-t border-border pt-6">
                            <div class="flex gap-2">
                                <button @click="openEditModal(devotional)" class="p-3 bg-surface-alt hover:bg-primary hover:text-white rounded-full transition-all text-text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="deleteDevotional(devotional.id)" class="p-3 bg-surface-alt hover:bg-red-500 hover:text-white rounded-full transition-all text-text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <Link :href="route('user-devotionals.show', devotional.id)" class="text-sm font-bold text-primary flex items-center gap-1 group/btn">
                                Leer más
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <Transition name="fade">
            <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="closeModal"></div>
                <div class="relative w-full max-w-4xl bg-surface sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh]">
                    <div class="p-8 border-b border-border flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-10">
                        <div>
                            <h3 class="text-2xl font-black text-text">
                                {{ editingDevotional ? 'Editar Reflexión' : 'Escribir Reflexión' }}
                            </h3>
                            <p class="text-sm text-text-tertiary">Dios tiene algo nuevo para ti hoy.</p>
                        </div>
                        <button @click="closeModal" class="p-3 rounded-full hover:bg-surface-alt transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="submit" class="flex-1 overflow-y-auto p-8 space-y-8">
                        <div>
                            <InputLabel for="title" value="Título" class="mb-2 ml-1" />
                            <TextInput 
                                id="title"
                                v-model="form.title" 
                                type="text" 
                                class="w-full text-xl font-bold bg-background/50"
                                placeholder="Dale un título a tu reflexión..."
                                required
                            />
                            <InputError class="mt-2" :message="form.errors.title" />
                        </div>

                        <div class="space-y-4">
                            <InputLabel value="Tu contenido" class="mb-2 ml-1" />
                            <Editor v-model="form.content" placeholder="Escribe lo que Dios puso en tu corazón..." />
                            <InputError class="mt-2" :message="form.errors.content" />
                        </div>

                        <div class="pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-4">
                            <button 
                                type="button" 
                                @click="closeModal"
                                class="px-8 py-3 text-text-secondary font-bold hover:bg-surface-alt rounded-full transition-all text-center"
                            >
                                Guardar como borrador
                            </button>
                            <button 
                                type="submit" 
                                class="px-8 py-3 bg-primary text-white dark:text-background font-black rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 text-center"
                                :disabled="form.processing"
                            >
                                {{ editingDevotional ? 'Actualizar Reflexión' : 'Guardar Reflexión' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </AuthenticatedLayout>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
