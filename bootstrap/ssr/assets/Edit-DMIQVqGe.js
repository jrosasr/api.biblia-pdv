import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-FYN_q5vT.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    heading: Object,
    books: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      book_id: props.heading.data.book_id,
      chapter: props.heading.data.chapter,
      verse: props.heading.data.verse,
      title: props.heading.data.title
    });
    const submit = () => {
      form.put(route("bible-headings.update", props.heading.data.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Editar Título" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-bold leading-tight text-primary"${_scopeId}> Editar Título de la Biblia </h2>`);
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
                createVNode("h2", { class: "text-xl font-bold leading-tight text-primary" }, " Editar Título de la Biblia "),
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
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden p-8"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-bold text-text-secondary mb-2"${_scopeId}>Libro</label><select class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all" required${_scopeId}><!--[-->`);
            ssrRenderList(__props.books, (book) => {
              _push2(`<option${ssrRenderAttr("value", book.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).book_id) ? ssrLooseContain(unref(form).book_id, book.id) : ssrLooseEqual(unref(form).book_id, book.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(book.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.book_id) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.book_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-bold text-text-secondary mb-2"${_scopeId}>Capítulo</label><input${ssrRenderAttr("value", unref(form).chapter)} type="number" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required${_scopeId}>`);
            if (unref(form).errors.chapter) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.chapter)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-bold text-text-secondary mb-2"${_scopeId}>Versículo</label><input${ssrRenderAttr("value", unref(form).verse)} type="number" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required${_scopeId}>`);
            if (unref(form).errors.verse) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.verse)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-bold text-text-secondary mb-2"${_scopeId}>Texto del Título (Heading)</label><textarea rows="3" class="w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required${_scopeId}>${ssrInterpolate(unref(form).title)}</textarea>`);
            if (unref(form).errors.title) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="pt-6 border-t border-border flex gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-headings.index"),
              class: "flex-1 text-center py-4 border border-border text-text font-bold rounded-2xl hover:bg-background transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancelar `);
                } else {
                  return [
                    createTextVNode(" Cancelar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex-1 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:opacity-90 transition-all disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Guardando..." : "Guardar Cambios")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface shadow-sm sm:rounded-2xl border border-border overflow-hidden p-8" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-bold text-text-secondary mb-2" }, "Libro"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).book_id = $event,
                          class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all",
                          required: ""
                        }, [
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
                      createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-bold text-text-secondary mb-2" }, "Capítulo"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).chapter = $event,
                            type: "number",
                            class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).chapter]
                          ]),
                          unref(form).errors.chapter ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-500 text-sm mt-1"
                          }, toDisplayString(unref(form).errors.chapter), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-bold text-text-secondary mb-2" }, "Versículo"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).verse = $event,
                            type: "number",
                            class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).verse]
                          ]),
                          unref(form).errors.verse ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-500 text-sm mt-1"
                          }, toDisplayString(unref(form).errors.verse), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-bold text-text-secondary mb-2" }, "Texto del Título (Heading)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          rows: "3",
                          class: "w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "pt-6 border-t border-border flex gap-4" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("bible-headings.index"),
                          class: "flex-1 text-center py-4 border border-border text-text font-bold rounded-2xl hover:bg-background transition-all"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "flex-1 py-4 bg-primary text-white dark:text-background font-black rounded-2xl shadow-xl hover:opacity-90 transition-all disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Guardando..." : "Guardar Cambios"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/BibleHeadings/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
