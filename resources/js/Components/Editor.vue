<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const props = defineProps({
    modelValue: {
        type: [Object, Array, String],
        default: () => ({})
    },
    placeholder: {
        type: String,
        default: 'Escribe tu devocional aquí...'
    },
    readOnly: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);
const editor = ref(null);

onMounted(() => {
    // Parse modelValue if it's a string (JSON) or use directly if object
    let initialData = props.modelValue;
    if (typeof initialData === 'string' && initialData.length > 0) {
        try {
            initialData = JSON.parse(initialData);
        } catch (e) {
            console.error('Invalid JSON for editor', e);
            initialData = {};
        }
    } else if (!initialData) {
        initialData = {};
    }

    editor.value = new EditorJS({
        holder: 'editorjs',
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        data: initialData,
        tools: {
            header: Header,
            list: List,
        },
        onChange: async (api, event) => {
             const data = await api.saver.save();
             emit('update:modelValue', data); // Emit object
        }
    });
});

onBeforeUnmount(() => {
    if (editor.value && editor.value.destroy) {
        editor.value.destroy();
    }
});
</script>

<template>
    <div id="editorjs" class="prose max-w-none border rounded-md p-4 bg-white dark:bg-gray-800 dark:text-gray-100 min-h-[300px]"></div>
</template>

<style>
/* Add some overrides for dark mode if needed, though 'prose' and dark: classes help */
.ce-block__content, .ce-toolbar__content {
    max-width: unset; /* Allow full width */
}
</style>
