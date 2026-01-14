import { ref, computed, onMounted, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { B as BibleHeader, _ as _sfc_main$2 } from "./AboutModal-BwJrT03Y.js";
import { _ as _sfc_main$1 } from "./BibleFooter-D0APqaEY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PublicShow",
  __ssrInlineRender: true,
  props: {
    devotionals: [Array, Object]
  },
  setup(__props) {
    const props = __props;
    const devotionalsList = ref(props.devotionals?.data || props.devotionals || []);
    ref(false);
    const isAboutModalOpen = ref(false);
    const currentDevotional = computed(() => devotionalsList.value && devotionalsList.value.length > 0 ? devotionalsList.value[0] : null);
    const previousDevotionals = computed(() => devotionalsList.value && devotionalsList.value.length > 1 ? devotionalsList.value.slice(1, 4) : []);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: currentDevotional.value ? currentDevotional.value.title : "Devocional Diario"
      }, null, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans" data-v-705757d1>`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        showVersionSelector: false,
        showSearch: false,
        onToggleTheme: toggleTheme,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      if (currentDevotional.value) {
        _push(`<main class="max-w-7xl mx-auto px-4 py-12" data-v-705757d1><div class="text-center mb-16" data-v-705757d1><span class="text-[#8B6F47] dark:text-[#E3C598] font-bold tracking-widest uppercase text-sm" data-v-705757d1>${ssrInterpolate(new Date(currentDevotional.value.published_at).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}</span><h2 class="text-4xl md:text-6xl font-black mt-6 leading-tight text-[#3A3026] dark:text-[#F5F0E6]" data-v-705757d1>${ssrInterpolate(currentDevotional.value.title)}</h2></div><article class="prose prose-base sm:prose-xl dark:prose-invert max-w-7xl mx-auto bg-white dark:bg-[#1C1C1C] p-8 md:p-16 rounded-[2rem] shadow-xl border border-[#E0D5C9] dark:border-[#2E2A25]" data-v-705757d1><!--[-->`);
        ssrRenderList(currentDevotional.value.content.blocks, (block) => {
          _push(`<div class="mb-8" data-v-705757d1>`);
          if (block.type === "header" && block.data.level === 2) {
            _push(`<h2 class="text-3xl font-bold mb-6 text-[#8B6F47] dark:text-[#E3C598]" data-v-705757d1>${block.data.text ?? ""}</h2>`);
          } else if (block.type === "header" && block.data.level === 3) {
            _push(`<h3 class="text-2xl font-bold mb-4" data-v-705757d1>${block.data.text ?? ""}</h3>`);
          } else if (block.type === "paragraph") {
            _push(`<p class="text-lg md:text-xl leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] mb-6" data-v-705757d1>${block.data.text ?? ""}</p>`);
          } else if (block.type === "quote") {
            _push(`<blockquote class="border-l-8 border-[#8B6F47] pl-8 italic my-12 bg-[#F5EBE0] dark:bg-[#222222] py-8 pr-8 rounded-r-3xl" data-v-705757d1><p class="text-2xl font-serif text-[#6B5D52] dark:text-[#CFC6B8] mb-4" data-v-705757d1>${block.data.text ?? ""}</p>`);
            if (block.data.caption) {
              _push(`<cite class="block text-base font-bold text-[#8B6F47]" data-v-705757d1>— ${ssrInterpolate(block.data.caption)}</cite>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</blockquote>`);
          } else if (block.type === "list") {
            _push(`<ul class="space-y-4 mb-8" data-v-705757d1><!--[-->`);
            ssrRenderList(block.data.items, (item, i) => {
              _push(`<li class="flex gap-4 items-start" data-v-705757d1><span class="w-2 h-2 rounded-full bg-[#8B6F47] mt-3 flex-shrink-0" data-v-705757d1></span><span class="text-lg md:text-xl" data-v-705757d1>${(typeof item === "string" ? item : item.content) ?? ""}</span></li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></article><section class="mt-24" data-v-705757d1><h4 class="text-2xl font-bold mb-10 flex items-center gap-4 px-4 text-[#8B6F47] dark:text-[#E3C598]" data-v-705757d1><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-705757d1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-705757d1></path></svg> Lecturas anteriores </h4><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-705757d1><!--[-->`);
        ssrRenderList(previousDevotionals.value, (prev) => {
          _push(`<div class="bg-white dark:bg-[#1C1C1C] p-8 rounded-[2rem] cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#8B6F47] group shadow-lg" data-v-705757d1><span class="text-sm font-bold text-[#9B8D82] dark:text-[#9E9487]" data-v-705757d1>${ssrInterpolate(new Date(prev.published_at).toLocaleDateString("es-ES", { month: "long", day: "numeric" }))}</span><h5 class="text-2xl font-bold mt-4 line-clamp-2 group-hover:text-[#8B6F47] transition-colors leading-tight" data-v-705757d1>${ssrInterpolate(prev.title)}</h5><div class="mt-6 flex items-center gap-2 text-[#8B6F47] font-bold text-sm" data-v-705757d1> Leer ahora <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-705757d1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-705757d1></path></svg></div></div>`);
        });
        _push(`<!--]--></div></section></main>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-40 gap-6" data-v-705757d1>`);
        if (!devotionalsList.value.length) {
          _push(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-[#9B8D82]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-705757d1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-705757d1></path></svg><div class="text-center" data-v-705757d1><h3 class="text-xl font-bold text-[#3A3026] dark:text-[#F5F0E6]" data-v-705757d1>No hay devocionales disponibles</h3><p class="text-[#9B8D82] mt-2 text-sm" data-v-705757d1>Vuelve más tarde para ver nuevas lecturas.</p></div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("home"),
            class: "mt-4 px-6 py-2 bg-[#8B6F47] text-white rounded-full text-sm font-bold"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Volver al inicio`);
              } else {
                return [
                  createTextVNode("Volver al inicio")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><div class="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]" data-v-705757d1></div><span class="text-[#9B8D82]" data-v-705757d1>Cargando Palabra de Vida...</span><!--]-->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Devotionals/PublicShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PublicShow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-705757d1"]]);
export {
  PublicShow as default
};
