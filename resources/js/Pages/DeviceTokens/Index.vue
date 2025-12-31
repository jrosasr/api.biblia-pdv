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
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dispositivos Registrados</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="$page.props.flash.success" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded transition-all duration-500">
                    {{ $page.props.flash.success }}
                </div>
                <div v-if="$page.props.flash.error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded transition-all duration-500">
                    {{ $page.props.flash.error }}
                </div>
                <div v-if="$page.props.errors.error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded transition-all duration-500">
                    {{ $page.props.errors.error }}
                </div>
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div v-if="tokens.length === 0" class="text-center py-4">
                            No hay dispositivos registrados.
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dispositivo</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Topics</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plataforma</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Último uso</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="token in tokens" :key="token.id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ token.device_name || 'Desconocido' }}</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ token.device_id }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {{ token.user ? token.user.name : 'Invitado' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <div class="flex flex-wrap gap-1">
                                                <span v-for="topic in token.topics" :key="topic" class="px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs rounded-full">
                                                    {{ topic }}
                                                </span>
                                                <span v-if="!token.topics || token.topics.length === 0" class="text-gray-400 italic">Ninguno</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {{ token.platform || 'N/A' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {{ formatDate(token.last_used_at) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button @click="openNotificationModal(token)" class="text-blue-600 dark:text-blue-400 hover:text-blue-900 mr-4 font-bold">Enviar Msg</button>
                                            <button @click="deleteToken(token.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
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
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Enviar mensaje a {{ selectedToken?.device_name || 'dispositivo' }}
                </h2>

                <div class="mt-6">
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

                <div class="mt-4">
                    <InputLabel for="body" value="Mensaje" />
                    <textarea
                        id="body"
                        v-model="form.body"
                        class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        rows="3"
                        placeholder="Contenido del mensaje"
                        required
                    ></textarea>
                    <InputError :message="form.errors.body" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeNotificationModal"> Cancelar </SecondaryButton>

                    <PrimaryButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="sendNotification"
                    >
                        Enviar
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>
