import { ref, watch, unref, withCtx, createBlock, openBlock, createVNode, createCommentVNode, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-M76oUEYl.js";
import { router, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    headings: Object,
    books: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const filterForm = ref({
      book_id: props.filters.book_id || ""
    });
    watch(() => filterForm.value.book_id, (value) => {
      router.get(route("bible-headings.index"), { book_id: value }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    });
    const deleteHeading = (id) => {
      if (confirm("¿Estás seguro de que deseas eliminar este título?")) {
        router.delete(route("bible-headings.destroy", id), {
          preserveScroll: true
        });
      }
    };
    const getBookName = (id) => {
      const book = props.books.find((b) => b.id == id);
      return book ? book.name : `Libro ${id}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Gestión de Títulos" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-bold leading-tight text-primary"${_scopeId}> Títulos de la Biblia (Perícopes) </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-headings.create"),
              class: "px-4 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all font-sans"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` + Agregar Títulos `);
                } else {
                  return [
                    createTextVNode(" + Agregar Títulos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-bold leading-tight text-primary" }, " Títulos de la Biblia (Perícopes) "),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-headings.create"),
                  class: "px-4 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all font-sans"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" + Agregar Títulos ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="mb-6 bg-surface p-4 rounded-2xl border border-border flex items-center gap-4"${_scopeId}><div class="flex-1 max-w-xs"${_scopeId}><label class="block text-xs font-bold uppercase tracking-widest text-text-tertiary mb-1"${_scopeId}>Filtrar por Libro</label><select class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.book_id) ? ssrLooseContain(filterForm.value.book_id, "") : ssrLooseEqual(filterForm.value.book_id, "")) ? " selected" : ""}${_scopeId}>Todos los libros</option><!--[-->`);
            ssrRenderList(__props.books, (book) => {
              _push2(`<option${ssrRenderAttr("value", book.id)}${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.book_id) ? ssrLooseContain(filterForm.value.book_id, book.id) : ssrLooseEqual(filterForm.value.book_id, book.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(book.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden"${_scopeId}><table class="w-full text-left"${_scopeId}><thead class="bg-background text-text-tertiary text-xs font-bold uppercase tracking-widest border-b border-border"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Libro</th><th class="px-6 py-4 text-center"${_scopeId}>Capítulo</th><th class="px-6 py-4 text-center"${_scopeId}>Versículo</th><th class="px-6 py-4"${_scopeId}>Título</th><th class="px-6 py-4 text-right"${_scopeId}>Acciones</th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
            ssrRenderList(__props.headings.data, (heading) => {
              _push2(`<tr class="hover:bg-background/50 transition-colors"${_scopeId}><td class="px-6 py-4 font-bold"${_scopeId}>${ssrInterpolate(getBookName(heading.book_id))}</td><td class="px-6 py-4 text-center"${_scopeId}>${ssrInterpolate(heading.chapter)}</td><td class="px-6 py-4 text-center"${_scopeId}>${ssrInterpolate(heading.verse)}</td><td class="px-6 py-4 text-text-secondary italic"${_scopeId}>&quot;${ssrInterpolate(heading.title)}&quot;</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("bible-headings.edit", heading.id),
                class: "p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-5 w-5",
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
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.headings.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-text-tertiary italic"${_scopeId}> No se encontraron títulos registrados. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.headings.meta?.links?.length > 3) {
              _push2(`<div class="mt-8 flex justify-center gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.headings.meta.links, (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(`<button class="${ssrRenderClass([
                    "px-4 py-2 rounded-xl border transition-all",
                    link.active ? "bg-primary text-white border-primary" : "bg-surface border-border text-text hover:bg-background"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                } else {
                  _push2(`<span class="px-4 py-2 text-text-tertiary"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6 bg-surface p-4 rounded-2xl border border-border flex items-center gap-4" }, [
                    createVNode("div", { class: "flex-1 max-w-xs" }, [
                      createVNode("label", { class: "block text-xs font-bold uppercase tracking-widest text-text-tertiary mb-1" }, "Filtrar por Libro"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filterForm.value.book_id = $event,
                        class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                      }, [
                        createVNode("option", { value: "" }, "Todos los libros"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.books, (book) => {
                          return openBlock(), createBlock("option", {
                            key: book.id,
                            value: book.id
                          }, toDisplayString(book.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, filterForm.value.book_id]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden" }, [
                    createVNode("table", { class: "w-full text-left" }, [
                      createVNode("thead", { class: "bg-background text-text-tertiary text-xs font-bold uppercase tracking-widest border-b border-border" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-4" }, "Libro"),
                          createVNode("th", { class: "px-6 py-4 text-center" }, "Capítulo"),
                          createVNode("th", { class: "px-6 py-4 text-center" }, "Versículo"),
                          createVNode("th", { class: "px-6 py-4" }, "Título"),
                          createVNode("th", { class: "px-6 py-4 text-right" }, "Acciones")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-border" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.headings.data, (heading) => {
                          return openBlock(), createBlock("tr", {
                            key: heading.id,
                            class: "hover:bg-background/50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-bold" }, toDisplayString(getBookName(heading.book_id)), 1),
                            createVNode("td", { class: "px-6 py-4 text-center" }, toDisplayString(heading.chapter), 1),
                            createVNode("td", { class: "px-6 py-4 text-center" }, toDisplayString(heading.verse), 1),
                            createVNode("td", { class: "px-6 py-4 text-text-secondary italic" }, '"' + toDisplayString(heading.title) + '"', 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex justify-end gap-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("bible-headings.edit", heading.id),
                                  class: "p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "h-5 w-5",
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
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteHeading(heading.id),
                                  class: "p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.headings.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-12 text-center text-text-tertiary italic"
                          }, " No se encontraron títulos registrados. ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.headings.meta?.links?.length > 3 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-8 flex justify-center gap-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.headings.meta.links, (link) => {
                      return openBlock(), createBlock(Fragment, {
                        key: link.label
                      }, [
                        link.url ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => unref(router).visit(link.url),
                          innerHTML: link.label,
                          class: [
                            "px-4 py-2 rounded-xl border transition-all",
                            link.active ? "bg-primary text-white border-primary" : "bg-surface border-border text-text hover:bg-background"
                          ]
                        }, null, 10, ["onClick", "innerHTML"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          innerHTML: link.label,
                          class: "px-4 py-2 text-text-tertiary"
                        }, null, 8, ["innerHTML"]))
                      ], 64);
                    }), 128))
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/BibleHeadings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
