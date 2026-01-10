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

    // Migration & Cleanup: Ensure list data matches exactly what the plugin expects (Nested format v2)
    // This removes extra properties like 'meta' that cause validation errors
    if (initialData.blocks) {
        initialData.blocks = initialData.blocks.map(block => {
            if (block.type === 'list' && block.data) {
                const cleanListItems = (items) => {
                    return (items || []).map(item => {
                        if (typeof item === 'string') {
                            return { content: item, items: [] };
                        }
                        if (typeof item === 'object' && item !== null) {
                            return {
                                content: item.content || '',
                                items: Array.isArray(item.items) ? cleanListItems(item.items) : []
                            };
                        }
                        return { content: String(item), items: [] };
                    });
                };

                block.data = {
                    style: block.data.style || 'unordered',
                    items: cleanListItems(block.data.items)
                };
            }
            return block;
        });
    }

    editor.value = new EditorJS({
        holder: 'editorjs',
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        data: initialData,
        tools: {
            header: {
                class: Header,
                inlineToolbar: true,
            },
            list: {
                class: List,
                inlineToolbar: true,
                config: {
                    defaultStyle: 'unordered'
                }
            },
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
    <div id="editorjs" class="prose prose-invert max-w-none border border-border rounded-xl p-6 bg-background text-text min-h-[400px] transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"></div>

</template>

<style>
/* EditorJS Theme Overrides */
.ce-block__content, .ce-toolbar__content {
    max-width: unset;
}

.codex-editor--narrow .ce-toolbox,
.codex-editor--narrow .ce-settings {
    background-color: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}

.ce-toolbar__plus,
.ce-toolbar__settings-btn {
    color: var(--text-secondary);
    background-color: var(--surface-alt);
    border-radius: 6px;
    transition: all 0.2s;
}

.ce-toolbar__plus:hover,
.ce-toolbar__settings-btn:hover {
    color: var(--primary);
    background-color: var(--surface);
}

.ce-popover {
    background: var(--surface) !important;
    border: 1px solid var(--border) !important;
    color: var(--text) !important;
    border-radius: 12px !important;
}

.ce-popover__item-icon {
    background: var(--surface-alt) !important;
    color: var(--primary) !important;
}

.ce-popover__item:hover {
    background: var(--surface-alt) !important;
}

.ce-popover__item-label {
    color: var(--text) !important;
}

.ce-popover__search {
    background: var(--background) !important;
    border-bottom: 1px solid var(--border) !important;
}

.ce-inline-toolbar {
    background: var(--surface) !important;
    border: 1px solid var(--border) !important;
    border-radius: 8px !important;
}

.ce-inline-tool {
    color: var(--text) !important;
}

.ce-inline-tool:hover {
    background: var(--surface-alt) !important;
    color: var(--primary) !important;
}

/* Fix for cursor color in dark background */
.ce-paragraph[data-placeholder]:empty::before {
    color: var(--text-tertiary) !important;
}

.ce-header {
    color: var(--primary);
    font-weight: 800;
}
</style>

