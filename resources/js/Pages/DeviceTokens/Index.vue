<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import DangerButton from '@/Components/DangerButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Modal from '@/Components/Modal.vue';
import { ref } from 'vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';

defineProps({
    tokens: Array,
});

const showingNotificationModal = ref(false);
const selectedToken = ref(null);

const form = useForm({
    title: '',
    body: '',
});

const openNotificationModal = (token) => {
    selectedToken.value = token;
    showingNotificationModal.value = true;
};

const closeNotificationModal = () => {
    showingNotificationModal.value = false;
    form.reset();
};

const sendNotification = () => {
    form.post(route('device-tokens.send', selectedToken.value.id), {
        onSuccess: () => {
            closeNotificationModal();
            // alert('Notificación enviada correctamente');
        },
        onError: (errors) => {
            console.error(errors);
        }
    });
};

const deleteToken = (id) => {
    if (confirm('¿Estás seguro de eliminar este dispositivo?')) {
        router.delete(route('device-tokens.destroy', id));
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString('es-ES');
};
</script>

<template>
    <Head title="Dispositivos" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl text-primary leading-tight">Dispositivos Registrados</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="$page.props.flash.success" class="mb-4 p-4 bg-green-100/10 border border-green-500 text-green-600 rounded-xl transition-all duration-500 font-bold text-sm">
                    {{ $page.props.flash.success }}
                </div>
                <div v-if="$page.props.flash.error" class="mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm">
                    {{ $page.props.flash.error }}
                </div>
                <div v-if="$page.props.errors.error" class="mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm">
                    {{ $page.props.errors.error }}
                </div>

                <div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                    <div class="p-6 text-text">
                        <div v-if="tokens.length === 0" class="text-center py-8 text-text-tertiary font-medium">
                            No hay dispositivos registrados.
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-border">
                                <thead class="bg-surface-alt/50">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Dispositivo</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Usuario</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Topics</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Plataforma</th>
                                        <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider">Último uso</th>
                                        <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-surface divide-y divide-border">
                                    <tr v-for="token in tokens" :key="token.id" class="hover:bg-surface-alt/30 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-bold text-text">{{ token.device_name || 'Desconocido' }}</div>
                                            <div class="text-[10px] text-text-tertiary font-medium truncate max-w-xs">{{ token.device_id }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">
                                            {{ token.user ? token.user.name : 'Invitado' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <div class="flex flex-wrap gap-1">
                                                <span v-for="topic in token.topics" :key="topic" class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full tracking-tighter">
                                                    {{ topic }}
                                                </span>
                                                <span v-if="!token.topics || token.topics.length === 0" class="text-text-tertiary italic text-xs">Ninguno</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">
                                            {{ token.platform || 'N/A' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">
                                            {{ formatDate(token.last_used_at) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                                            <button @click="openNotificationModal(token)" class="text-primary hover:opacity-80 transition-opacity mr-4">Enviar Msg</button>
                                            <button @click="deleteToken(token.id)" class="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal :show="showingNotificationModal" @close="closeNotificationModal">
            <div class="p-8 bg-surface text-text">
                <h2 class="text-xl font-bold text-primary mb-2">
                    Enviar mensaje
                </h2>
                <p class="text-sm text-text-secondary mb-6">
                    A: <span class="font-bold text-text">{{ selectedToken?.device_name || 'dispositivo' }}</span>
                </p>

                <div class="space-y-4">
                    <div>
                        <InputLabel for="title" value="Título" />
                        <TextInput
                            id="title"
                            v-model="form.title"
                            type="text"
                            class="mt-1 block w-full"
                            placeholder="Título de la notificación"
                            required
                        />
                        <InputError :message="form.errors.title" class="mt-2" />
                    </div>

                    <div>
                        <InputLabel for="body" value="Mensaje" />
                        <textarea
                            id="body"
                            v-model="form.body"
                            class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                            rows="3"
                            placeholder="Contenido del mensaje"
                            required
                        ></textarea>
                        <InputError :message="form.errors.body" class="mt-2" />
                    </div>
                </div>

                <div class="mt-8 flex justify-end gap-3 font-bold">
                    <SecondaryButton @click="closeNotificationModal"> Cancelar </SecondaryButton>

                    <PrimaryButton
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="sendNotification"
                    >
                        Enviar Notificación
                    </PrimaryButton>
                </div>
            </div>
        </Modal>

    </AuthenticatedLayout>
</template>
