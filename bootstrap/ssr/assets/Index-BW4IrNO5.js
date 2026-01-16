import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DttxNdiC.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import "./DangerButton-B-RLDyCd.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    series: Array
  },
  setup(__props) {
    const deleteSeries = (id) => {
      if (confirm("¿Estás seguro de eliminar esta serie? Se eliminarán todas las historias asociadas.")) {
        router.delete(route("bible-series.destroy", id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Biblia de Corazón" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Series Bíblicas</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-series.create")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(PrimaryButton, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nueva Serie `);
                      } else {
                        return [
                          createTextVNode(" Nueva Serie ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(PrimaryButton, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nueva Serie ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Series Bíblicas"),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-series.create")
                }, {
                  default: withCtx(() => [
                    createVNode(PrimaryButton, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nueva Serie ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}>`);
            if (__props.series.length === 0) {
              _push2(`<div class="text-center py-8 text-text-tertiary"${_scopeId}> No hay series registradas. </div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.series, (item) => {
                _push2(`<div class="bg-background rounded-2xl shadow-sm overflow-hidden border border-border hover:border-primary/50 transition-colors group"${_scopeId}><div class="relative"${_scopeId}>`);
                if (item.cover_image) {
                  _push2(`<img${ssrRenderAttr("src", item.cover_image)} class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"${ssrRenderAttr("alt", item.title)}${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-48 bg-surface-alt flex items-center justify-center"${_scopeId}><span class="text-text-tertiary text-xs"${_scopeId}>Sin imagen</span></div>`);
                }
                _push2(`</div><div class="p-5"${_scopeId}><h3 class="text-lg font-bold mb-2 text-text"${_scopeId}>${ssrInterpolate(item.title)}</h3><p class="text-sm text-text-secondary mb-4 line-clamp-2 h-10"${_scopeId}>${ssrInterpolate(item.description)}</p><div class="flex flex-wrap gap-2 items-center mb-4"${_scopeId}><span class="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider"${_scopeId}>${ssrInterpolate(item.stories_count)} historias </span>`);
                if (item.difficulty_level) {
                  _push2(`<span class="text-[10px] font-bold px-3 py-1 bg-accent/10 text-accent rounded-full uppercase tracking-wider"${_scopeId}>${ssrInterpolate(item.difficulty_level === 1 ? "Historias cortas" : item.difficulty_level === 2 ? "Historias largas" : "Historias más difíciles")}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex justify-end items-center space-x-4 border-t border-border pt-4"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("bible-series.edit", item.id),
                  class: "text-primary hover:opacity-80 transition-opacity text-sm font-bold"
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
                _push2(`<button class="text-red-500 hover:text-red-700 transition-colors text-sm font-bold"${_scopeId}>Eliminar</button></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      __props.series.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-text-tertiary"
                      }, " No hay series registradas. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.series, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "bg-background rounded-2xl shadow-sm overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                          }, [
                            createVNode("div", { class: "relative" }, [
                              item.cover_image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: item.cover_image,
                                class: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500",
                                alt: item.title
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "w-full h-48 bg-surface-alt flex items-center justify-center"
                              }, [
                                createVNode("span", { class: "text-text-tertiary text-xs" }, "Sin imagen")
                              ]))
                            ]),
                            createVNode("div", { class: "p-5" }, [
                              createVNode("h3", { class: "text-lg font-bold mb-2 text-text" }, toDisplayString(item.title), 1),
                              createVNode("p", { class: "text-sm text-text-secondary mb-4 line-clamp-2 h-10" }, toDisplayString(item.description), 1),
                              createVNode("div", { class: "flex flex-wrap gap-2 items-center mb-4" }, [
                                createVNode("span", { class: "text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider" }, toDisplayString(item.stories_count) + " historias ", 1),
                                item.difficulty_level ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-[10px] font-bold px-3 py-1 bg-accent/10 text-accent rounded-full uppercase tracking-wider"
                                }, toDisplayString(item.difficulty_level === 1 ? "Historias cortas" : item.difficulty_level === 2 ? "Historias largas" : "Historias más difíciles"), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "flex justify-end items-center space-x-4 border-t border-border pt-4" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("bible-series.edit", item.id),
                                  class: "text-primary hover:opacity-80 transition-opacity text-sm font-bold"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Editar")
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteSeries(item.id),
                                  class: "text-red-500 hover:text-red-700 transition-colors text-sm font-bold"
                                }, "Eliminar", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleSeries/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
