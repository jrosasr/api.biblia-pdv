import { ref, resolveComponent, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, Fragment, renderList, toDisplayString, Transition, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-M76oUEYl.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./Editor-crTvPFa9.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@editorjs/editorjs";
import "@editorjs/header";
import "@editorjs/list";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    devotionals: Array
  },
  setup(__props) {
    const isModalOpen = ref(false);
    const editingDevotional = ref(null);
    const form = useForm({
      title: "",
      content: { blocks: [] }
    });
    const openCreateModal = () => {
      editingDevotional.value = null;
      form.reset();
      form.content = { blocks: [] };
      isModalOpen.value = true;
    };
    const openEditModal = (devotional) => {
      editingDevotional.value = devotional;
      form.title = devotional.title;
      form.content = devotional.content;
      isModalOpen.value = true;
    };
    const submit = () => {
      if (editingDevotional.value) {
        form.put(route("user-devotionals.update", editingDevotional.value.id), {
          onSuccess: () => closeModal()
        });
      } else {
        form.post(route("user-devotionals.store"), {
          onSuccess: () => closeModal()
        });
      }
    };
    const deleteDevotional = (id) => {
      if (confirm("¿Estás seguro de que deseas eliminar este devocional?")) {
        form.delete(route("user-devotionals.destroy", id), {
          preserveScroll: true
        });
      }
    };
    const closeModal = () => {
      isModalOpen.value = false;
      form.reset();
      editingDevotional.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Mis Devocionales" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center" data-v-3818b8a8${_scopeId}><h2 class="text-xl font-bold leading-tight text-primary" data-v-3818b8a8${_scopeId}>Mis Devocionales</h2><button class="px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all text-sm flex items-center gap-2" data-v-3818b8a8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-3818b8a8${_scopeId}></path></svg> Escribir reflexión </button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-bold leading-tight text-primary" }, "Mis Devocionales"),
                createVNode("button", {
                  onClick: openCreateModal,
                  class: "px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all text-sm flex items-center gap-2"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                    })
                  ])),
                  createTextVNode(" Escribir reflexión ")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 px-4" data-v-3818b8a8${_scopeId}><div class="mx-auto max-w-7xl" data-v-3818b8a8${_scopeId}>`);
            if (__props.devotionals.length === 0) {
              _push2(`<div class="text-center py-32 bg-surface rounded-[2.5rem] border border-border" data-v-3818b8a8${_scopeId}><div class="w-24 h-24 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-6" data-v-3818b8a8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-3818b8a8${_scopeId}></path></svg></div><h3 class="text-2xl font-bold text-text" data-v-3818b8a8${_scopeId}>Tu diario espiritual</h3><p class="text-text-secondary mt-3 max-w-md mx-auto" data-v-3818b8a8${_scopeId}>Guarda tus pensamientos, oraciones y lo que Dios habla a tu vida cada día.</p></div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-3818b8a8${_scopeId}><!--[-->`);
              ssrRenderList(__props.devotionals, (devotional) => {
                _push2(`<div class="group bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col min-h-[250px] relative overflow-hidden" data-v-3818b8a8${_scopeId}><div class="flex-1" data-v-3818b8a8${_scopeId}><div class="flex items-center gap-2 mb-4" data-v-3818b8a8${_scopeId}><span class="px-3 py-1 bg-surface-alt text-[10px] font-black uppercase tracking-widest text-primary rounded-full" data-v-3818b8a8${_scopeId}>${ssrInterpolate(new Date(devotional.created_at).toLocaleDateString("es-ES", { month: "short", day: "numeric" }))}</span></div><h4 class="text-2xl font-black text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight" data-v-3818b8a8${_scopeId}>${ssrInterpolate(devotional.title)}</h4></div><div class="mt-8 flex justify-between items-center border-t border-border pt-6" data-v-3818b8a8${_scopeId}><div class="flex gap-2" data-v-3818b8a8${_scopeId}><button class="p-3 bg-surface-alt hover:bg-primary hover:text-white rounded-full transition-all text-text-secondary" data-v-3818b8a8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-3818b8a8${_scopeId}></path></svg></button><button class="p-3 bg-surface-alt hover:bg-red-500 hover:text-white rounded-full transition-all text-text-secondary" data-v-3818b8a8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-3818b8a8${_scopeId}></path></svg></button></div>`);
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("user-devotionals.show", devotional.id),
                  class: "text-sm font-bold text-primary flex items-center gap-1 group/btn"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Leer más <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-3818b8a8${_scopeId2}></path></svg>`);
                    } else {
                      return [
                        createTextVNode(" Leer más "),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 5l7 7-7 7"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
            if (isModalOpen.value) {
              _push2(`<div class="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4" data-v-3818b8a8${_scopeId}><div class="absolute inset-0 bg-black/60 backdrop-blur-md" data-v-3818b8a8${_scopeId}></div><div class="relative w-full max-w-4xl bg-surface sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh]" data-v-3818b8a8${_scopeId}><div class="p-8 border-b border-border flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-10" data-v-3818b8a8${_scopeId}><div data-v-3818b8a8${_scopeId}><h3 class="text-2xl font-black text-text" data-v-3818b8a8${_scopeId}>${ssrInterpolate(editingDevotional.value ? "Editar Reflexión" : "Escribir Reflexión")}</h3><p class="text-sm text-text-tertiary" data-v-3818b8a8${_scopeId}>Dios tiene algo nuevo para ti hoy.</p></div><button class="p-3 rounded-full hover:bg-surface-alt transition-colors" data-v-3818b8a8${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3818b8a8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3818b8a8${_scopeId}></path></svg></button></div><form class="flex-1 overflow-y-auto p-8 space-y-8" data-v-3818b8a8${_scopeId}><div data-v-3818b8a8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "title",
                value: "Título",
                class: "mb-2 ml-1"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "title",
                modelValue: unref(form).title,
                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                type: "text",
                class: "w-full text-xl font-bold bg-background/50",
                placeholder: "Dale un título a tu reflexión...",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                class: "mt-2",
                message: unref(form).errors.title
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-4" data-v-3818b8a8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: "Tu contenido",
                class: "mb-2 ml-1"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                modelValue: unref(form).content,
                "onUpdate:modelValue": ($event) => unref(form).content = $event,
                placeholder: "Escribe lo que Dios puso en tu corazón..."
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                class: "mt-2",
                message: unref(form).errors.content
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-4" data-v-3818b8a8${_scopeId}><button type="button" class="px-8 py-3 text-text-secondary font-bold hover:bg-surface-alt rounded-full transition-all text-center" data-v-3818b8a8${_scopeId}> Guardar como borrador </button><button type="submit" class="px-8 py-3 bg-primary text-white dark:text-background font-black rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 text-center"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-3818b8a8${_scopeId}>${ssrInterpolate(editingDevotional.value ? "Actualizar Reflexión" : "Guardar Reflexión")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "py-12 px-4" }, [
                createVNode("div", { class: "mx-auto max-w-7xl" }, [
                  __props.devotionals.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-32 bg-surface rounded-[2.5rem] border border-border"
                  }, [
                    createVNode("div", { class: "w-24 h-24 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-12 h-12 text-text-tertiary",
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
                    createVNode("h3", { class: "text-2xl font-bold text-text" }, "Tu diario espiritual"),
                    createVNode("p", { class: "text-text-secondary mt-3 max-w-md mx-auto" }, "Guarda tus pensamientos, oraciones y lo que Dios habla a tu vida cada día.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.devotionals, (devotional) => {
                      return openBlock(), createBlock("div", {
                        key: devotional.id,
                        class: "group bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col min-h-[250px] relative overflow-hidden"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                            createVNode("span", { class: "px-3 py-1 bg-surface-alt text-[10px] font-black uppercase tracking-widest text-primary rounded-full" }, toDisplayString(new Date(devotional.created_at).toLocaleDateString("es-ES", { month: "short", day: "numeric" })), 1)
                          ]),
                          createVNode("h4", { class: "text-2xl font-black text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight" }, toDisplayString(devotional.title), 1)
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-between items-center border-t border-border pt-6" }, [
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode("button", {
                              onClick: ($event) => openEditModal(devotional),
                              class: "p-3 bg-surface-alt hover:bg-primary hover:text-white rounded-full transition-all text-text-secondary"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-5 h-5",
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
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => deleteDevotional(devotional.id),
                              class: "p-3 bg-surface-alt hover:bg-red-500 hover:text-white rounded-full transition-all text-text-secondary"
                            }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-5 h-5",
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
                          ]),
                          createVNode(_component_Link, {
                            href: _ctx.route("user-devotionals.show", devotional.id),
                            class: "text-sm font-bold text-primary flex items-center gap-1 group/btn"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Leer más "),
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 5l7 7-7 7"
                                })
                              ]))
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ]);
                    }), 128))
                  ]))
                ])
              ]),
              createVNode(Transition, { name: "fade" }, {
                default: withCtx(() => [
                  isModalOpen.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4"
                  }, [
                    createVNode("div", {
                      class: "absolute inset-0 bg-black/60 backdrop-blur-md",
                      onClick: closeModal
                    }),
                    createVNode("div", { class: "relative w-full max-w-4xl bg-surface sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh]" }, [
                      createVNode("div", { class: "p-8 border-b border-border flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-10" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-2xl font-black text-text" }, toDisplayString(editingDevotional.value ? "Editar Reflexión" : "Escribir Reflexión"), 1),
                          createVNode("p", { class: "text-sm text-text-tertiary" }, "Dios tiene algo nuevo para ti hoy.")
                        ]),
                        createVNode("button", {
                          onClick: closeModal,
                          class: "p-3 rounded-full hover:bg-surface-alt transition-colors"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "w-6 h-6 text-text",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M6 18L18 6M6 6l12 12"
                            })
                          ]))
                        ])
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "flex-1 overflow-y-auto p-8 space-y-8"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Título",
                            class: "mb-2 ml-1"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            class: "w-full text-xl font-bold bg-background/50",
                            placeholder: "Dale un título a tu reflexión...",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.title
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_sfc_main$2, {
                            value: "Tu contenido",
                            class: "mb-2 ml-1"
                          }),
                          createVNode(_sfc_main$5, {
                            modelValue: unref(form).content,
                            "onUpdate:modelValue": ($event) => unref(form).content = $event,
                            placeholder: "Escribe lo que Dios puso en tu corazón..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.content
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "pt-8 border-t border-border flex flex-col sm:flex-row justify-end gap-4" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "px-8 py-3 text-text-secondary font-bold hover:bg-surface-alt rounded-full transition-all text-center"
                          }, " Guardar como borrador "),
                          createVNode("button", {
                            type: "submit",
                            class: "px-8 py-3 bg-primary text-white dark:text-background font-black rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 text-center",
                            disabled: unref(form).processing
                          }, toDisplayString(editingDevotional.value ? "Actualizar Reflexión" : "Guardar Reflexión"), 9, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/UserDevotionals/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3818b8a8"]]);
export {
  Index as default
};
