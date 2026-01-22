import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelSelect, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-M76oUEYl.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$5 } from "./TextArea-DkIJefRA.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    series: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.series.title,
      description: props.series.description || "",
      difficulty_level: props.series.difficulty_level || 1,
      cover_image: null,
      _method: "patch"
    });
    const submit = () => {
      form.post(route("bible-series.update", props.series.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Editar Serie Bíblica" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}> Editar Serie: ${ssrInterpolate(__props.series.title)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, " Editar Serie: " + toDisplayString(__props.series.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-3xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface overflow-hidden shadow-xl sm:rounded-2xl border border-border"${_scopeId}><div class="p-8"${_scopeId}><header class="mb-8 border-b border-border pb-4 font-bold"${_scopeId}><h3 class="text-lg text-text"${_scopeId}>Información de la Serie</h3></header><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Título de la Serie"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Descripción"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "description",
              class: "mt-1 block w-full",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              rows: "5"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "difficulty_level",
              value: "Nivel de Dificultad"
            }, null, _parent2, _scopeId));
            _push2(`<select id="difficulty_level" class="mt-1 block w-full border-border bg-surface text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm" required${_scopeId}><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "1") : ssrLooseEqual(unref(form).difficulty_level, "1")) ? " selected" : ""}${_scopeId}>Historias cortas</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "2") : ssrLooseEqual(unref(form).difficulty_level, "2")) ? " selected" : ""}${_scopeId}>Historias largas</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "3") : ssrLooseEqual(unref(form).difficulty_level, "3")) ? " selected" : ""}${_scopeId}>Historias más difíciles</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.difficulty_level
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "cover_image",
              value: "Imagen de Portada"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2 flex gap-4 items-start"${_scopeId}>`);
            if (__props.series.cover_image && !unref(form).cover_image) {
              _push2(`<div class="w-32 h-32 rounded-xl overflow-hidden border border-border flex-shrink-0 shadow-sm"${_scopeId}><img${ssrRenderAttr("src", __props.series.cover_image)} class="w-full h-full object-cover" alt="Actual cover"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:bg-surface-alt transition-colors cursor-pointer relative group"${_scopeId}><div class="space-y-1 text-center"${_scopeId}>`);
            if (!unref(form).cover_image) {
              _push2(`<svg class="mx-auto h-12 w-12 text-text-tertiary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"${_scopeId}><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex text-sm text-text-secondary"${_scopeId}><label for="cover_image" class="relative cursor-pointer bg-background rounded-md font-bold text-primary hover:opacity-80 focus-within:outline-none focus:ring-2 focus:ring-primary px-2"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(form).cover_image ? "Cambiar archivo" : "Subir nueva imagen")}</span><input id="cover_image" name="cover_image" type="file" class="sr-only" accept="image/*"${_scopeId}></label></div>`);
            if (unref(form).cover_image) {
              _push2(`<p class="text-sm text-primary font-bold mt-2"${_scopeId}> Seleccionado: ${ssrInterpolate(unref(form).cover_image.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.cover_image
            }, null, _parent2, _scopeId));
            if (unref(form).progress) {
              _push2(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100" class="w-full mt-4 h-1 bg-surface-alt rounded-full overflow-hidden"${_scopeId}><div class="bg-primary h-1" style="${ssrRenderStyle({ width: unref(form).progress.percentage + "%" })}"${_scopeId}></div></progress>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-end gap-5 pt-8 border-t border-border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-series.index"),
              class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
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
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(form).processing,
              class: "shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Actualizar Serie `);
                } else {
                  return [
                    createTextVNode(" Actualizar Serie ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-3xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface overflow-hidden shadow-xl sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-8" }, [
                      createVNode("header", { class: "mb-8 border-b border-border pb-4 font-bold" }, [
                        createVNode("h3", { class: "text-lg text-text" }, "Información de la Serie")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Título de la Serie"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.title
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "description",
                            value: "Descripción"
                          }),
                          createVNode(_sfc_main$5, {
                            id: "description",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "5"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.description
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "difficulty_level",
                            value: "Nivel de Dificultad"
                          }),
                          withDirectives(createVNode("select", {
                            id: "difficulty_level",
                            class: "mt-1 block w-full border-border bg-surface text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm",
                            "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "1" }, "Historias cortas"),
                            createVNode("option", { value: "2" }, "Historias largas"),
                            createVNode("option", { value: "3" }, "Historias más difíciles")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).difficulty_level]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.difficulty_level
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "cover_image",
                            value: "Imagen de Portada"
                          }),
                          createVNode("div", { class: "mt-2 flex gap-4 items-start" }, [
                            __props.series.cover_image && !unref(form).cover_image ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-32 h-32 rounded-xl overflow-hidden border border-border flex-shrink-0 shadow-sm"
                            }, [
                              createVNode("img", {
                                src: __props.series.cover_image,
                                class: "w-full h-full object-cover",
                                alt: "Actual cover"
                              }, null, 8, ["src"])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:bg-surface-alt transition-colors cursor-pointer relative group" }, [
                              createVNode("div", { class: "space-y-1 text-center" }, [
                                !unref(form).cover_image ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "mx-auto h-12 w-12 text-text-tertiary",
                                  stroke: "currentColor",
                                  fill: "none",
                                  viewBox: "0 0 48 48",
                                  "aria-hidden": "true"
                                }, [
                                  createVNode("path", {
                                    d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",
                                    "stroke-width": "2",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  })
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "flex text-sm text-text-secondary" }, [
                                  createVNode("label", {
                                    for: "cover_image",
                                    class: "relative cursor-pointer bg-background rounded-md font-bold text-primary hover:opacity-80 focus-within:outline-none focus:ring-2 focus:ring-primary px-2"
                                  }, [
                                    createVNode("span", null, toDisplayString(unref(form).cover_image ? "Cambiar archivo" : "Subir nueva imagen"), 1),
                                    createVNode("input", {
                                      id: "cover_image",
                                      name: "cover_image",
                                      type: "file",
                                      class: "sr-only",
                                      onInput: ($event) => unref(form).cover_image = $event.target.files[0],
                                      accept: "image/*"
                                    }, null, 40, ["onInput"])
                                  ])
                                ]),
                                unref(form).cover_image ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "text-sm text-primary font-bold mt-2"
                                }, " Seleccionado: " + toDisplayString(unref(form).cover_image.name), 1)) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.cover_image
                          }, null, 8, ["message"]),
                          unref(form).progress ? (openBlock(), createBlock("progress", {
                            key: 0,
                            value: unref(form).progress.percentage,
                            max: "100",
                            class: "w-full mt-4 h-1 bg-surface-alt rounded-full overflow-hidden"
                          }, [
                            createVNode("div", {
                              class: "bg-primary h-1",
                              style: { width: unref(form).progress.percentage + "%" }
                            }, null, 4)
                          ], 8, ["value"])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-end gap-5 pt-8 border-t border-border" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("bible-series.index"),
                            class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancelar ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(PrimaryButton, {
                            disabled: unref(form).processing,
                            class: "shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Actualizar Serie ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleSeries/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
