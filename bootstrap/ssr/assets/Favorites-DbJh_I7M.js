import { ref, computed, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { B as BibleHeader, _ as _sfc_main$2 } from "./AboutModal-BwJrT03Y.js";
import { _ as _sfc_main$1 } from "./BibleFooter-D0APqaEY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Favorites",
  __ssrInlineRender: true,
  props: {
    favorites: [Array, Object]
  },
  setup(__props) {
    const props = __props;
    const isAboutModalOpen = ref(false);
    const isDark = ref(document.documentElement.classList.contains("dark"));
    useForm({});
    const normalizedFavorites = computed(() => {
      if (Array.isArray(props.favorites)) return props.favorites;
      return props.favorites?.data || [];
    });
    const groupedFavorites = computed(() => {
      const groups = {};
      const singles = [];
      normalizedFavorites.value.forEach((fav) => {
        if (fav.note && fav.note.trim() !== "") {
          if (!groups[fav.note]) {
            groups[fav.note] = {
              type: "group",
              note: fav.note,
              items: []
            };
          }
          groups[fav.note].items.push(fav);
        } else {
          singles.push({
            type: "single",
            ...fav
          });
        }
      });
      return [...Object.values(groups), ...singles];
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
      _push(ssrRenderComponent(unref(Head), { title: "Mis Tesoros Guardados" }, null, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        showVersionSelector: false,
        onToggleTheme: toggleTheme,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(`<main class="max-w-6xl mx-auto px-4 py-12"><header class="text-center mb-16"><span class="text-[#8B6F47] dark:text-[#E3C598] font-black tracking-widest uppercase text-xs">Mis Favoritos</span><h1 class="text-4xl md:text-6xl font-black mt-4 leading-tight text-[#3A3026] dark:text-[#F5F0E6]">Tesoros Guardados</h1><p class="text-[#8B6F47] dark:text-[#E3C598] font-bold mt-4 max-w-2xl mx-auto">&quot;Guarda mis mandamientos y vivirás; y mi ley como la niña de tus ojos.&quot;</p><div class="w-24 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-10 rounded-full"></div></header>`);
      if (normalizedFavorites.value.length === 0) {
        _push(`<div class="text-center py-32 bg-white/30 dark:bg-white/5 rounded-[3.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-sm"><div class="w-24 h-24 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full flex items-center justify-center mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div><h3 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Tu tesoro de versículos está vacío</h3><p class="text-[#9B8D82] mt-3 max-w-md mx-auto font-medium">Comienza a guardar los versículos que te inspiran mientras exploras la Biblia.</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 gap-8"><!--[-->`);
        ssrRenderList(groupedFavorites.value, (item, index) => {
          _push(`<div>`);
          if (item.type === "group") {
            _push(`<div class="bg-white/50 dark:bg-white/5 p-8 md:p-12 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-sm hover:shadow-2xl transition-all backdrop-blur-sm"><div class="bg-[#FFF8F0] dark:bg-[#1A1A1A] p-6 rounded-2xl border-l-4 border-[#8B6F47] dark:border-[#E3C598] mb-8"><div class="flex justify-between items-start"><div><p class="text-xs font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598] mb-2 opacity-50">Nota del Grupo</p><p class="text-[#5A4D41] dark:text-[#D1C7BC] italic font-medium text-lg">&quot;${ssrInterpolate(item.note)}&quot;</p></div><div class="bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 px-3 py-1 rounded-full text-[#8B6F47] dark:text-[#E3C598] text-xs font-black">${ssrInterpolate(item.items.length)} Versículos </div></div></div><div class="space-y-6"><!--[-->`);
            ssrRenderList(item.items, (fav) => {
              _push(`<div class="border-b border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 last:border-0 pb-6 last:pb-0 relative group"><div class="flex justify-between items-start mb-2"><div class="flex items-center gap-2"><span class="font-black text-[#8B6F47] dark:text-[#E3C598]">${ssrInterpolate(fav.bookName)} ${ssrInterpolate(fav.chapter)}:${ssrInterpolate(fav.verse)}</span><span class="px-2 py-0.5 bg-[#8B6F47]/5 dark:bg-[#E3C598]/5 rounded text-[9px] font-bold uppercase text-[#8B6F47] dark:text-[#E3C598] opacity-70">${ssrInterpolate(fav.versionId)}</span></div><button class="p-2 text-[#9B8D82] hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all" title="Eliminar este versículo"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><p class="text-xl font-bold leading-relaxed text-[#3A3026] dark:text-[#F5F0E6]">&quot;${ssrInterpolate(fav.text)}&quot;</p></div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<div class="bg-white/50 dark:bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-[#E0D5C9] dark:border-[#2E2A25] shadow-sm hover:shadow-xl transition-all backdrop-blur-sm flex flex-col md:flex-row gap-6 md:items-center"><div class="flex-1"><div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 bg-[#8B6F47] dark:bg-[#E3C598] rounded-full flex items-center justify-center text-white dark:text-[#111111] font-black text-[10px] shadow-md">${ssrInterpolate(item.bookName.charAt(0))}</div><span class="text-lg font-black text-[#8B6F47] dark:text-[#E3C598]">${ssrInterpolate(item.bookName)} ${ssrInterpolate(item.chapter)}:${ssrInterpolate(item.verse)}</span><span class="px-3 py-1 bg-[#8B6F47]/10 dark:bg-[#E3C598]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#8B6F47] dark:text-[#E3C598]">${ssrInterpolate(item.versionId)}</span></div><p class="text-xl font-bold leading-relaxed text-[#3A3026] dark:text-[#F5F0E6]"> &quot;${ssrInterpolate(item.text)}&quot; </p></div><button class="self-start md:self-center p-3 text-[#9B8D82] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all transform hover:scale-110" title="Eliminar de favoritos"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</main>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
