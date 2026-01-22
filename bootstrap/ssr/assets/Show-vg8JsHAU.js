import { ref, onMounted, computed, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { B as BibleHeader, _ as _sfc_main$1 } from "./AboutModal-BwJrT03Y.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    devotional: Object
  },
  setup(__props) {
    const props = __props;
    const isAboutModalOpen = ref(false);
    const isDark = ref(document.documentElement.classList.contains("dark"));
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
    const contentBlocks = computed(() => {
      if (typeof props.devotional.content === "string") {
        try {
          return JSON.parse(props.devotional.content).blocks || [];
        } catch (e) {
          return [];
        }
      }
      return props.devotional.content?.blocks || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.devotional.title
      }, null, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans pb-20">`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        showVersionSelector: false,
        showSearch: false,
        onToggleTheme: toggleTheme,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(`<main class="max-w-4xl mx-auto px-4 py-12"><div class="mb-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("user-devotionals.public-index"),
        class: "flex items-center gap-2 text-[#8B6F47] dark:text-[#E3C598] font-bold hover:opacity-80 transition-opacity"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Volver a mi diario `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-5 h-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createTextVNode(" Volver a mi diario ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><article class="bg-white/50 dark:bg-white/5 rounded-[3rem] p-8 md:p-16 border border-[#E0D5C9] dark:border-[#2E2A25] shadow-xl backdrop-blur-sm"><header class="text-center mb-12"><span class="text-[#8B6F47] dark:text-[#E3C598] font-black tracking-widest uppercase text-xs">${ssrInterpolate(new Date(__props.devotional.created_at).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}</span><h1 class="text-4xl md:text-6xl font-black mt-6 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">${ssrInterpolate(__props.devotional.title)}</h1><div class="w-24 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-8 rounded-full"></div></header><div class="prose prose-lg md:prose-xl dark:prose-invert max-w-none"><!--[-->`);
      ssrRenderList(contentBlocks.value, (block, index) => {
        _push(`<!--[-->`);
        if (block.type === "paragraph") {
          _push(`<p class="mb-6 leading-relaxed text-[#5A4D41] dark:text-[#D1C7BC]">${block.data.text ?? ""}</p>`);
        } else if (block.type === "header") {
          _push(`<h2 class="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[#3A3026] dark:text-[#F5F0E6]">${ssrInterpolate(block.data.text)}</h2>`);
        } else if (block.type === "list") {
          _push(`<ul class="list-disc pl-8 mb-6 space-y-3"><!--[-->`);
          ssrRenderList(block.data.items, (item, i) => {
            _push(`<li class="text-[#5A4D41] dark:text-[#D1C7BC]">${item ?? ""}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></article></main>`);
      _push(ssrRenderComponent(_sfc_main$1, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserDevotionals/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
