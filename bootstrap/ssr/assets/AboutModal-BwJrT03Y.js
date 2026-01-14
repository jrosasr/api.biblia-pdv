import { ref, watch, mergeProps, unref, withCtx, createBlock, openBlock, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderTeleport, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "BibleHeader",
  __ssrInlineRender: true,
  props: {
    isDark: Boolean,
    selectedVersion: {
      type: String,
      default: "RV1960"
    },
    showVersionSelector: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    "toggleTheme",
    "openVersionModal",
    "openSearchModal",
    "openAboutModal",
    "navigateToSearchResult"
  ],
  setup(__props, { emit: __emit }) {
    const isSearchModalOpen = ref(false);
    const isMenuModalOpen = ref(false);
    const searchQuery = ref("");
    const searchResults = ref([]);
    const isSearching = ref(false);
    ref("search");
    watch(isSearchModalOpen, (val) => {
      if (!val) {
        searchResults.value = [];
        searchQuery.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-30 bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-[#E0D5C9] dark:border-[#2E2A25] px-4 py-3 flex items-center justify-between" }, _attrs))} data-v-ee647cfe><div class="flex items-center gap-2 sm:gap-4" data-v-ee647cfe><button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors" data-v-ee647cfe>`);
      if (!__props.isDark) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-v-ee647cfe></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-ee647cfe></path></svg>`);
      }
      _push(`</button>`);
      if (__props.showVersionSelector) {
        _push(`<div class="flex items-center gap-1 sm:gap-2 cursor-pointer group" data-v-ee647cfe><span class="font-medium text-[#8B6F47] dark:text-[#E3C598] text-sm sm:text-base" data-v-ee647cfe>${ssrInterpolate(__props.selectedVersion)}</span><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4 text-[#8B6F47] dark:text-[#E3C598] transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ee647cfe></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showSearch) {
        _push(`<button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598]" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-ee647cfe></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.showVersionSelector) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("home"),
          class: "p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598] lg:hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-ee647cfe${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-6 h-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2" data-v-ee647cfe><button class="lg:hidden p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors text-[#8B6F47] dark:text-[#E3C598]" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-v-ee647cfe></path></svg></button><nav class="hidden lg:flex gap-2 items-center" data-v-ee647cfe>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "px-3 py-2 rounded-full text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-ee647cfe${_scopeId}></path></svg><span data-v-ee647cfe${_scopeId}>Inicio</span>`);
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
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                })
              ])),
              createVNode("span", null, "Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="px-3 py-2 rounded-full text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ee647cfe></path></svg><span data-v-ee647cfe>Nosotros</span></button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("devotionals.public"),
        class: "px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-ee647cfe${_scopeId}></path></svg><span class="hidden sm:inline" data-v-ee647cfe${_scopeId}>Devocional diario</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-4 h-4 sm:w-5 sm:h-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                })
              ])),
              createVNode("span", { class: "hidden sm:inline" }, "Devocional diario")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$page.props.auth.user) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.favorites"),
          class: "px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5",
          title: "Mis Favoritos"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-ee647cfe${_scopeId}></path></svg><span class="hidden lg:inline" data-v-ee647cfe${_scopeId}>Favoritos</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4 sm:w-5 sm:h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  })
                ])),
                createVNode("span", { class: "hidden lg:inline" }, "Favoritos")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("user-devotionals.public-index"),
          class: "px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ee647cfe${_scopeId}></path></svg><span class="hidden sm:inline" data-v-ee647cfe${_scopeId}>Diario</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4 sm:w-5 sm:h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  })
                ])),
                createVNode("span", { class: "hidden sm:inline" }, "Diario")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("profile.public-show"),
          class: "px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#8B6F47] dark:text-[#E3C598] hover:bg-[#F5EBE0] dark:hover:bg-[#222222] transition-colors flex items-center gap-1.5",
          title: "Mi Perfil"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ee647cfe${_scopeId}></path></svg><span class="hidden lg:inline" data-v-ee647cfe${_scopeId}>Perfil</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4 sm:w-5 sm:h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  })
                ])),
                createVNode("span", { class: "hidden lg:inline" }, "Perfil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          class: "px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-1.5",
          title: "Cerrar sesión"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ee647cfe${_scopeId}></path></svg><span class="hidden xl:inline" data-v-ee647cfe${_scopeId}>Salir</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4 sm:w-5 sm:h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  })
                ])),
                createVNode("span", { class: "hidden xl:inline" }, "Salir")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] hover:opacity-90 transition-opacity whitespace-nowrap"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Dashboard `);
              } else {
                return [
                  createTextVNode(" Dashboard ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] shadow-lg shadow-[#8B6F47]/20 dark:shadow-[#000]/20 hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden sm:inline" data-v-ee647cfe${_scopeId}>Iniciar Sesión / Registrarse</span><span class="sm:hidden" data-v-ee647cfe${_scopeId}>Entrar</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden sm:inline" }, "Iniciar Sesión / Registrarse"),
                createVNode("span", { class: "sm:hidden" }, "Entrar")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</nav></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isMenuModalOpen.value) {
          _push2(`<div class="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 lg:hidden" data-v-ee647cfe><div class="fixed inset-0 bg-black/60 backdrop-blur-md" data-v-ee647cfe></div><div class="relative w-full max-w-sm bg-[#FFF8F0] dark:bg-[#111111] rounded-[2.5rem] shadow-2xl flex flex-col border border-[#E0D5C9] dark:border-[#2E2A25] overflow-hidden max-h-[82vh] mt-10 sm:mt-0" data-v-ee647cfe><div class="flex-shrink-0 p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center bg-[#FFF8F0]/80 dark:bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10" data-v-ee647cfe><div class="flex items-center gap-3" data-v-ee647cfe><img src="/icon.webp" alt="Logo" class="w-16 h-16" data-v-ee647cfe><span class="font-black text-xl text-[#3A3026] dark:text-[#F5F0E6]" data-v-ee647cfe>Biblia: Palabra de Vida</span></div><button class="p-2 rounded-full hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 text-[#8B6F47] dark:text-[#E3C598] transition-colors" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ee647cfe></path></svg></button></div><div class="flex-1 overflow-y-auto p-4 space-y-1.5" data-v-ee647cfe>`);
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("home"),
            onClick: ($event) => isMenuModalOpen.value = false,
            class: "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-ee647cfe${_scopeId}></path></svg></div> Inicio `);
              } else {
                return [
                  createVNode("div", { class: "w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      })
                    ]))
                  ]),
                  createTextVNode(" Inicio ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("devotionals.public"),
            onClick: ($event) => isMenuModalOpen.value = false,
            class: "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-ee647cfe${_scopeId}></path></svg></div> Devocional Diario `);
              } else {
                return [
                  createVNode("div", { class: "w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      })
                    ]))
                  ]),
                  createTextVNode(" Devocional Diario ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (_ctx.$page.props.auth.user) {
            _push2(`<!--[-->`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("profile.favorites"),
              onClick: ($event) => isMenuModalOpen.value = false,
              class: "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-ee647cfe${_scopeId}></path></svg></div> Favoritos `);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        })
                      ]))
                    ]),
                    createTextVNode(" Favoritos ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("user-devotionals.public-index"),
              onClick: ($event) => isMenuModalOpen.value = false,
              class: "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ee647cfe${_scopeId}></path></svg></div> Mi Diario `);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ]))
                    ]),
                    createTextVNode(" Mi Diario ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("profile.public-show"),
              onClick: ($event) => isMenuModalOpen.value = false,
              class: "flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ee647cfe${_scopeId}></path></svg></div> Mi Perfil `);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        })
                      ]))
                    ]),
                    createTextVNode(" Mi Perfil ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="flex items-center gap-4 w-full text-left px-5 py-4 rounded-[1.5rem] text-lg font-bold text-[#3A3026] dark:text-[#F5F0E6] hover:bg-[#8B6F47]/10 dark:hover:bg-[#E3C598]/10 hover:text-[#8B6F47] dark:hover:text-[#E3C598] transition-all group" data-v-ee647cfe><div class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ee647cfe></path></svg></div> Nosotros </button></div><div class="flex-shrink-0 p-6 border-t border-[#E0D5C9] dark:border-[#2E2A25] bg-white/30 dark:bg-white/5 backdrop-blur-sm" data-v-ee647cfe>`);
          if (_ctx.$page.props.auth.user) {
            _push2(`<div class="${ssrRenderClass(_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer") ? "grid grid-cols-2 gap-3" : "block")}" data-v-ee647cfe>`);
            if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("dashboard"),
                onClick: ($event) => isMenuModalOpen.value = false,
                class: "flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black group"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-ee647cfe${_scopeId}></path></svg><span class="text-xs uppercase tracking-widest" data-v-ee647cfe${_scopeId}>Panel</span>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-6 h-6 group-hover:scale-110 transition-transform",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        })
                      ])),
                      createVNode("span", { class: "text-xs uppercase tracking-widest" }, "Panel")
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              onClick: ($event) => isMenuModalOpen.value = false,
              class: "flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-red-500/10 dark:bg-red-500/20 text-red-500 font-black group w-full"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ee647cfe${_scopeId}></path></svg><span class="text-xs uppercase tracking-widest" data-v-ee647cfe${_scopeId}>Salir</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-6 h-6 group-hover:scale-110 transition-transform",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      })
                    ])),
                    createVNode("span", { class: "text-xs uppercase tracking-widest" }, "Salir")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div>`);
          } else {
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              onClick: ($event) => isMenuModalOpen.value = false,
              class: "w-full flex items-center justify-center gap-3 px-6 py-5 rounded-3xl font-black text-white bg-[#8B6F47] dark:bg-[#E3C598] dark:text-[#111111] shadow-xl shadow-[#8B6F47]/20 dark:shadow-black/20 hover:scale-[1.02] transition-all"
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-ee647cfe${_scopeId}></path></svg> Iniciar Sesión `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-6 h-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      })
                    ])),
                    createTextVNode(" Iniciar Sesión ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push2(`<div class="mt-6 pt-6 border-t border-[#E0D5C9] dark:border-[#2E2A25]" data-v-ee647cfe><p class="text-center text-sm font-bold text-[#3A3026] dark:text-[#F5F0E6] mb-3" data-v-ee647cfe>Descarga nuestra app</p><a href="https://play.google.com/store/apps/details?id=com.soluciones.elyon.bibliapalabradevida" target="_blank" class="block hover:scale-105 transition-transform duration-300" data-v-ee647cfe><img src="/disponible-en-google-play-badge.webp" alt="Disponible en Google Play" class="w-auto h-12 max-w-[150px] mx-auto" data-v-ee647cfe></a></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (isSearchModalOpen.value) {
          _push2(`<div class="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-0 sm:p-4 mr-[var(--removed-body-scroll-bar-size,0px)]" data-v-ee647cfe><div class="fixed inset-0 bg-black/40 backdrop-blur-sm" data-v-ee647cfe></div><div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] mt-16 sm:mt-0 overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25]" data-v-ee647cfe><div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25]" data-v-ee647cfe><div class="flex justify-between items-center mb-6" data-v-ee647cfe><h3 class="text-2xl font-bold text-[#3A3026] dark:text-[#F5F0E6]" data-v-ee647cfe>Buscar en la Biblia</h3><button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] text-[#8B6F47] dark:text-[#E3C598]" data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ee647cfe></path></svg></button></div><div class="relative" data-v-ee647cfe><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ej: Juan 3:16 o &#39;amor&#39;" class="w-full bg-[#F5EBE0] dark:bg-[#222222] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8B6F47] dark:focus:ring-[#E3C598] transition-all text-[#3A3026] dark:text-[#F5F0E6] placeholder-[#9B8D82]" autofocus data-v-ee647cfe><svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B8D82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ee647cfe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-ee647cfe></path></svg></div></div><div class="flex-1 overflow-y-auto p-4 space-y-2" data-v-ee647cfe>`);
          if (isSearching.value) {
            _push2(`<div class="flex flex-col items-center py-10 gap-2" data-v-ee647cfe><div class="animate-spin rounded-full h-8 w-8 border-2 border-[#8B6F47] border-t-transparent dark:border-[#E3C598]" data-v-ee647cfe></div><span class="text-sm text-[#9B8D82]" data-v-ee647cfe>Buscando...</span></div>`);
          } else if (searchResults.value.length > 0) {
            _push2(`<!--[-->`);
            ssrRenderList(searchResults.value, (result) => {
              _push2(`<div class="p-4 rounded-2xl hover:bg-[#F5EBE0] dark:hover:bg-[#222222] cursor-pointer transition-all border border-transparent hover:border-[#E0D5C9] dark:hover:border-[#2E2A25]" data-v-ee647cfe><div class="flex justify-between items-center mb-1" data-v-ee647cfe><span class="font-bold text-[#8B6F47] dark:text-[#E3C598] text-sm" data-v-ee647cfe>${ssrInterpolate(result.book_name)} ${ssrInterpolate(result.chapter)}:${ssrInterpolate(result.verse)}</span></div><p class="text-sm line-clamp-2 text-[#3A3026] dark:text-[#F5F0E6]" data-v-ee647cfe>${ssrInterpolate(result.text)}</p></div>`);
            });
            _push2(`<!--]-->`);
          } else if (searchQuery.value) {
            _push2(`<div class="text-center py-10" data-v-ee647cfe><p class="text-[#9B8D82]" data-v-ee647cfe>No se encontraron resultados para &quot;${ssrInterpolate(searchQuery.value)}&quot;</p></div>`);
          } else {
            _push2(`<div class="text-center py-10" data-v-ee647cfe><p class="text-[#9B8D82] text-sm italic" data-v-ee647cfe>Escribe una palabra o referencia bíblica para comenzar</p></div>`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BibleHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BibleHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ee647cfe"]]);
const _sfc_main = {
  __name: "AboutModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" }, _attrs))}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><div class="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#1C1C1C] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"><div class="p-6 border-b border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center"><h3 class="text-2xl font-bold italic text-[#3A3026] dark:text-[#F5F0E6]">Acerca de nosotros</h3><button class="p-2 rounded-full hover:bg-[#F5EBE0] dark:hover:bg-[#222222] text-[#3A3026] dark:text-[#F5F0E6]"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex-1 overflow-y-auto p-8 space-y-8"><div class="flex flex-col items-center text-center space-y-4"><div class="w-24 h-24 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-[#E0D5C9] dark:border-[#2E2A25] transform rotate-3 hover:rotate-6 transition-transform duration-300"><img src="/icon.webp" alt="Biblia PDV" class="w-full h-full object-cover"></div><div><h4 class="text-2xl font-black text-[#3A3026] dark:text-[#F5F0E6]">Biblia: Palabra de Vida</h4><p class="text-[#8B6F47] dark:text-[#9B8D82] font-medium">Versión 1.0.6</p></div></div><div class="bg-gradient-to-br from-[#8B6F47] to-[#5A4D41] dark:from-[#E3C598] dark:to-[#8B6F47] p-8 sm:p-12 rounded-[2.5rem] text-white dark:text-[#111111] shadow-xl relative overflow-hidden group"><div class="absolute -top-10 -right-10 opacity-20 group-hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" class="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><h3 class="text-2xl sm:text-3xl font-black mb-4 relative z-10">Misión Biblia PDV</h3><p class="text-base sm:text-lg font-medium opacity-90 leading-relaxed relative z-10"> Nuestra misión es utilizar la tecnología para facilitar el acceso a la Palabra de Dios, proporcionando herramientas modernas que enriquezcan tu vida espiritual diaria. </p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(["Múltiples versiones", "Sin publicidad", "Interfaz moderna", "Seguimiento de lectura", "Devocionales diarios"], (feature) => {
          _push(`<div class="flex items-center gap-3 p-4 rounded-2xl border border-[#E0D5C9] dark:border-[#2E2A25] text-[#3A3026] dark:text-[#F5F0E6]"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#8B6F47] dark:text-[#E3C598]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="font-medium">${ssrInterpolate(feature)}</span></div>`);
        });
        _push(`<!--]--></div><p class="text-center text-[#9B8D82] text-sm pt-8"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Elyon Solutions. Todos los derechos reservados. </p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AboutModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  BibleHeader as B,
  _sfc_main as _
};
