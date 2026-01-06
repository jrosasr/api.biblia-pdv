<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import BibleHeader from '@/Components/BibleHeader.vue';
import AboutModal from '@/Components/AboutModal.vue';
import Editor from '@/Components/Editor.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    devotionals: Array,
});

const isAboutModalOpen = ref(false);
const isCreateModalOpen = ref(false);
const editingDevotional = ref(null);
const isDark = ref(document.documentElement.classList.contains('dark'));

const form = useForm({
    title: '',
    content: { blocks: [] },
});

function toggleTheme() {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

const openCreateModal = () => {
    editingDevotional.value = null;
    form.reset();
    form.content = { blocks: [] };
    isCreateModalOpen.value = true;
};

const openEditModal = (devotional) => {
    editingDevotional.value = devotional;
    form.title = devotional.title;
    form.content = devotional.content;
    isCreateModalOpen.value = true;
};

const closeModal = () => {
    isCreateModalOpen.value = false;
    form.reset();
    editingDevotional.value = null;
};

const submit = () => {
    if (editingDevotional.value) {
        form.put(route('user-devotionals.update', editingDevotional.value.id), {
            onSuccess: () => closeModal(),
            preserveScroll: true,
        });
    } else {
        form.post(route('user-devotionals.store'), {
            onSuccess: () => closeModal(),
            preserveScroll: true,
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

onMounted(() => {
    if (isDark.value) document.documentElement.classList.add('dark');
});
</script>

<template>
    <Head title="Mi Diario Espiritual" />

    <div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans pb-20">
        <BibleHeader 
            :isDark="isDark"
            :showVersionSelector="false"
            @toggleTheme="toggleTheme"
            @openAboutModal="isAboutModalOpen = true"
        />

        <main class="max-w-6xl mx-auto px-4 py-12">
            <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                <div>
                    <h1 class="text-4xl md:text-5xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Mi Diario Espiritual</h1>
                    <p class="text-[#8B6F47] dark:text-[#E3C598] font-bold mt-2">Un espacio para tus conversaciones con Dios.</p>
                </div>
                <button 
                    @click="openCreateModal"
                    class="px-8 py-4 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-full shadow-xl shadow-[#8B6F47]/20 dark:shadow-black/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Escribir hoy
                </button>
            </header>

            <div v-if="devotionals.length === 0" class="text-center py-32 bg-white/30 dark:bg-white/5 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm">
                <div class="w-24 h-24 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Aún no has escrito nada</h3>
                <p class="text-[#9B8D82] mt-3 max-w-md mx-auto font-medium">Empieza hoy mismo a registrar lo que Dios está haciendo en tu vida.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="devotional in devotionals" :key="devotional.id" class="group bg-white/50 dark:bg-white/5 p-8 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-sm hover:shadow-2xl hover:border-[#8B6F47]/30 transition-all flex flex-col min-h-[300px] backdrop-blur-sm">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-6">
                            <span class="px-4 py-1.5 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 text-[10px] font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] rounded-full">
                                {{ new Date(devotional.created_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }) }}
                            </span>
                        </div>
                        <h4 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] group-hover:text-[#8B6F47] dark:group-hover:text-[#E3C598] transition-colors line-clamp-2 leading-tight">{{ devotional.title }}</h4>
                    </div>
                    
                    <div class="mt-10 flex justify-between items-center border-t border-[#E0D5C9] dark:border-[#2E2A25] pt-8">
                        <div class="flex gap-3">
                            <button @click="openEditModal(devotional)" class="p-3 bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 hover:bg-[#8B6F47] dark:hover:bg-[#E3C598] hover:text-white dark:hover:text-[#111111] rounded-full transition-all text-[#8B6F47] dark:text-[#E3C598]" title="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button @click="deleteDevotional(devotional.id)" class="p-3 bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 hover:bg-red-500 hover:text-white rounded-full transition-all text-[#8B6F47] dark:text-[#E3C598]" title="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        <Link :href="route('user-devotionals.show', devotional.id)" class="text-sm font-black text-[#8B6F47] dark:text-[#E3C598] flex items-center gap-2 group/btn">
                            Leer reflexión
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </main>

        <!-- Create Modal (Aesthetic) -->
        <Transition name="fade">
            <div v-if="isCreateModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-xl" @click="closeModal"></div>
                <div class="relative w-full max-w-5xl bg-[#FFF8F0] dark:bg-[#111111] sm:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh] border border-[#E0D5C9] dark:border-[#2E2A25]">
                    <div class="p-8 md:p-12 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10">
                        <div>
                            <span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">{{ editingDevotional ? 'Editar entrada' : 'Nueva entrada' }}</span>
                            <h3 class="text-3xl md:text-4xl font-black text-[#3A3026] dark:text-[#F5F0E6] mt-1">{{ editingDevotional ? 'Actualizar Reflexión' : 'Escribir Reflexión' }}</h3>
                        </div>
                        <button @click="closeModal" class="p-4 rounded-full hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#3A3026] dark:text-[#F5F0E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="submit" class="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                        <div>
                            <InputLabel for="title" value="Título" class="mb-4 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" />
                            <input 
                                id="title"
                                v-model="form.title" 
                                type="text" 
                                class="w-full text-3xl md:text-5xl font-black bg-transparent border-none focus:ring-0 text-[#3A3026] dark:text-[#F5F0E6] placeholder-[#3A3026]/20 dark:placeholder-[#F5F0E6]/20 p-0"
                                placeholder="Dale un título a tu reflexión..."
                                required
                            />
                            <InputError class="mt-2" :message="form.errors.title" />
                        </div>

                        <div class="space-y-6">
                            <InputLabel value="Contenido" class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" />
                            <Editor v-model="form.content" placeholder="¿Qué puso Dios hoy en tu corazón? ..." />
                            <InputError class="mt-2" :message="form.errors.content" />
                        </div>

                        <div class="pt-12 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col sm:flex-row justify-end gap-6 pb-4">
                            <button 
                                type="button" 
                                @click="closeModal"
                                class="px-10 py-4 text-[#3A3026] dark:text-[#F5F0E6] font-black hover:bg-[#8B6F47]/5 dark:hover:bg-[#E3C598]/5 rounded-full transition-all text-center"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                class="px-12 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-full shadow-2xl shadow-[#8B6F47]/30 dark:shadow-black/40 hover:scale-105 transition-all disabled:opacity-50 text-center"
                                :disabled="form.processing"
                            >
                                {{ editingDevotional ? 'Actualizar en mi diario' : 'Guardar en mi diario' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <AboutModal 
            :isOpen="isAboutModalOpen"
            @close="isAboutModalOpen = false"
        />
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
}

:deep(.codex-editor__redactor) {
    padding-bottom: 100px !important;
}

:deep(.ce-block__content) {
    max-width: 1000px;
}
</style>
