import { ref, onMounted, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { B as BibleHeader, _ as _sfc_main$5 } from "./AboutModal-BwJrT03Y.js";
import { _ as _sfc_main$4 } from "./BibleFooter-D0APqaEY.js";
import { _ as _sfc_main$3 } from "./Editor-crTvPFa9.js";
import { _ as _sfc_main$1 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$2 } from "./InputError-CAen27BF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@editorjs/editorjs";
import "@editorjs/header";
import "@editorjs/list";
const _sfc_main = {
  __name: "PublicIndex",
  __ssrInlineRender: true,
  props: {
    devotionals: Array
  },
  setup(__props) {
    const isAboutModalOpen = ref(false);
    const isCreateModalOpen = ref(false);
    const editingDevotional = ref(null);
    const isDark = ref(document.documentElement.classList.contains("dark"));
    const form = useForm({
      title: "",
      content: { blocks: [] }
    });
    function toggleTheme() {
      isDark.value = !isDark.value;
      if (isDark.value) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
    onMounted(() => {
      if (isDark.value) document.documentElement.classList.add("dark");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Mi Diario Espiritual" }, null, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans" data-v-34130acd>`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        showVersionSelector: false,
        onToggleTheme: toggleTheme,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(`<main class="max-w-6xl mx-auto px-4 py-12" data-v-34130acd><header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16" data-v-34130acd><div data-v-34130acd><h1 class="text-4xl md:text-5xl font-black text-[#3A3026] dark:text-[#F5F0E6]" data-v-34130acd>Mi Diario Espiritual</h1><p class="text-[#8B6F47] dark:text-[#E3C598] font-bold mt-2" data-v-34130acd>Un espacio para tus conversaciones con Dios.</p></div><button class="px-8 py-4 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-full shadow-xl shadow-[#8B6F47]/20 dark:shadow-black/20 hover:scale-105 transition-all flex items-center justify-center gap-3" data-v-34130acd><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-34130acd></path></svg> Escribir hoy </button></header>`);
      if (__props.devotionals.length === 0) {
        _push(`<div class="text-center py-32 bg-white/30 dark:bg-white/5 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm" data-v-34130acd><div class="w-24 h-24 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center mx-auto mb-6" data-v-34130acd><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-34130acd></path></svg></div><h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]" data-v-34130acd>Aún no has escrito nada</h3><p class="text-[#9B8D82] mt-3 max-w-md mx-auto font-medium" data-v-34130acd>Empieza hoy mismo a registrar lo que Dios está haciendo en tu vida.</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-34130acd><!--[-->`);
        ssrRenderList(__props.devotionals, (devotional) => {
          _push(`<div class="group bg-white/50 dark:bg-white/5 p-8 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-sm hover:shadow-2xl hover:border-[#8B6F47]/30 transition-all flex flex-col min-h-[300px] backdrop-blur-sm" data-v-34130acd><div class="flex-1" data-v-34130acd><div class="flex items-center gap-2 mb-6" data-v-34130acd><span class="px-4 py-1.5 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 text-[10px] font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] rounded-full" data-v-34130acd>${ssrInterpolate(new Date(devotional.created_at).toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" }))}</span></div><h4 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] group-hover:text-[#8B6F47] dark:group-hover:text-[#E3C598] transition-colors line-clamp-2 leading-tight" data-v-34130acd>${ssrInterpolate(devotional.title)}</h4></div><div class="mt-10 flex justify-between items-center border-t border-[#E0D5C9] dark:border-[#2E2A25] pt-8" data-v-34130acd><div class="flex gap-3" data-v-34130acd><button class="p-3 bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 hover:bg-[#8B6F47] dark:hover:bg-[#E3C598] hover:text-white dark:hover:text-[#111111] rounded-full transition-all text-[#8B6F47] dark:text-[#E3C598]" title="Editar" data-v-34130acd><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-34130acd></path></svg></button><button class="p-3 bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 hover:bg-red-500 hover:text-white rounded-full transition-all text-[#8B6F47] dark:text-[#E3C598]" title="Eliminar" data-v-34130acd><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-34130acd></path></svg></button></div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("user-devotionals.show", devotional.id),
            class: "text-sm font-black text-[#8B6F47] dark:text-[#E3C598] flex items-center gap-2 group/btn"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Leer reflexión <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-34130acd${_scopeId}></path></svg>`);
              } else {
                return [
                  createTextVNode(" Leer reflexión "),
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "w-5 h-5 group-hover/btn:translate-x-1 transition-transform",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M17 8l4 4m0 0l-4 4m4-4H3"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</main>`);
      if (isCreateModalOpen.value) {
        _push(`<div class="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6" data-v-34130acd><div class="absolute inset-0 bg-black/70 backdrop-blur-xl" data-v-34130acd></div><div class="relative w-full max-w-5xl bg-[#FFF8F0] dark:bg-[#111111] sm:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh] border border-[#E0D5C9] dark:border-[#2E2A25]" data-v-34130acd><div class="p-8 md:p-12 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10" data-v-34130acd><div data-v-34130acd><span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" data-v-34130acd>${ssrInterpolate(editingDevotional.value ? "Editar entrada" : "Nueva entrada")}</span><h3 class="text-3xl md:text-4xl font-black text-[#3A3026] dark:text-[#F5F0E6] mt-1" data-v-34130acd>${ssrInterpolate(editingDevotional.value ? "Actualizar Reflexión" : "Escribir Reflexión")}</h3></div><button class="p-4 rounded-full hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 transition-colors" data-v-34130acd><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#3A3026] dark:text-[#F5F0E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-34130acd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-34130acd></path></svg></button></div><form class="flex-1 overflow-y-auto p-8 md:p-12 space-y-12" data-v-34130acd><div data-v-34130acd>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "title",
          value: "Título",
          class: "mb-4 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"
        }, null, _parent));
        _push(`<input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" class="w-full text-3xl md:text-5xl font-black bg-transparent border-none focus:ring-0 text-[#3A3026] dark:text-[#F5F0E6] placeholder-[#3A3026]/20 dark:placeholder-[#F5F0E6]/20 p-0" placeholder="Dale un título a tu reflexión..." required data-v-34130acd>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "mt-2",
          message: unref(form).errors.title
        }, null, _parent));
        _push(`</div><div class="space-y-6" data-v-34130acd>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Contenido",
          class: "text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          modelValue: unref(form).content,
          "onUpdate:modelValue": ($event) => unref(form).content = $event,
          placeholder: "¿Qué puso Dios hoy en tu corazón? ..."
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "mt-2",
          message: unref(form).errors.content
        }, null, _parent));
        _push(`</div><div class="pt-12 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col sm:flex-row justify-end gap-6 pb-4" data-v-34130acd><button type="button" class="px-10 py-4 text-[#3A3026] dark:text-[#F5F0E6] font-black hover:bg-[#8B6F47]/5 dark:hover:bg-[#E3C598]/5 rounded-full transition-all text-center" data-v-34130acd> Cancelar </button><button type="submit" class="px-12 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-full shadow-2xl shadow-[#8B6F47]/30 dark:shadow-black/40 hover:scale-105 transition-all disabled:opacity-50 text-center"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-34130acd>${ssrInterpolate(editingDevotional.value ? "Actualizar en mi diario" : "Guardar en mi diario")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, {
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        isOpen: isAboutModalOpen.value,
        onClose: ($event) => isAboutModalOpen.value = false
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserDevotionals/PublicIndex.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PublicIndex = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34130acd"]]);
export {
  PublicIndex as default
};
