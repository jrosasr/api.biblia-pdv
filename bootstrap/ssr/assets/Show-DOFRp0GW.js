import { unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DttxNdiC.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    userDetail: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "Nunca";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC"
        // Importante para evitar desfases en fechas sin hora
      }).format(date);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: "Usuario: " + __props.userDetail.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Detalle de Usuario: ${ssrInterpolate(__props.userDetail.name)}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("users.index"),
              class: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`← Volver`);
                } else {
                  return [
                    createTextVNode("← Volver")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Detalle de Usuario: " + toDisplayString(__props.userDetail.name), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("users.index"),
                  class: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }, {
                  default: withCtx(() => [
                    createTextVNode("← Volver")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg overflow-x-auto"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-bold mb-4"${_scopeId}>Estadísticas de Racha</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"${_scopeId}><div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Racha Actual</p><p class="text-3xl font-bold text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(__props.userDetail.reading_streak?.current_streak || 0)} 🔥</p></div><div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Racha más larga</p><p class="text-3xl font-bold text-orange-600 dark:text-orange-400"${_scopeId}>${ssrInterpolate(__props.userDetail.reading_streak?.longest_streak || 0)} 🏆</p></div><div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Último día leído</p><p class="text-xl font-bold text-green-600 dark:text-green-400"${_scopeId}>${ssrInterpolate(formatDate(__props.userDetail.reading_streak?.last_read_date))} 📅</p></div></div></div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-bold mb-4 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded inline-block"${_scopeId}>Capítulos Leídos</h3>`);
            if (__props.userDetail.bible_chapter_readings.length === 0) {
              _push2(`<div class="text-gray-500 italic"${_scopeId}> No hay capítulos registrados como leídos. </div>`);
            } else {
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.userDetail.bible_chapter_readings, (reading) => {
                _push2(`<span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-sm font-medium border border-indigo-100 dark:border-indigo-800"${_scopeId}>${ssrInterpolate(reading.book_name)} ${ssrInterpolate(reading.chapter_number)} <span class="text-[10px] opacity-70 ml-1"${_scopeId}>(${ssrInterpolate(reading.version_id)})</span></span>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-bold mb-4"${_scopeId}>Versículos Favoritos</h3>`);
            if (__props.userDetail.favorites.length === 0) {
              _push2(`<div class="text-gray-500 italic"${_scopeId}> No tiene versículos favoritos. </div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.userDetail.favorites, (fav) => {
                _push2(`<div class="border dark:border-gray-700 p-4 rounded-lg"${_scopeId}><div class="flex justify-between items-start mb-2"${_scopeId}><span class="font-bold text-indigo-600 dark:text-indigo-400"${_scopeId}>${ssrInterpolate(fav.book_name)} ${ssrInterpolate(fav.chapter)}:${ssrInterpolate(fav.verse)}</span><span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400 uppercase"${_scopeId}>${ssrInterpolate(fav.version_id)}</span></div><p class="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-2"${_scopeId}>${ssrInterpolate(fav.text)}</p>`);
                if (fav.note) {
                  _push2(`<p class="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700 italic"${_scopeId}> Nota: ${ssrInterpolate(fav.note)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6"${_scopeId}><h3 class="text-lg font-bold mb-4"${_scopeId}>Historial de Lectura (Últimos 30)</h3>`);
            if (__props.userDetail.reading_logs.length === 0) {
              _push2(`<div class="text-gray-500 italic"${_scopeId}> No hay registros de lectura. </div>`);
            } else {
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.userDetail.reading_logs, (log) => {
                _push2(`<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(formatDate(log.read_date))}</span>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg overflow-x-auto" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4" }, "Estadísticas de Racha"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-center" }, [
                        createVNode("div", { class: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Racha Actual"),
                          createVNode("p", { class: "text-3xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(__props.userDetail.reading_streak?.current_streak || 0) + " 🔥", 1)
                        ]),
                        createVNode("div", { class: "p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Racha más larga"),
                          createVNode("p", { class: "text-3xl font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(__props.userDetail.reading_streak?.longest_streak || 0) + " 🏆", 1)
                        ]),
                        createVNode("div", { class: "p-4 bg-green-50 dark:bg-green-900/20 rounded-lg" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Último día leído"),
                          createVNode("p", { class: "text-xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(formatDate(__props.userDetail.reading_streak?.last_read_date)) + " 📅", 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded inline-block" }, "Capítulos Leídos"),
                      __props.userDetail.bible_chapter_readings.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 italic"
                      }, " No hay capítulos registrados como leídos. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-wrap gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.userDetail.bible_chapter_readings, (reading) => {
                          return openBlock(), createBlock("span", {
                            key: reading.id,
                            class: "px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-sm font-medium border border-indigo-100 dark:border-indigo-800"
                          }, [
                            createTextVNode(toDisplayString(reading.book_name) + " " + toDisplayString(reading.chapter_number) + " ", 1),
                            createVNode("span", { class: "text-[10px] opacity-70 ml-1" }, "(" + toDisplayString(reading.version_id) + ")", 1)
                          ]);
                        }), 128))
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4" }, "Versículos Favoritos"),
                      __props.userDetail.favorites.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 italic"
                      }, " No tiene versículos favoritos. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.userDetail.favorites, (fav) => {
                          return openBlock(), createBlock("div", {
                            key: fav.id,
                            class: "border dark:border-gray-700 p-4 rounded-lg"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start mb-2" }, [
                              createVNode("span", { class: "font-bold text-indigo-600 dark:text-indigo-400" }, toDisplayString(fav.book_name) + " " + toDisplayString(fav.chapter) + ":" + toDisplayString(fav.verse), 1),
                              createVNode("span", { class: "text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400 uppercase" }, toDisplayString(fav.version_id), 1)
                            ]),
                            createVNode("p", { class: "text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-2" }, toDisplayString(fav.text), 1),
                            fav.note ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700 italic"
                            }, " Nota: " + toDisplayString(fav.note), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4" }, "Historial de Lectura (Últimos 30)"),
                      __props.userDetail.reading_logs.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 italic"
                      }, " No hay registros de lectura. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-wrap gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.userDetail.reading_logs, (log) => {
                          return openBlock(), createBlock("span", {
                            key: log.id,
                            class: "px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
                          }, toDisplayString(formatDate(log.read_date)), 1);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
