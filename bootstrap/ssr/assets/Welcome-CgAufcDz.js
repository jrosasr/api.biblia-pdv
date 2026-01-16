import { mergeProps, unref, withCtx, createTextVNode, useSSRContext, computed, toDisplayString, ref, onMounted, createVNode, resolveDynamicComponent, createBlock, openBlock } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderVNode } from "vue/server-renderer";
import { Link, useForm, Head, router } from "@inertiajs/vue3";
import axios from "axios";
import { B as BibleHeader, _ as _sfc_main$b } from "./AboutModal-BwJrT03Y.js";
import { _ as _sfc_main$a } from "./BibleFooter-D0APqaEY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$9 = {
  __name: "BibleBreadcrumbs",
  __ssrInlineRender: true,
  props: {
    selectedBook: Object,
    selectedChapter: Number
  },
  emits: ["openBookModal"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "flex mb-6 text-sm text-[#8B6F47] dark:text-[#9B8D82] overflow-x-auto whitespace-nowrap pb-2",
        "aria-label": "Breadcrumb"
      }, _attrs))}><ol class="flex items-center space-x-2"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "hover:text-[#3A3026] dark:hover:text-[#F5F0E6]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Inicio`);
          } else {
            return [
              createTextVNode("Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="flex items-center space-x-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg><span class="hover:text-[#3A3026] dark:hover:text-[#F5F0E6] cursor-pointer">${ssrInterpolate(__props.selectedBook?.name)}</span></li><li class="flex items-center space-x-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg><span class="font-bold text-[#3A3026] dark:text-[#F5F0E6]">Capítulo ${ssrInterpolate(__props.selectedChapter)}</span></li></ol></nav>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleBreadcrumbs.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "BibleChapterHeader",
  __ssrInlineRender: true,
  props: {
    selectedBook: Object,
    selectedChapter: Number
  },
  emits: ["openBookModal", "prevChapter", "nextChapter"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center mb-8" }, _attrs))}><div class="text-center cursor-pointer group"><h2 class="text-[#6B5D52] dark:text-[#CFC6B8] text-lg font-medium">${ssrInterpolate(__props.selectedBook?.name)}</h2><h1 class="text-3xl font-bold text-[#3A3026] dark:text-[#F5F0E6] flex items-center gap-2"> Capítulo ${ssrInterpolate(__props.selectedChapter)} <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598] group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></h1></div><div class="mt-4 flex gap-4"><button class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="p-3 rounded-full bg-[#F5EBE0] dark:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#8B6F47] hover:text-white dark:hover:bg-[#E3C598] dark:hover:text-[#111111] transition-all"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleChapterHeader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "BibleVerseList",
  __ssrInlineRender: true,
  props: {
    verses: Array,
    selectedVerses: Array,
    isLoading: Boolean
  },
  emits: ["toggleSelection"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 leading-relaxed mb-20" }, _attrs))}>`);
      if (__props.isLoading) {
        _push(`<div class="flex flex-col items-center justify-center py-20 gap-4"><div class="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]"></div><span class="text-[#9B8D82] animate-pulse">Cargando Palabra de Vida...</span></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(__props.verses, (v) => {
          _push(`<div class="flex flex-col gap-1">`);
          if (v.title) {
            _push(`<h3 class="text-lg font-black uppercase tracking-[0.25em] text-[#8B6F47] dark:text-[#E3C598] mt-8 mb-4 px-3 border-l-2 border-[#8B6F47]/20 dark:border-[#E3C598]/20">${ssrInterpolate(v.title)}</h3>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div${ssrRenderAttr("id", `verse-${v.verse}`)} class="${ssrRenderClass([
            "group flex gap-5 items-start p-3 rounded-xl transition-all duration-300 cursor-pointer select-none",
            __props.selectedVerses.find((sel) => sel.id === v.id) ? "bg-[#8B6F47]/20 dark:bg-[#E3C598]/20 translate-x-2" : "hover:bg-[#8B6F47]/5 dark:hover:bg-[#E3C598]/5"
          ])}"><span class="${ssrRenderClass([__props.selectedVerses.find((sel) => sel.id === v.id) ? "text-[#8B6F47] dark:text-[#E3C598] opacity-100" : "text-[#8B6F47] dark:text-[#E3C598] opacity-60", "font-bold text-xs mt-2.5 min-w-[1.5rem] tracking-tighter transition-colors"])}">${ssrInterpolate(v.verse)}</span><p class="${ssrRenderClass([__props.selectedVerses.find((sel) => sel.id === v.id) ? "text-[#3A3026] dark:text-[#F5F0E6] font-medium" : "text-[#3A3026] dark:text-[#F5F0E6] group-hover:text-black dark:group-hover:text-white", "text-xl md:text-2xl transition-colors duration-200"])}">${ssrInterpolate(v.text)}</p></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleVerseList.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "BibleSelectionBar",
  __ssrInlineRender: true,
  props: {
    selectedVerses: Array,
    isCopied: Boolean
  },
  emits: ["copyVerses", "openNoteModal", "clearSelection"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.selectedVerses.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-8 left-0 right-0 z-40 px-4 flex justify-center" }, _attrs))}><div class="bg-[#3A3026] dark:bg-[#E3C598] text-[#F5F0E6] dark:text-[#3A3026] rounded-full shadow-2xl px-6 py-3 flex items-center gap-6"><span class="font-bold text-sm">${ssrInterpolate(__props.selectedVerses.length)} seleccionado${ssrInterpolate(__props.selectedVerses.length > 1 ? "s" : "")}</span><div class="h-6 w-px bg-white/20 dark:bg-black/20"></div><button class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">`);
        if (!__props.isCopied) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
        }
        _push(`<span class="${ssrRenderClass({ "text-green-400": __props.isCopied })}">${ssrInterpolate(__props.isCopied ? "Copiado" : "Copiar")}</span></button><div class="h-6 w-px bg-white/20 dark:bg-black/20"></div><button class="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> Favorito <span class="hidden sm:inline">&amp; Nota</span></button><button class="p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleSelectionBar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "BookSelectionModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    booksList: Array,
    selectedBook: Object,
    selectedChapter: Number,
    expandedBookId: Number,
    expandedBookChapters: Array,
    testamentFilter: Number
  },
  emits: ["close", "expandBook", "navigateToChapter", "setTestamentFilter"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const filteredBooks = computed(() => {
      return props.booksList.filter((b) => {
        if (props.testamentFilter === 1) {
          return b.id <= 39;
        } else {
          return b.id >= 40;
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" }, _attrs))}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"><div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25]"><div class="flex justify-between items-center mb-6"><h3 class="text-2xl font-bold">Seleccionar Libro</h3><button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex gap-2 bg-[#F5EBE0] dark:bg-[#222222] p-1 rounded-xl"><button class="${ssrRenderClass([__props.testamentFilter === 1 ? "bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]" : "text-[#9B8D82]", "flex-1 py-2 text-sm font-bold rounded-lg transition-all"])}">Antiguo Testamento</button><button class="${ssrRenderClass([__props.testamentFilter === 2 ? "bg-white dark:bg-[#1C1C1C] shadow-sm text-[#8B6F47] dark:text-[#E3C598]" : "text-[#9B8D82]", "flex-1 py-2 text-sm font-bold rounded-lg transition-all"])}">Nuevo Testamento</button></div></div><div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
        ssrRenderList(filteredBooks.value, (book) => {
          _push(`<div class="space-y-4"><button class="${ssrRenderClass([__props.expandedBookId === book.id ? "bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 border-[#8B6F47] dark:border-[#E3C598]" : "border-transparent hover:bg-[#F5EBE0] dark:hover:bg-[#222222]", "w-full text-left p-4 rounded-2xl border transition-all group"])}"><div class="flex justify-between items-center"><span class="${ssrRenderClass([__props.expandedBookId === book.id ? "text-[#8B6F47] dark:text-[#E3C598]" : "", "font-bold text-lg"])}">${ssrInterpolate(book.name)}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([__props.expandedBookId === book.id ? "rotate-180 opacity-100" : "opacity-0 group-hover:opacity-100", "w-5 h-5 transition-transform text-[#8B6F47] dark:text-[#E3C598]"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></button>`);
          if (__props.expandedBookId === book.id) {
            _push(`<div class="grid grid-cols-5 sm:grid-cols-8 gap-2 px-1 pb-4"><!--[-->`);
            ssrRenderList(__props.expandedBookChapters, (ch) => {
              _push(`<button class="${ssrRenderClass([__props.selectedBook.id === book.id && __props.selectedChapter === ch ? "bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]" : "bg-[#F5EBE0] dark:bg-[#222222] hover:bg-[#8B6F47]/20 dark:hover:bg-[#E3C598]/20", "h-10 rounded-lg text-sm font-bold transition-all"])}">${ssrInterpolate(ch)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BookSelectionModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "VersionSelectionModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    versions: Array,
    selectedVersion: String
  },
  emits: ["close", "selectVersion"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" }, _attrs))}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><div class="relative w-full max-w-md bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"><div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center"><h3 class="text-xl font-bold">Versión de la Biblia</h3><button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222]"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto"><!--[-->`);
        ssrRenderList(__props.versions, (v) => {
          _push(`<button class="${ssrRenderClass([__props.selectedVersion === v ? "bg-[#8B6F47] text-white dark:bg-[#E3C598] dark:text-[#111111]" : "hover:bg-[#F5EBE0] dark:hover:bg-[#222222]", "w-full text-left px-5 py-4 rounded-2xl font-bold text-lg transition-all"])}">${ssrInterpolate(v)}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/VersionSelectionModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "FavoriteNoteModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    selectedVerses: Array,
    processing: Boolean,
    modelValue: String
  },
  emits: ["close", "save", "update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" }, _attrs))}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><div class="relative w-full max-w-lg bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"><div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#F5EBE0] dark:bg-[#222222]"><h3 class="text-xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Guardar Favorito</h3><button class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#3A3026] dark:text-[#F5F0E6]"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 space-y-4"><div class="bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 p-4 rounded-xl border border-[#8B6F47]/10 dark:border-[#E3C598]/10 max-h-32 overflow-y-auto"><p class="text-sm text-[#8B6F47] dark:text-[#E3C598] font-bold mb-2">Versículos seleccionados:</p><!--[-->`);
        ssrRenderList(__props.selectedVerses, (v) => {
          _push(`<div class="flex gap-2 text-[#3A3026] dark:text-[#F5F0E6] text-sm mb-1"><span class="font-black">${ssrInterpolate(v.verse)}:</span><span class="truncate">${ssrInterpolate(v.text)}</span></div>`);
        });
        _push(`<!--]--></div><div><label class="block text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-2">Nota Personal (Opcional)</label><textarea rows="4" class="w-full bg-white dark:bg-[#111111] border-2 border-[#E0D5C9] dark:border-[#2E2A25] rounded-2xl p-4 focus:border-[#8B6F47] dark:focus:border-[#E3C598] focus:ring-0 transition-all text-[#3A3026] dark:text-[#F5F0E6] font-medium resize-none" placeholder="Escribe una reflexión sobre estos versículos...">${ssrInterpolate(__props.modelValue)}</textarea></div><button${ssrIncludeBooleanAttr(__props.processing) ? " disabled" : ""} class="w-full py-4 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-2xl hover:brightness-110 transition-all disabled:opacity-50">${ssrInterpolate(__props.processing ? "Guardando..." : "Guardar en Favoritos")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FavoriteNoteModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AppDownloadModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean
  },
  emits: ["close", "openPlayStore", "alreadyHaveApp"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4" }, _attrs))}><div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div><div class="relative w-full max-w-md bg-gradient-to-br from-[#FFF8F0] to-[#F5EBE0] dark:from-[#1C1C1C] dark:to-[#111111] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8B6F47] dark:border-[#E3C598]"><button class="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 transition-all z-10"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="p-8 text-center"><div class="mb-6 flex justify-center"><div class="w-24 h-24 bg-gradient-to-br from-[#8B6F47] to-[#6B5D52] dark:from-[#E3C598] dark:to-[#CFC6B8] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300"><img src="/icon.webp" alt="Logo" class="w-24 h-24"></div></div><h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] mb-3"> ¡Lleva la Palabra de Vida contigo! </h3><p class="text-[#6B5D52] dark:text-[#CFC6B8] mb-6 leading-relaxed"> Descarga nuestra app y accede a la Biblia, devocionales diarios y mucho más desde tu dispositivo móvil. </p><div class="mb-8 space-y-3 text-left"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Lectura sin conexión</span></div><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Devocionales diarios</span></div><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><span class="text-sm font-medium text-[#3A3026] dark:text-[#F5F0E6]">Múltiples versiones de la Biblia</span></div></div><button class="w-full group relative overflow-hidden"><img src="/disponible-en-google-play-badge.webp" alt="Disponible en Google Play" class="w-3/4 h-12 max-w-[150px] mx-auto transform group-hover:scale-105 transition-transform duration-300 hover:drop-shadow-2xl"></button><button class="mt-4 w-full py-2 px-4 rounded-xl bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 text-[#8B6F47] dark:text-[#E3C598] font-semibold hover:bg-[#8B6F47]/20 dark:hover:bg-[#E3C598]/20 transition-all"> Ya tengo la app </button><button class="mt-4 text-sm text-[#9B8D82] hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-colors underline"> Continuar en la web </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppDownloadModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "BibleSEOLinks",
  __ssrInlineRender: true,
  props: {
    booksList: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] mt-10" }, _attrs))}><h3 class="text-sm font-bold uppercase tracking-widest text-[#8B6F47] mb-6 text-center">Libros de la Biblia</h3><div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"><!--[-->`);
      ssrRenderList(__props.booksList, (book) => {
        _push(ssrRenderComponent(unref(Link), {
          key: book.id,
          href: _ctx.route("bible.show", { book: book.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") }),
          class: "text-xs text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors text-center p-2 rounded-lg hover:bg-white dark:hover:bg-white/5 shadow-sm border border-transparent hover:border-[#E0D5C9] dark:hover:border-[#2E2A25]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(book.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(book.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleSEOLinks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    versions: Array,
    books: Array,
    initialChapters: Array,
    initialVerses: Array,
    initialVersion: String,
    initialBook: Number,
    initialChapter: Number,
    seo: Object
  },
  setup(__props) {
    const props = __props;
    const structuredData = computed(() => {
      if (!selectedBook.value || !selectedChapter.value) return null;
      return {
        "@context": "https://schema.org",
        "@type": "BiblePassage",
        "name": `${selectedBook.value.name} ${selectedChapter.value}`,
        "description": props.seo?.description || `Lectura de ${selectedBook.value.name} capítulo ${selectedChapter.value}`,
        "url": typeof window !== "undefined" ? window.location.href : "",
        "language": "es",
        "publisher": {
          "@type": "Organization",
          "name": "Biblia Palabra de Vida",
          "url": "https://biblia-palabradevida.com"
        }
      };
    });
    const selectedVersion = computed(() => props.initialVersion);
    const selectedBook = computed(() => props.books.find((b) => b.id === props.initialBook) || props.books[0]);
    const selectedChapter = computed(() => props.initialChapter);
    const versesList = computed(() => props.initialVerses);
    const booksList = computed(() => props.books);
    const chaptersList = computed(() => props.initialChapters);
    const isLoading = ref(false);
    const isBookModalOpen = ref(false);
    const isVersionModalOpen = ref(false);
    const isAboutModalOpen = ref(false);
    const isNoteModalOpen = ref(false);
    const isAppDownloadModalOpen = ref(false);
    const isCopied = ref(false);
    const testamentFilter = ref(1);
    const expandedBookId = ref(null);
    const expandedBookChapters = ref([]);
    const selectedVerses = ref([]);
    const noteForm = useForm({
      note: ""
    });
    const isDark = ref(typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false);
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
    const visit = (params) => {
      isLoading.value = true;
      let bookName = selectedBook.value.name;
      if (params.book) {
        const book = booksList.value.find((b) => b.id === params.book);
        if (book) bookName = book.name;
      }
      const bookSlug = bookName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
      router.get(route("bible.show", { book: bookSlug, chapter: params.chapter || 1 }), { version: params.version || selectedVersion.value }, {
        preserveScroll: true,
        preserveState: true,
        only: ["books", "initialChapters", "initialVerses", "initialVersion", "initialBook", "initialChapter", "seo"],
        onFinish: () => {
          isLoading.value = false;
          isBookModalOpen.value = false;
          isVersionModalOpen.value = false;
        }
      });
    };
    function handleVersionChange(version) {
      visit({ version, book: selectedBook.value.id, chapter: 1 });
    }
    async function expandBook(book) {
      if (expandedBookId.value === book.id) {
        expandedBookId.value = null;
        return;
      }
      expandedBookId.value = book.id;
      expandedBookChapters.value = [];
      try {
        const response = await axios.get(`/es/api/bible/chapters/${selectedVersion.value}/${book.id}`);
        expandedBookChapters.value = response.data;
      } catch (e) {
        console.error("Failed to fetch chapters for modal", e);
      }
    }
    function navigateToChapter(bookId, chapter) {
      visit({ version: selectedVersion.value, book: bookId, chapter });
    }
    function navigateToSearchResult(result) {
      visit({ version: selectedVersion.value, book: result.book_id, chapter: result.chapter });
    }
    function prevChapter() {
      if (selectedChapter.value > 1) {
        navigateToChapter(selectedBook.value.id, selectedChapter.value - 1);
      } else {
        const idx = booksList.value.findIndex((b) => b.id === selectedBook.value.id) - 1;
        if (idx >= 0) navigateToChapter(booksList.value[idx].id, 1);
      }
    }
    function nextChapter() {
      const maxChapter = chaptersList.value[chaptersList.value.length - 1];
      if (selectedChapter.value < maxChapter) {
        navigateToChapter(selectedBook.value.id, selectedChapter.value + 1);
      } else {
        const idx = booksList.value.findIndex((b) => b.id === selectedBook.value.id) + 1;
        if (idx < booksList.value.length) navigateToChapter(booksList.value[idx].id, 1);
      }
    }
    function toggleSelection(verse) {
      const index = selectedVerses.value.findIndex((v) => v.id === verse.id);
      if (index === -1) selectedVerses.value.push(verse);
      else selectedVerses.value.splice(index, 1);
    }
    function saveFavorites() {
      const favorites = selectedVerses.value.map((verse) => ({
        id: `${selectedVersion.value}-${selectedBook.value.id}-${selectedChapter.value}-${verse.verse}`,
        versionId: selectedVersion.value,
        bookNumber: selectedBook.value.id,
        bookName: selectedBook.value.name,
        chapter: selectedChapter.value,
        verse: verse.verse,
        text: verse.text,
        note: noteForm.note
      }));
      noteForm.transform((data) => ({ favorites })).post(route("favorites.store"), {
        onSuccess: () => {
          selectedVerses.value = [];
          isNoteModalOpen.value = false;
        }
      });
    }
    function copyVerses() {
      const sortedVerses = [...selectedVerses.value].sort((a, b) => a.verse - b.verse);
      const versesText = sortedVerses.map((v) => `${v.verse}. ${v.text}`).join("\n");
      const reference = `${selectedBook.value.name} ${selectedChapter.value}:${sortedVerses.map((v) => v.verse).join(", ")}`;
      const bookSlug = selectedBook.value.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
      const url = `https://biblia-palabradevida.com/es/leer/${bookSlug}/${selectedChapter.value}`;
      const finalContent = `${reference}
${versesText}

Compartido desde ${url}`;
      navigator.clipboard.writeText(finalContent).then(() => {
        isCopied.value = true;
        setTimeout(() => isCopied.value = false, 2e3);
      });
    }
    function trackEvent(type, event, name, description = null) {
      axios.post("/es/api/statistics/track", {
        type,
        event,
        name,
        description
      }).catch((e) => console.error("Tracking error", e));
    }
    function closeAppDownloadModal() {
      isAppDownloadModalOpen.value = false;
      const nextShowTime = Date.now() + 5 * 60 * 60 * 1e3;
      localStorage.setItem("appDownloadModalNextShow", nextShowTime.toString());
    }
    function handleAlreadyHaveApp() {
      isAppDownloadModalOpen.value = false;
      localStorage.setItem("userHasApp", "true");
      trackEvent("click", "app_android_already_installed", "Usuario ya tiene App", "El usuario indicó que ya tiene la app instalada");
    }
    function openPlayStore() {
      trackEvent("click", "app_download_android", "Descarga APP Android", "Click en imagen para ir a PlayStore");
      window.open("https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida", "_blank");
      closeAppDownloadModal();
    }
    onMounted(() => {
      if (isDark.value) document.documentElement.classList.add("dark");
      expandedBookId.value = props.initialBook;
      expandedBookChapters.value = props.initialChapters;
      const verse = new URLSearchParams(window.location.search).get("verse");
      if (verse) {
        setTimeout(() => {
          const el = document.getElementById(`verse-${verse}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 800);
      }
      const userHasApp = localStorage.getItem("userHasApp");
      if (userHasApp === "true") {
        return;
      }
      const nextShowTime = localStorage.getItem("appDownloadModalNextShow");
      const currentTime = Date.now();
      if (!nextShowTime || currentTime >= parseInt(nextShowTime)) {
        setTimeout(() => {
          isAppDownloadModalOpen.value = true;
          trackEvent("impression", "app_download_android", "Descarga APP Android", "Se mostró el modal de invitación");
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.seo?.title || "Biblia - Palabra de Vida")}</title><meta name="description"${ssrRenderAttr("content", __props.seo?.description)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo?.title)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo?.description)}${_scopeId}><meta property="og:type" content="book"${_scopeId}><meta name="twitter:card" content="summary"${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(JSON.stringify(structuredData.value))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(JSON.stringify(structuredData.value)), 1)
                  ];
                }
              }),
              _: 1
            }), _parent2, _scopeId);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.seo?.title || "Biblia - Palabra de Vida"), 1),
              createVNode("meta", {
                name: "description",
                content: __props.seo?.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: __props.seo?.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: __props.seo?.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "book"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary"
              }),
              (openBlock(), createBlock(resolveDynamicComponent("script"), { type: "application/ld+json" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(JSON.stringify(structuredData.value)), 1)
                ]),
                _: 1
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        selectedVersion: selectedVersion.value,
        onToggleTheme: toggleTheme,
        onOpenVersionModal: ($event) => isVersionModalOpen.value = true,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true,
        onNavigateToSearchResult: navigateToSearchResult
      }, null, _parent));
      _push(`<main class="max-w-4xl mx-auto px-4 py-8 relative">`);
      _push(ssrRenderComponent(_sfc_main$9, {
        selectedBook: selectedBook.value,
        selectedChapter: selectedChapter.value,
        onOpenBookModal: ($event) => isBookModalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$8, {
        selectedBook: selectedBook.value,
        selectedChapter: selectedChapter.value,
        onOpenBookModal: ($event) => isBookModalOpen.value = true,
        onPrevChapter: prevChapter,
        onNextChapter: nextChapter
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, {
        verses: versesList.value,
        selectedVerses: selectedVerses.value,
        isLoading: isLoading.value,
        onToggleSelection: toggleSelection
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        selectedVerses: selectedVerses.value,
        isCopied: isCopied.value,
        onCopyVerses: copyVerses,
        onOpenNoteModal: ($event) => isNoteModalOpen.value = true,
        onClearSelection: ($event) => selectedVerses.value = []
      }, null, _parent));
      _push(`<div class="mt-16 flex justify-between border-t border-[#E0D5C9] dark:border-[#2E2A25] pt-10 pb-20"><button class="text-left group"><span class="text-sm text-[#9B8D82]">Anterior</span><div class="flex items-center gap-2 group-hover:-translate-x-1 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg><span class="text-lg font-bold">Capítulo ${ssrInterpolate(selectedChapter.value > 1 ? selectedChapter.value - 1 : "Previo")}</span></div></button><button class="text-right group"><span class="text-sm text-[#9B8D82]">Siguiente</span><div class="flex items-center gap-2 group-hover:translate-x-1 transition-transform"><span class="text-lg font-bold">Capítulo ${ssrInterpolate(selectedChapter.value < chaptersList.value[chaptersList.value.length - 1] ? selectedChapter.value + 1 : "Siguiente")}</span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></button></div></main>`);
      _push(ssrRenderComponent(_sfc_main$1, { booksList: booksList.value }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        isOpen: isBookModalOpen.value,
        booksList: booksList.value,
        selectedBook: selectedBook.value,
        selectedChapter: selectedChapter.value,
        expandedBookId: expandedBookId.value,
        expandedBookChapters: expandedBookChapters.value,
        testamentFilter: testamentFilter.value,
        onClose: ($event) => isBookModalOpen.value = false,
        onExpandBook: expandBook,
        onNavigateToChapter: navigateToChapter,
        onSetTestamentFilter: (f) => testamentFilter.value = f
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        isOpen: isVersionModalOpen.value,
        versions: __props.versions,
        selectedVersion: selectedVersion.value,
        onClose: ($event) => isVersionModalOpen.value = false,
        onSelectVersion: handleVersionChange
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        isOpen: isNoteModalOpen.value,
        selectedVerses: selectedVerses.value,
        processing: unref(noteForm).processing,
        modelValue: unref(noteForm).note,
        "onUpdate:modelValue": ($event) => unref(noteForm).note = $event,
        onClose: ($event) => isNoteModalOpen.value = false,
        onSave: saveFavorites
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        isOpen: isAppDownloadModalOpen.value,
        onClose: closeAppDownloadModal,
        onOpenPlayStore: openPlayStore,
        onAlreadyHaveApp: handleAlreadyHaveApp
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
