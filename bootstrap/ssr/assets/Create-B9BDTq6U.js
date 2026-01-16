import { unref, withCtx, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-FYN_q5vT.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    books: Array
  },
  setup(__props) {
    const form = useForm({
      book_id: "",
      headings: [
        { chapter: "", verse: "", title: "" }
      ]
    });
    const addRow = () => {
      form.headings.push({ chapter: "", verse: "", title: "" });
    };
    const removeRow = (index) => {
      if (form.headings.length > 1) {
        form.headings.splice(index, 1);
      }
    };
    const submit = () => {
      form.post(route("bible-headings.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Agregar Títulos" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-bold leading-tight text-primary"${_scopeId}> Agregar Títulos a la Biblia </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-headings.index"),
              class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Volver al listado `);
                } else {
                  return [
                    createTextVNode(" Volver al listado ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-bold leading-tight text-primary" }, " Agregar Títulos a la Biblia "),
                createVNode(unref(Link), {
                  href: _ctx.route("bible-headings.index"),
                  class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Volver al listado ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden"${_scopeId}><form class="p-8 space-y-8"${_scopeId}><div class="max-w-md"${_scopeId}><label class="block text-sm font-bold text-text-secondary mb-2"${_scopeId}>Seleccionar Libro</label><select class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all text-lg font-bold" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).book_id) ? ssrLooseContain(unref(form).book_id, "") : ssrLooseEqual(unref(form).book_id, "")) ? " selected" : ""}${_scopeId}>Seleccionar el libro para estos títulos...</option><!--[-->`);
            ssrRenderList(__props.books, (book) => {
              _push2(`<option${ssrRenderAttr("value", book.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).book_id) ? ssrLooseContain(unref(form).book_id, book.id) : ssrLooseEqual(unref(form).book_id, book.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(book.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.book_id) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.book_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4"${_scopeId}><h3 class="text-sm font-black uppercase tracking-widest text-text-tertiary"${_scopeId}>Lista de Títulos (Perícopes)</h3><!--[-->`);
            ssrRenderList(unref(form).headings, (heading, index) => {
              _push2(`<div class="flex flex-wrap md:flex-nowrap gap-4 items-start bg-background/30 p-4 rounded-2xl border border-border/50"${_scopeId}><div class="w-24 shrink-0"${_scopeId}><label class="block text-xs font-bold text-text-tertiary mb-1"${_scopeId}>Cap.</label><input${ssrRenderAttr("value", heading.chapter)} type="number" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required placeholder="1"${_scopeId}>`);
              if (unref(form).errors[`headings.${index}.chapter`]) {
                _push2(`<div class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors[`headings.${index}.chapter`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="w-24 shrink-0"${_scopeId}><label class="block text-xs font-bold text-text-tertiary mb-1"${_scopeId}>Ver.</label><input${ssrRenderAttr("value", heading.verse)} type="number" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required placeholder="1"${_scopeId}>`);
              if (unref(form).errors[`headings.${index}.verse`]) {
                _push2(`<div class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors[`headings.${index}.verse`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex-1"${_scopeId}><label class="block text-xs font-bold text-text-tertiary mb-1"${_scopeId}>Texto del Título</label><input${ssrRenderAttr("value", heading.title)} type="text" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required placeholder="Ej: La creación del mundo"${_scopeId}>`);
              if (unref(form).errors[`headings.${index}.title`]) {
                _push2(`<div class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors[`headings.${index}.title`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(form).headings.length > 1) {
                _push2(`<button type="button" class="mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-all"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--><button type="button" class="w-full py-4 border-2 border-dashed border-border rounded-2xl text-text-tertiary hover:border-primary hover:text-primary transition-all font-bold flex items-center justify-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Añadir otra fila </button></div><div class="pt-8 border-t border-border flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-10 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Guardando..." : "Guardar Todos los Títulos")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "p-8 space-y-8"
                    }, [
                      createVNode("div", { class: "max-w-md" }, [
                        createVNode("label", { class: "block text-sm font-bold text-text-secondary mb-2" }, "Seleccionar Libro"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).book_id = $event,
                          class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all text-lg font-bold",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Seleccionar el libro para estos títulos..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.books, (book) => {
                            return openBlock(), createBlock("option", {
                              key: book.id,
                              value: book.id
                            }, toDisplayString(book.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).book_id]
                        ]),
                        unref(form).errors.book_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(unref(form).errors.book_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("h3", { class: "text-sm font-black uppercase tracking-widest text-text-tertiary" }, "Lista de Títulos (Perícopes)"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).headings, (heading, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex flex-wrap md:flex-nowrap gap-4 items-start bg-background/30 p-4 rounded-2xl border border-border/50"
                          }, [
                            createVNode("div", { class: "w-24 shrink-0" }, [
                              createVNode("label", { class: "block text-xs font-bold text-text-tertiary mb-1" }, "Cap."),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => heading.chapter = $event,
                                type: "number",
                                class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                                required: "",
                                placeholder: "1"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, heading.chapter]
                              ]),
                              unref(form).errors[`headings.${index}.chapter`] ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors[`headings.${index}.chapter`]), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "w-24 shrink-0" }, [
                              createVNode("label", { class: "block text-xs font-bold text-text-tertiary mb-1" }, "Ver."),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => heading.verse = $event,
                                type: "number",
                                class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                                required: "",
                                placeholder: "1"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, heading.verse]
                              ]),
                              unref(form).errors[`headings.${index}.verse`] ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors[`headings.${index}.verse`]), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("label", { class: "block text-xs font-bold text-text-tertiary mb-1" }, "Texto del Título"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => heading.title = $event,
                                type: "text",
                                class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                                required: "",
                                placeholder: "Ej: La creación del mundo"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, heading.title]
                              ]),
                              unref(form).errors[`headings.${index}.title`] ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors[`headings.${index}.title`]), 1)) : createCommentVNode("", true)
                            ]),
                            unref(form).headings.length > 1 ? (openBlock(), createBlock("button", {
                              key: 0,
                              type: "button",
                              onClick: ($event) => removeRow(index),
                              class: "mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-all"
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
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]);
                        }), 128)),
                        createVNode("button", {
                          type: "button",
                          onClick: addRow,
                          class: "w-full py-4 border-2 border-dashed border-border rounded-2xl text-text-tertiary hover:border-primary hover:text-primary transition-all font-bold flex items-center justify-center gap-2"
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
                              d: "M12 4v16m8-8H4"
                            })
                          ])),
                          createTextVNode(" Añadir otra fila ")
                        ])
                      ]),
                      createVNode("div", { class: "pt-8 border-t border-border flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-10 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Guardando..." : "Guardar Todos los Títulos"), 9, ["disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/BibleHeadings/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
