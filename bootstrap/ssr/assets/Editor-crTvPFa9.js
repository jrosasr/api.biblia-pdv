import { ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
const _sfc_main = {
  __name: "Editor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [Object, Array, String],
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: "Escribe tu devocional aquí..."
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editor = ref(null);
    onMounted(() => {
      let initialData = props.modelValue;
      if (typeof initialData === "string" && initialData.length > 0) {
        try {
          initialData = JSON.parse(initialData);
        } catch (e) {
          console.error("Invalid JSON for editor", e);
          initialData = {};
        }
      } else if (!initialData) {
        initialData = {};
      }
      if (initialData.blocks) {
        initialData.blocks = initialData.blocks.map((block) => {
          if (block.type === "list" && block.data) {
            const cleanListItems = (items) => {
              return (items || []).map((item) => {
                if (typeof item === "string") {
                  return { content: item, items: [] };
                }
                if (typeof item === "object" && item !== null) {
                  return {
                    content: item.content || "",
                    items: Array.isArray(item.items) ? cleanListItems(item.items) : []
                  };
                }
                return { content: String(item), items: [] };
              });
            };
            block.data = {
              style: block.data.style || "unordered",
              items: cleanListItems(block.data.items)
            };
          }
          return block;
        });
      }
      editor.value = new EditorJS({
        holder: "editorjs",
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        data: initialData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered"
            }
          }
        },
        onChange: async (api, event) => {
          const data = await api.saver.save();
          emit("update:modelValue", data);
        }
      });
    });
    onBeforeUnmount(() => {
      if (editor.value && editor.value.destroy) {
        editor.value.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "editorjs",
        class: "prose prose-invert max-w-none border border-border rounded-xl p-6 bg-background text-text min-h-[400px] transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
