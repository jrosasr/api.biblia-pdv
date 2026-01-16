import { unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DttxNdiC.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./SecondaryButton-C4moTHdn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    story: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.story.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Detalles de la Historia: ${ssrInterpolate(__props.story.title)}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-stories.index")
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
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Detalles de la Historia: " + toDisplayString(__props.story.title), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-stories.index")
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
            if (__props.story.cover_image) {
              _push2(`<img${ssrRenderAttr("src", __props.story.cover_image)} class="w-full rounded-lg shadow-lg"${ssrRenderAttr("alt", __props.story.title)}${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg"${_scopeId}><span class="text-gray-400"${_scopeId}>Sin imagen</span></div>`);
            }
            _push2(`</div><div class="md:w-2/3"${_scopeId}><div class="mb-4"${_scopeId}><span class="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"${_scopeId}> Serie: ${ssrInterpolate(__props.story.series?.title)}</span></div><h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>${ssrInterpolate(__props.story.title)}</h3><p class="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4"${_scopeId}>${ssrInterpolate(__props.story.book)} ${ssrInterpolate(__props.story.chapter_start)}:${ssrInterpolate(__props.story.verse_start)} `);
            if (__props.story.chapter_end) {
              _push2(`<span${_scopeId}> - ${ssrInterpolate(__props.story.chapter_end)}:${ssrInterpolate(__props.story.verse_end)}</span>`);
            } else if (__props.story.verse_end) {
              _push2(`<span${_scopeId}> - ${ssrInterpolate(__props.story.verse_end)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p><p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.story.description)}</p></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row gap-8" }, [
                        createVNode("div", { class: "md:w-1/3" }, [
                          __props.story.cover_image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: __props.story.cover_image,
                            class: "w-full rounded-lg shadow-lg",
                            alt: __props.story.title
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg"
                          }, [
                            createVNode("span", { class: "text-gray-400" }, "Sin imagen")
                          ]))
                        ]),
                        createVNode("div", { class: "md:w-2/3" }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("span", { class: "text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full" }, " Serie: " + toDisplayString(__props.story.series?.title), 1)
                          ]),
                          createVNode("h3", { class: "text-2xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(__props.story.title), 1),
                          createVNode("p", { class: "text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4" }, [
                            createTextVNode(toDisplayString(__props.story.book) + " " + toDisplayString(__props.story.chapter_start) + ":" + toDisplayString(__props.story.verse_start) + " ", 1),
                            __props.story.chapter_end ? (openBlock(), createBlock("span", { key: 0 }, " - " + toDisplayString(__props.story.chapter_end) + ":" + toDisplayString(__props.story.verse_end), 1)) : __props.story.verse_end ? (openBlock(), createBlock("span", { key: 1 }, " - " + toDisplayString(__props.story.verse_end), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-300 whitespace-pre-wrap" }, toDisplayString(__props.story.description), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleStories/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
