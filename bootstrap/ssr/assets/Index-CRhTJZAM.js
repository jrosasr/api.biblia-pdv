import { ref, unref, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CdgzzzdO.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import "./DangerButton-B-RLDyCd.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-C4moTHdn.js";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { _ as _sfc_main$2 } from "./Modal-Ddh620YX.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$5 } from "./InputError-CAen27BF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tokens: Array
  },
  setup(__props) {
    const showingNotificationModal = ref(false);
    const selectedToken = ref(null);
    const form = useForm({
      title: "",
      body: ""
    });
    const openNotificationModal = (token) => {
      selectedToken.value = token;
      showingNotificationModal.value = true;
    };
    const closeNotificationModal = () => {
      showingNotificationModal.value = false;
      form.reset();
    };
    const sendNotification = () => {
      form.post(route("device-tokens.send", selectedToken.value.id), {
        onSuccess: () => {
          closeNotificationModal();
        },
        onError: (errors) => {
          console.error(errors);
        }
      });
    };
    const deleteToken = (id) => {
      if (confirm("¿Estás seguro de eliminar este dispositivo?")) {
        router.delete(route("device-tokens.destroy", id));
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Nunca";
      return new Date(dateString).toLocaleString("es-ES");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dispositivos" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Dispositivos Registrados</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Dispositivos Registrados")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}>`);
            if (_ctx.$page.props.flash.success) {
              _push2(`<div class="mb-4 p-4 bg-green-100/10 border border-green-500 text-green-600 rounded-xl transition-all duration-500 font-bold text-sm"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.errors.error) {
              _push2(`<div class="mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm"${_scopeId}>${ssrInterpolate(_ctx.$page.props.errors.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}>`);
            if (__props.tokens.length === 0) {
              _push2(`<div class="text-center py-8 text-text-tertiary font-medium"${_scopeId}> No hay dispositivos registrados. </div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-border"${_scopeId}><thead class="bg-surface-alt/50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Dispositivo</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Usuario</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Topics</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Plataforma</th><th scope="col" class="px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Último uso</th><th scope="col" class="px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"${_scopeId}>Acciones</th></tr></thead><tbody class="bg-surface divide-y divide-border"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tokens, (token) => {
                _push2(`<tr class="hover:bg-surface-alt/30 transition-colors"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-bold text-text"${_scopeId}>${ssrInterpolate(token.device_name || "Desconocido")}</div><div class="text-[10px] text-text-tertiary font-medium truncate max-w-xs"${_scopeId}>${ssrInterpolate(token.device_id)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium"${_scopeId}>${ssrInterpolate(token.user ? token.user.name : "Invitado")}</td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                ssrRenderList(token.topics, (topic) => {
                  _push2(`<span class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full tracking-tighter"${_scopeId}>${ssrInterpolate(topic)}</span>`);
                });
                _push2(`<!--]-->`);
                if (!token.topics || token.topics.length === 0) {
                  _push2(`<span class="text-text-tertiary italic text-xs"${_scopeId}>Ninguno</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium"${_scopeId}>${ssrInterpolate(token.platform || "N/A")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium"${_scopeId}>${ssrInterpolate(formatDate(token.last_used_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold"${_scopeId}><button class="text-primary hover:opacity-80 transition-opacity mr-4"${_scopeId}>Enviar Msg</button><button class="text-red-500 hover:text-red-700 transition-colors"${_scopeId}>Eliminar</button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              show: showingNotificationModal.value,
              onClose: closeNotificationModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-8 bg-surface text-text"${_scopeId2}><h2 class="text-xl font-bold text-primary mb-2"${_scopeId2}> Enviar mensaje </h2><p class="text-sm text-text-secondary mb-6"${_scopeId2}> A: <span class="font-bold text-text"${_scopeId2}>${ssrInterpolate(selectedToken.value?.device_name || "dispositivo")}</span></p><div class="space-y-4"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    for: "title",
                    value: "Título"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "title",
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    type: "text",
                    class: "mt-1 block w-full",
                    placeholder: "Título de la notificación",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(form).errors.title,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    for: "body",
                    value: "Mensaje"
                  }, null, _parent3, _scopeId2));
                  _push3(`<textarea id="body" class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all" rows="3" placeholder="Contenido del mensaje" required${_scopeId2}>${ssrInterpolate(unref(form).body)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: unref(form).errors.body,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-8 flex justify-end gap-3 font-bold"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, { onClick: closeNotificationModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancelar `);
                      } else {
                        return [
                          createTextVNode(" Cancelar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(PrimaryButton, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing,
                    onClick: sendNotification
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Enviar Notificación `);
                      } else {
                        return [
                          createTextVNode(" Enviar Notificación ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-8 bg-surface text-text" }, [
                      createVNode("h2", { class: "text-xl font-bold text-primary mb-2" }, " Enviar mensaje "),
                      createVNode("p", { class: "text-sm text-text-secondary mb-6" }, [
                        createTextVNode(" A: "),
                        createVNode("span", { class: "font-bold text-text" }, toDisplayString(selectedToken.value?.device_name || "dispositivo"), 1)
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "title",
                            value: "Título"
                          }),
                          createVNode(_sfc_main$4, {
                            id: "title",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            placeholder: "Título de la notificación",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.title,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$3, {
                            for: "body",
                            value: "Mensaje"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "body",
                            "onUpdate:modelValue": ($event) => unref(form).body = $event,
                            class: "mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all",
                            rows: "3",
                            placeholder: "Contenido del mensaje",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).body]
                          ]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.body,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex justify-end gap-3 font-bold" }, [
                        createVNode(_sfc_main$6, { onClick: closeNotificationModal }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }),
                        createVNode(PrimaryButton, {
                          class: { "opacity-25": unref(form).processing },
                          disabled: unref(form).processing,
                          onClick: sendNotification
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Enviar Notificación ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  _ctx.$page.props.flash.success ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 p-4 bg-green-100/10 border border-green-500 text-green-600 rounded-xl transition-all duration-500 font-bold text-sm"
                  }, toDisplayString(_ctx.$page.props.flash.success), 1)) : createCommentVNode("", true),
                  _ctx.$page.props.flash.error ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm"
                  }, toDisplayString(_ctx.$page.props.flash.error), 1)) : createCommentVNode("", true),
                  _ctx.$page.props.errors.error ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mb-4 p-4 bg-red-100/10 border border-red-500 text-red-500 rounded-xl transition-all duration-500 font-bold text-sm"
                  }, toDisplayString(_ctx.$page.props.errors.error), 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      __props.tokens.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 text-text-tertiary font-medium"
                      }, " No hay dispositivos registrados. ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-border" }, [
                          createVNode("thead", { class: "bg-surface-alt/50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Dispositivo"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Usuario"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Topics"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Plataforma"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-left text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Último uso"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-4 text-right text-xs font-bold text-text-tertiary uppercase tracking-wider"
                              }, "Acciones")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-surface divide-y divide-border" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.tokens, (token) => {
                              return openBlock(), createBlock("tr", {
                                key: token.id,
                                class: "hover:bg-surface-alt/30 transition-colors"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-bold text-text" }, toDisplayString(token.device_name || "Desconocido"), 1),
                                  createVNode("div", { class: "text-[10px] text-text-tertiary font-medium truncate max-w-xs" }, toDisplayString(token.device_id), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium" }, toDisplayString(token.user ? token.user.name : "Invitado"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                  createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(token.topics, (topic) => {
                                      return openBlock(), createBlock("span", {
                                        key: topic,
                                        class: "px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full tracking-tighter"
                                      }, toDisplayString(topic), 1);
                                    }), 128)),
                                    !token.topics || token.topics.length === 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-text-tertiary italic text-xs"
                                    }, "Ninguno")) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium" }, toDisplayString(token.platform || "N/A"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium" }, toDisplayString(formatDate(token.last_used_at)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-bold" }, [
                                  createVNode("button", {
                                    onClick: ($event) => openNotificationModal(token),
                                    class: "text-primary hover:opacity-80 transition-opacity mr-4"
                                  }, "Enviar Msg", 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteToken(token.id),
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
              ]),
              createVNode(_sfc_main$2, {
                show: showingNotificationModal.value,
                onClose: closeNotificationModal
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-8 bg-surface text-text" }, [
                    createVNode("h2", { class: "text-xl font-bold text-primary mb-2" }, " Enviar mensaje "),
                    createVNode("p", { class: "text-sm text-text-secondary mb-6" }, [
                      createTextVNode(" A: "),
                      createVNode("span", { class: "font-bold text-text" }, toDisplayString(selectedToken.value?.device_name || "dispositivo"), 1)
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$3, {
                          for: "title",
                          value: "Título"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          class: "mt-1 block w-full",
                          placeholder: "Título de la notificación",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          message: unref(form).errors.title,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$3, {
                          for: "body",
                          value: "Mensaje"
                        }),
                        withDirectives(createVNode("textarea", {
                          id: "body",
                          "onUpdate:modelValue": ($event) => unref(form).body = $event,
                          class: "mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all",
                          rows: "3",
                          placeholder: "Contenido del mensaje",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).body]
                        ]),
                        createVNode(_sfc_main$5, {
                          message: unref(form).errors.body,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mt-8 flex justify-end gap-3 font-bold" }, [
                      createVNode(_sfc_main$6, { onClick: closeNotificationModal }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancelar ")
                        ]),
                        _: 1
                      }),
                      createVNode(PrimaryButton, {
                        class: { "opacity-25": unref(form).processing },
                        disabled: unref(form).processing,
                        onClick: sendNotification
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Enviar Notificación ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/DeviceTokens/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
