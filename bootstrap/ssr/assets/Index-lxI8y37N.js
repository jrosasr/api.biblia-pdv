import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CdgzzzdO.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-C4moTHdn.js";
import "./DangerButton-B-RLDyCd.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    devotionals: Object
  },
  setup(__props) {
    const notifyNewDevotional = () => {
      if (confirm("¿Deseas enviar una notificación a todos los dispositivos sobre el nuevo devocional?")) {
        router.post(route("notifications.new-devotional"), {}, {
          preserveScroll: true,
          onSuccess: () => {
          }
        });
      }
    };
    const deleteDevotional = (id) => {
      if (confirm("¿Estás seguro de eliminar este devocional?")) {
        router.delete(route("devotionals.destroy", id));
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Devocionales" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Devocionales</h2><div class="flex space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: notifyNewDevotional }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Notificar sobre nuevo devocional `);
                } else {
                  return [
                    createTextVNode(" Notificar sobre nuevo devocional ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("devotionals.create")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(PrimaryButton, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nuevo Devocional `);
                      } else {
                        return [
                          createTextVNode(" Nuevo Devocional ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(PrimaryButton, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nuevo Devocional ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Devocionales"),
                createVNode("div", { class: "flex space-x-3" }, [
                  createVNode(_sfc_main$2, { onClick: notifyNewDevotional }, {
                    default: withCtx(() => [
                      createTextVNode(" Notificar sobre nuevo devocional ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Link), {
                    href: _ctx.route("devotionals.create")
                  }, {
                    default: withCtx(() => [
                      createVNode(PrimaryButton, null, {
                        default: withCtx(() => [
                          createTextVNode(" Nuevo Devocional ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}>`);
            if (__props.devotionals.data.length === 0) {
              _push2(`<div class="text-center py-8 text-text-tertiary"${_scopeId}> No hay devocionales registrados. </div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-border"${_scopeId}><thead class="bg-surface-alt/50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Título</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Estado</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Lecturas</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Fecha de publicación</th><th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Acciones</th></tr></thead><tbody class="bg-surface divide-y divide-border"${_scopeId}><!--[-->`);
              ssrRenderList(__props.devotionals.data, (devotional) => {
                _push2(`<tr class="hover:bg-surface-alt/30 transition-colors"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text"${_scopeId}>${ssrInterpolate(devotional.title)}</td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": devotional.status === "published",
                  "bg-surface-alt text-text-secondary": devotional.status !== "published"
                }, "px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full"])}"${_scopeId}>${ssrInterpolate(devotional.status === "published" ? "Publicado" : "Borrador")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-secondary"${_scopeId}>${ssrInterpolate(devotional.readings)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary"${_scopeId}>${ssrInterpolate(formatDate(devotional.published_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("devotionals.edit", devotional.id),
                  class: "text-primary hover:opacity-80 transition-opacity mr-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Editar`);
                    } else {
                      return [
                        createTextVNode("Editar")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="text-red-500 hover:text-red-700 transition-colors"${_scopeId}>Eliminar</button></td></tr>`);
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
                      __props.devotionals.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-text-tertiary"
                      }, " No hay devocionales registrados. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-border" }, [
                          createVNode("thead", { class: "bg-surface-alt/50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Título"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Estado"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Lecturas"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Fecha de publicación"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Acciones")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-surface divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.devotionals.data, (devotional) => {
                              return openBlock(), createBlock("tr", {
                                key: devotional.id,
                                class: "hover:bg-surface-alt/30 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-bold text-text" }, toDisplayString(devotional.title), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                  createVNode("span", {
                                    class: ["px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full", {
                                      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": devotional.status === "published",
                                      "bg-surface-alt text-text-secondary": devotional.status !== "published"
                                    }]
                                  }, toDisplayString(devotional.status === "published" ? "Publicado" : "Borrador"), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-bold text-text-secondary" }, toDisplayString(devotional.readings), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary" }, toDisplayString(formatDate(devotional.published_at)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-bold" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("devotionals.edit", devotional.id),
                                    class: "text-primary hover:opacity-80 transition-opacity mr-4"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Editar")
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteDevotional(devotional.id),
                                    class: "text-red-500 hover:text-red-700 transition-colors"
                                  }, "Eliminar", 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Devotionals/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
