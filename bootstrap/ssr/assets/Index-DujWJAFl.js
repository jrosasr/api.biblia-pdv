import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-M76oUEYl.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Object,
    roles: Array
  },
  setup(__props) {
    const updateRole = (user, roleName) => {
      router.post(route("users.update-role", user.id), {
        role: roleName
      }, {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Usuarios" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Gestión de Usuarios</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Gestión de Usuarios")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}>`);
            if (__props.users.data.length === 0) {
              _push2(`<div class="text-center py-8 text-text-tertiary"${_scopeId}> No hay usuarios registrados. </div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-border"${_scopeId}><thead class="bg-surface-alt/50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Nombre</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Email</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Rol</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Racha Actual</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider text-center"${_scopeId}>Favoritos</th><th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Acciones</th></tr></thead><tbody class="bg-surface divide-y divide-border"${_scopeId}><!--[-->`);
              ssrRenderList(__props.users.data, (user) => {
                _push2(`<tr class="hover:bg-surface-alt/30 transition-colors"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary"${_scopeId}>${ssrInterpolate(user.email)}</td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><select class="bg-surface border-border text-text text-[10px] font-bold uppercase tracking-wider rounded-lg focus:ring-primary focus:border-primary block w-auto p-2"${_scopeId}><!--[-->`);
                ssrRenderList(__props.roles, (role) => {
                  _push2(`<option${ssrRenderAttr("value", role.name)}${ssrIncludeBooleanAttr(user.roles.some((r) => r.name === role.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(role.name)}</option>`);
                });
                _push2(`<!--]--></select></td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider"${_scopeId}>${ssrInterpolate(user.reading_streak?.current_streak || 0)} 🔥 </span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-center font-bold"${_scopeId}>${ssrInterpolate(user.favorites_count)} ⭐ </td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold flex justify-end gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("users.show", user.id),
                  class: "text-primary hover:opacity-80 transition-opacity"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Ver Detalle`);
                    } else {
                      return [
                        createTextVNode("Ver Detalle")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      __props.users.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-text-tertiary"
                      }, " No hay usuarios registrados. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-border" }, [
                          createVNode("thead", { class: "bg-surface-alt/50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Nombre"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Email"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Rol"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Racha Actual"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider text-center"
                              }, "Favoritos"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Acciones")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-surface divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user) => {
                              return openBlock(), createBlock("tr", {
                                key: user.id,
                                class: "hover:bg-surface-alt/30 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-bold text-text" }, toDisplayString(user.name), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary" }, toDisplayString(user.email), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                  createVNode("select", {
                                    onChange: (e) => updateRole(user, e.target.value),
                                    class: "bg-surface border-border text-text text-[10px] font-bold uppercase tracking-wider rounded-lg focus:ring-primary focus:border-primary block w-auto p-2"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
                                      return openBlock(), createBlock("option", {
                                        key: role.id,
                                        value: role.name,
                                        selected: user.roles.some((r) => r.name === role.name)
                                      }, toDisplayString(role.name), 9, ["value", "selected"]);
                                    }), 128))
                                  ], 40, ["onChange"])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                  createVNode("span", { class: "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider" }, toDisplayString(user.reading_streak?.current_streak || 0) + " 🔥 ", 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-center font-bold" }, toDisplayString(user.favorites_count) + " ⭐ ", 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-bold flex justify-end gap-3" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("users.show", user.id),
                                    class: "text-primary hover:opacity-80 transition-opacity"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Ver Detalle")
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
