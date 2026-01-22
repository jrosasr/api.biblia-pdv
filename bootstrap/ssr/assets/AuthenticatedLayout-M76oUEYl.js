import { mergeProps, useSSRContext, onMounted, onUnmounted, computed, ref, unref, withCtx, renderSlot, createVNode, createTextVNode, createBlock, openBlock, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<img${ssrRenderAttrs(mergeProps({
    src: "/icon.webp",
    alt: "Biblia PDV",
    class: "w-16 h-16"
  }, _attrs))}>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white dark:bg-gray-700"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}" style="${ssrRenderStyle([
        { "display": "none" },
        open.value ? null : { display: "none" }
      ])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-text-secondary transition duration-150 ease-in-out hover:bg-surface-alt focus:bg-surface-alt focus:outline-none"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-bold leading-5 text-text focus:outline-none transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-text-tertiary hover:text-text hover:border-border focus:outline-none transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-primary text-start text-base font-bold text-primary bg-primary-light/10 focus:outline-none transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-text-tertiary hover:text-text hover:bg-surface-alt hover:border-border focus:outline-none transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    const isDark = ref(false);
    onMounted(() => {
      isDark.value = document.documentElement.classList.contains("dark");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-text transition-colors duration-300" }, _attrs))}><nav class="border-b border-border bg-surface"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex shrink-0 items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">`);
      if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
        _push(ssrRenderComponent(_sfc_main$2, {
          href: _ctx.route("dashboard"),
          active: _ctx.route().current("dashboard")
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
      if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
        _push(ssrRenderComponent(_sfc_main$2, {
          href: _ctx.route("devotionals.index"),
          active: _ctx.route().current("devotionals.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Devocionales `);
            } else {
              return [
                createTextVNode(" Devocionales ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth.user.roles.includes("admin")) {
        _push(`<div class="hidden sm:flex sm:items-center sm:ms-6">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="${ssrRenderClass([{ "!border-indigo-400 !text-text": _ctx.route().current("bible-series.*") || _ctx.route().current("bible-stories.*") || _ctx.route().current("bible-headings.*") }, "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-text-secondary hover:text-text hover:border-gray-300 focus:outline-none focus:text-text focus:border-gray-300 transition duration-150 ease-in-out"])}"${_scopeId}> Contenido <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
            } else {
              return [
                createVNode("button", {
                  class: ["inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-text-secondary hover:text-text hover:border-gray-300 focus:outline-none focus:text-text focus:border-gray-300 transition duration-150 ease-in-out", { "!border-indigo-400 !text-text": _ctx.route().current("bible-series.*") || _ctx.route().current("bible-stories.*") || _ctx.route().current("bible-headings.*") }]
                }, [
                  createTextVNode(" Contenido "),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ], 2)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("bible-series.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Series`);
                  } else {
                    return [
                      createTextVNode("Series")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("bible-stories.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Historias`);
                  } else {
                    return [
                      createTextVNode("Historias")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("bible-headings.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Títulos`);
                  } else {
                    return [
                      createTextVNode("Títulos")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$3, {
                  href: _ctx.route("bible-series.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Series")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("bible-stories.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Historias")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("bible-headings.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Títulos")
                  ]),
                  _: 1
                }, 8, ["href"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth.user.roles.includes("admin")) {
        _push(`<div class="hidden sm:flex sm:items-center sm:ms-6">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          align: "right",
          width: "48"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="${ssrRenderClass([{ "!border-indigo-400 !text-text": _ctx.route().current("users.*") || _ctx.route().current("contact-messages.*") || _ctx.route().current("device-tokens.*") || _ctx.route().current("statistics.*") }, "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-text-secondary hover:text-text hover:border-gray-300 focus:outline-none focus:text-text focus:border-gray-300 transition duration-150 ease-in-out"])}"${_scopeId}> Administración <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
            } else {
              return [
                createVNode("button", {
                  class: ["inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-text-secondary hover:text-text hover:border-gray-300 focus:outline-none focus:text-text focus:border-gray-300 transition duration-150 ease-in-out", { "!border-indigo-400 !text-text": _ctx.route().current("users.*") || _ctx.route().current("contact-messages.*") || _ctx.route().current("device-tokens.*") || _ctx.route().current("statistics.*") }]
                }, [
                  createTextVNode(" Administración "),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ], 2)
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("users.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Usuarios`);
                  } else {
                    return [
                      createTextVNode("Usuarios")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("contact-messages.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Mensajes`);
                  } else {
                    return [
                      createTextVNode("Mensajes")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("device-tokens.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Dispositivos`);
                  } else {
                    return [
                      createTextVNode("Dispositivos")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="border-t border-gray-100 dark:border-gray-700 my-1"${_scopeId}></div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("statistics.dashboard")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Estadísticas`);
                  } else {
                    return [
                      createTextVNode("Estadísticas")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, { href: "/pulse" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Pulse`);
                  } else {
                    return [
                      createTextVNode("Pulse")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$3, {
                  href: _ctx.route("users.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Usuarios")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("contact-messages.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Mensajes")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("device-tokens.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Dispositivos")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "border-t border-gray-100 dark:border-gray-700 my-1" }),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("statistics.dashboard")
                }, {
                  default: withCtx(() => [
                    createTextVNode("Estadísticas")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_sfc_main$3, { href: "/pulse" }, {
                  default: withCtx(() => [
                    createTextVNode("Pulse")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="hidden sm:ms-6 sm:flex sm:items-center gap-4"><button class="p-2 rounded-full hover:bg-surface-alt transition-colors text-text-secondary">`);
      if (!isDark.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
      }
      _push(`</button><div class="relative">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center rounded-md border border-transparent bg-surface px-3 py-2 text-sm font-medium leading-4 text-text-secondary transition duration-150 ease-in-out hover:text-text focus:outline-none"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center rounded-md border border-transparent bg-surface px-3 py-2 text-sm font-medium leading-4 text-text-secondary transition duration-150 ease-in-out hover:text-text focus:outline-none"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "-me-0.5 ms-2 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("profile.edit")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Perfil `);
                } else {
                  return [
                    createTextVNode(" Perfil ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cerrar sesión `);
                } else {
                  return [
                    createTextVNode(" Cerrar sesión ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Perfil ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_sfc_main$3, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cerrar sesión ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
        block: showingNavigationDropdown.value,
        hidden: !showingNavigationDropdown.value
      }, "sm:hidden"])}"><div class="space-y-1 pb-3 pt-2">`);
      if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("dashboard"),
          active: _ctx.route().current("dashboard")
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
      _push(ssrRenderComponent(_sfc_main$1, {
        href: _ctx.route("user-devotionals.public-index"),
        active: _ctx.route().current("user-devotionals.*")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mis Devocionales `);
          } else {
            return [
              createTextVNode(" Mis Devocionales ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$page.props.auth.user.roles.includes("admin") || _ctx.$page.props.auth.user.roles.includes("writer")) {
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("devotionals.index"),
          active: _ctx.route().current("devotionals.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Admin Devocionales `);
            } else {
              return [
                createTextVNode(" Admin Devocionales ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth.user.roles.includes("admin")) {
        _push(`<!--[--><div class="pt-2 pb-1 border-t border-border mt-2"><div class="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Contenido</div></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("bible-series.index"),
          active: _ctx.route().current("bible-series.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Series `);
            } else {
              return [
                createTextVNode(" Series ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("bible-stories.index"),
          active: _ctx.route().current("bible-stories.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Historias `);
            } else {
              return [
                createTextVNode(" Historias ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("bible-headings.index"),
          active: _ctx.route().current("bible-headings.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Títulos `);
            } else {
              return [
                createTextVNode(" Títulos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth.user.roles.includes("admin")) {
        _push(`<!--[--><div class="pt-2 pb-1 border-t border-border mt-2"><div class="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Sistema</div></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("users.index"),
          active: _ctx.route().current("users.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Usuarios `);
            } else {
              return [
                createTextVNode(" Usuarios ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("contact-messages.index"),
          active: _ctx.route().current("contact-messages.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Mensajes `);
            } else {
              return [
                createTextVNode(" Mensajes ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("device-tokens.index"),
          active: _ctx.route().current("device-tokens.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dispositivos `);
            } else {
              return [
                createTextVNode(" Dispositivos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          href: _ctx.route("statistics.dashboard"),
          active: _ctx.route().current("statistics.*")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Estadísticas `);
            } else {
              return [
                createTextVNode(" Estadísticas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$1, { href: "/pulse" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Pulse `);
            } else {
              return [
                createTextVNode(" Pulse ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-t border-border pb-1 pt-4"><div class="px-4"><div class="text-base font-medium text-text">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="text-sm font-medium text-text-secondary">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: _ctx.route("profile.edit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Perfil `);
          } else {
            return [
              createTextVNode(" Perfil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cerrar sesión `);
          } else {
            return [
              createTextVNode(" Cerrar sesión ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-surface shadow"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
