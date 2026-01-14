import { ref, onMounted, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { B as BibleHeader, _ as _sfc_main$2 } from "./AboutModal-BwJrT03Y.js";
import { _ as _sfc_main$1 } from "./BibleFooter-D0APqaEY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Privacy",
  __ssrInlineRender: true,
  setup(__props) {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Política de Privacidad" }, null, _parent));
      _push(`<div class="min-h-screen transition-colors duration-300 bg-[#FFF8F0] dark:bg-[#111111] text-[#3A3026] dark:text-[#F5F0E6] font-sans">`);
      _push(ssrRenderComponent(BibleHeader, {
        isDark: isDark.value,
        showVersionSelector: false,
        onToggleTheme: toggleTheme,
        onOpenAboutModal: ($event) => isAboutModalOpen.value = true
      }, null, _parent));
      _push(`<main class="max-w-4xl mx-auto px-4 py-16 md:py-24"><header class="mb-16 text-center"><span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs">Legal</span><h1 class="text-4xl md:text-6xl font-black mt-4 text-[#3A3026] dark:text-[#F5F0E6]">Política de Privacidad</h1><div class="w-20 h-1.5 bg-[#8B6F47] dark:bg-[#E3C598] mx-auto mt-8 rounded-full"></div></header><div class="space-y-12 bg-white/50 dark:bg-white/5 p-8 md:p-16 rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25] backdrop-blur-md shadow-xl"><section class="space-y-4"><h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">1. Información que Recopilamos</h2><p class="text-lg leading-relaxed opacity-90"> En Biblia PDV, nos tomamos muy en serio tu privacidad. Recopilamos información básica como tu nombre y correo electrónico cuando te registras para ofrecerte una experiencia personalizada, como guardar tus versículos favoritos y tu diario espiritual. </p></section><section class="space-y-4"><h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">2. Uso de la Información</h2><p class="text-lg leading-relaxed opacity-90"> Utilizamos tus datos exclusivamente para: </p><ul class="list-disc list-inside space-y-2 ml-4 text-lg opacity-90"><li>Mantener tu cuenta y preferencias de lectura.</li><li>Sincronizar tus notas y favoritos entre dispositivos.</li><li>Enviarte notificaciones opcionales sobre el devocional diario.</li></ul></section><section class="space-y-4"><h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">3. Protección de Datos</h2><p class="text-lg leading-relaxed opacity-90"> No compartimos, vendemos ni alquilamos tu información personal a terceros. Tus notas y reflexiones en tu diario espiritual son privadas y solo tú puedes acceder a ellas. </p></section><section class="space-y-4"><h2 class="text-2xl font-black text-[#8B6F47] dark:text-[#E3C598]">4. Tus Derechos</h2><p class="text-lg leading-relaxed opacity-90"> Puedes solicitar la eliminación de tu cuenta y todos tus datos asociados en cualquier momento desde nuestra `);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("account.delete.show"),
        class: "text-[#8B6F47] dark:text-[#E3C598] font-black hover:underline transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`página de eliminación de cuenta`);
          } else {
            return [
              createTextVNode("página de eliminación de cuenta")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`, la configuración de tu perfil o contactándonos directamente. </p></section><footer class="pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25]"><p class="text-sm italic opacity-70">Última actualización: 5 de enero de 2026</p></footer></div></main>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Legal/Privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
