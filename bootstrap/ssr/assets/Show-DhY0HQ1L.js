import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CdgzzzdO.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./SecondaryButton-C4moTHdn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    series: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.series.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Detalles de la Serie: ${ssrInterpolate(__props.series.title)}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-series.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Volver`);
                      } else {
                        return [
                          createTextVNode("Volver")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2, null, {
                      default: withCtx(() => [
                        createTextVNode("Volver")
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
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Detalles de la Serie: " + toDisplayString(__props.series.title), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-series.index")
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$2, null, {
                      default: withCtx(() => [
                        createTextVNode("Volver")
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
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><div class="flex flex-col md:flex-row gap-8"${_scopeId}><div class="md:w-1/3"${_scopeId}>`);
            if (__props.series.cover_image) {
              _push2(`<img${ssrRenderAttr("src", __props.series.cover_image)} class="w-full rounded-lg shadow-lg"${ssrRenderAttr("alt", __props.series.title)}${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg"${_scopeId}><span class="text-gray-400"${_scopeId}>Sin imagen</span></div>`);
            }
            _push2(`</div><div class="md:w-2/3"${_scopeId}><h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"${_scopeId}>${ssrInterpolate(__props.series.title)}</h3><p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-8"${_scopeId}>${ssrInterpolate(__props.series.description)}</p><h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4"${_scopeId}>Historias en esta serie</h4>`);
            if (__props.series.stories.length === 0) {
              _push2(`<div class="text-gray-500 italic"${_scopeId}> No hay historias en esta serie. </div>`);
            } else {
              _push2(`<ul class="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg overflow-hidden"${_scopeId}><!--[-->`);
              ssrRenderList(__props.series.stories, (story) => {
                _push2(`<li class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(story.title)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(story.book)} ${ssrInterpolate(story.chapter_start)}:${ssrInterpolate(story.verse_start)}</p></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("bible-stories.show", story.id),
                  class: "text-indigo-600 dark:text-indigo-400 hover:underline"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Ver detalles`);
                    } else {
                      return [
                        createTextVNode("Ver detalles")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row gap-8" }, [
                        createVNode("div", { class: "md:w-1/3" }, [
                          __props.series.cover_image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: __props.series.cover_image,
                            class: "w-full rounded-lg shadow-lg",
                            alt: __props.series.title
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg"
                          }, [
                            createVNode("span", { class: "text-gray-400" }, "Sin imagen")
                          ]))
                        ]),
                        createVNode("div", { class: "md:w-2/3" }, [
                          createVNode("h3", { class: "text-2xl font-bold text-gray-900 dark:text-white mb-4" }, toDisplayString(__props.series.title), 1),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-8" }, toDisplayString(__props.series.description), 1),
                          createVNode("h4", { class: "text-xl font-bold text-gray-900 dark:text-white mb-4" }, "Historias en esta serie"),
                          __props.series.stories.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-gray-500 italic"
                          }, " No hay historias en esta serie. ")) : (openBlock(), createBlock("ul", {
                            key: 1,
                            class: "divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg overflow-hidden"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.series.stories, (story) => {
                              return openBlock(), createBlock("li", {
                                key: story.id,
                                class: "p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                              }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(story.title), 1),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(story.book) + " " + toDisplayString(story.chapter_start) + ":" + toDisplayString(story.verse_start), 1)
                                ]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("bible-stories.show", story.id),
                                  class: "text-indigo-600 dark:text-indigo-400 hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Ver detalles")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ]);
                            }), 128))
                          ]))
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleSeries/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
