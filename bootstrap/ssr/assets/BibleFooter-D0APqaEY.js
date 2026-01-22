import { mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "BibleFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-[#FFF8F0] dark:bg-[#111111] border-t border-[#E0D5C9] dark:border-[#2E2A25] transition-colors duration-300" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-12"><div class="col-span-1 md:col-span-2 space-y-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-32 h-32 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25]"${_scopeId}><img src="/icon.webp" alt="Biblia PDV" class="w-full h-full object-cover"${_scopeId}></div><span class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] tracking-tight"${_scopeId}>Biblia: Palabra de Vida</span>`);
          } else {
            return [
              createVNode("div", { class: "w-32 h-32 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25]" }, [
                createVNode("img", {
                  src: "/icon.webp",
                  alt: "Biblia PDV",
                  class: "w-full h-full object-cover"
                })
              ]),
              createVNode("span", { class: "text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6] tracking-tight" }, "Biblia: Palabra de Vida")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-[#8B6F47] dark:text-[#9B8D82] text-lg leading-relaxed max-w-md"> Una experiencia digital diseñada para profundizar en la Palabra de Vida. Encuentra devocionales diarios y mantén tu propio diario espiritual. </p></div><div class="grid grid-cols-2 gap-8 col-span-1 md:col-span-2"><div class="space-y-6"><h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black uppercase tracking-widest text-sm">Explora</h4><nav class="flex flex-col gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
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
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("devotionals.public"),
        class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Devocional Diario`);
          } else {
            return [
              createTextVNode("Devocional Diario")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="text-left text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium">Nosotros</button></nav></div><div class="space-y-6"><h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black uppercase tracking-widest text-sm">Cuenta</h4><nav class="flex flex-col gap-4">`);
      if (!_ctx.$page.props.auth.user) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Iniciar Sesión`);
            } else {
              return [
                createTextVNode("Iniciar Sesión")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Registrarse`);
            } else {
              return [
                createTextVNode("Registrarse")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Panel de Control`);
            } else {
              return [
                createTextVNode("Panel de Control")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.public-show"),
          class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] transition-colors font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Mi Perfil`);
            } else {
              return [
                createTextVNode("Mi Perfil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</nav></div></div></div><div class="mt-12 pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col items-left gap-4"><h4 class="text-[#3A3026] dark:text-[#F5F0E6] font-black text-lg">Descarga nuestra app</h4><a href="https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida" target="_blank" class="block hover:scale-105 transition-transform duration-300 hover:drop-shadow-2xl"><img src="/disponible-en-google-play-badge.webp" alt="Disponible en Google Play" class="h-14 w-auto"></a></div><div class="mt-12 pt-8 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex flex-col md:flex-row justify-between items-center gap-6"><p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium text-center md:text-left"> © ${ssrInterpolate(unref(currentYear))} <span class="text-[#3A3026] dark:text-[#F5F0E6] font-black">Biblia PDV</span>. Todos los derechos reservados. </p><div class="flex gap-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy"),
        class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacidad`);
          } else {
            return [
              createTextVNode("Privacidad")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms"),
        class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Términos y Condiciones`);
          } else {
            return [
              createTextVNode("Términos y Condiciones")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contact"),
        class: "text-[#8B6F47] dark:text-[#9B8D82] hover:text-[#3A3026] dark:hover:text-[#F5F0E6] text-sm font-medium transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contacto`);
          } else {
            return [
              createTextVNode("Contacto")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
