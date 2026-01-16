import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-FYN_q5vT.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    stories: Array
  },
  setup(__props) {
    const deleteStory = (id) => {
      if (confirm("¿Estás seguro de eliminar esta historia?")) {
        router.delete(route("bible-stories.destroy", id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Historias Bíblicas" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Historias Bíblicas</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-stories.create")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(PrimaryButton, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nueva Historia `);
                      } else {
                        return [
                          createTextVNode(" Nueva Historia ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(PrimaryButton, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nueva Historia ")
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
                createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Historias Bíblicas"),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-stories.create")
                }, {
                  default: withCtx(() => [
                    createVNode(PrimaryButton, null, {
                      default: withCtx(() => [
                        createTextVNode(" Nueva Historia ")
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
            if (__props.stories.length === 0) {
              _push2(`<div class="text-center py-8 text-text-tertiary"${_scopeId}> No hay historias registradas. </div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-border"${_scopeId}><thead class="bg-surface-alt/50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Título</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Serie</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Cita</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Dificultad</th><th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Acciones</th></tr></thead><tbody class="bg-surface divide-y divide-border"${_scopeId}><!--[-->`);
              ssrRenderList(__props.stories, (story) => {
                _push2(`<tr class="hover:bg-surface-alt/30 transition-colors"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-text"${_scopeId}>${ssrInterpolate(story.title)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary"${_scopeId}><span class="px-2 py-0.5 bg-primary/5 text-primary rounded-md text-[11px] font-bold uppercase tracking-tight"${_scopeId}>${ssrInterpolate(story.series?.title)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary"${_scopeId}>${ssrInterpolate(story.book)} ${ssrInterpolate(story.chapter_start)}:${ssrInterpolate(story.verse_start)} `);
                if (story.chapter_end) {
                  _push2(`<span${_scopeId}> - ${ssrInterpolate(story.chapter_end)}:${ssrInterpolate(story.verse_end)}</span>`);
                } else if (story.verse_end) {
                  _push2(`<span${_scopeId}> - ${ssrInterpolate(story.verse_end)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-blue-100 text-blue-700": story.difficulty_level === 1,
                  "bg-orange-100 text-orange-700": story.difficulty_level === 2,
                  "bg-red-100 text-red-700": story.difficulty_level === 3
                }, "px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-tight"])}"${_scopeId}>${ssrInterpolate(story.difficulty_level === 1 ? "Historias cortas" : story.difficulty_level === 2 ? "Historias largas" : "Historias más difíciles")}</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("bible-stories.edit", story.id),
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
                      __props.stories.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-text-tertiary"
                      }, " No hay historias registradas. ")) : (openBlock(), createBlock("div", {
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
                              }, "Serie"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Cita"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Dificultad"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Acciones")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-surface divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stories, (story) => {
                              return openBlock(), createBlock("tr", {
                                key: story.id,
                                class: "hover:bg-surface-alt/30 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-bold text-text" }, toDisplayString(story.title), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary" }, [
                                  createVNode("span", { class: "px-2 py-0.5 bg-primary/5 text-primary rounded-md text-[11px] font-bold uppercase tracking-tight" }, toDisplayString(story.series?.title), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary" }, [
                                  createTextVNode(toDisplayString(story.book) + " " + toDisplayString(story.chapter_start) + ":" + toDisplayString(story.verse_start) + " ", 1),
                                  story.chapter_end ? (openBlock(), createBlock("span", { key: 0 }, " - " + toDisplayString(story.chapter_end) + ":" + toDisplayString(story.verse_end), 1)) : story.verse_end ? (openBlock(), createBlock("span", { key: 1 }, " - " + toDisplayString(story.verse_end), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                  createVNode("span", {
                                    class: ["px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-tight", {
                                      "bg-blue-100 text-blue-700": story.difficulty_level === 1,
                                      "bg-orange-100 text-orange-700": story.difficulty_level === 2,
                                      "bg-red-100 text-red-700": story.difficulty_level === 3
                                    }]
                                  }, toDisplayString(story.difficulty_level === 1 ? "Historias cortas" : story.difficulty_level === 2 ? "Historias largas" : "Historias más difíciles"), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-bold" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("bible-stories.edit", story.id),
                                    class: "text-primary hover:opacity-80 transition-opacity mr-4"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Editar")
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteStory(story.id),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleStories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
