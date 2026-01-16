import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelSelect, Transition, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-FYN_q5vT.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$5 } from "./Editor-crTvPFa9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@editorjs/editorjs";
import "@editorjs/header";
import "@editorjs/list";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    devotional: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.devotional.data.title || "",
      content: props.devotional.data.content || {},
      status: props.devotional.data.status || "draft",
      image: props.devotional.data.image || "",
      video: props.devotional.data.video || "",
      audio: props.devotional.data.audio || "",
      published_at: props.devotional.data.published_at ? new Date(props.devotional.data.published_at).toISOString().slice(0, 16) : ""
    });
    const submit = () => {
      form.put(route("devotionals.update", props.devotional.data.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Editar Devocional" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-xl text-primary leading-tight"${_scopeId}>Editar Devocional</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-xl text-primary leading-tight" }, "Editar Devocional")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Título del Devocional"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "title",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: "",
              autofocus: "",
              autocomplete: "title"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Contenido" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              modelValue: unref(form).content,
              "onUpdate:modelValue": ($event) => unref(form).content = $event
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.content
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "status",
              value: "Estado"
            }, null, _parent2, _scopeId));
            _push2(`<select id="status" class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"${_scopeId}><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId}>Borrador</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}${_scopeId}>Publicado</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.status
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "published_at",
              value: "Fecha de Publicación"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "published_at",
              type: "datetime-local",
              class: "mt-1 block w-full",
              modelValue: unref(form).published_at,
              "onUpdate:modelValue": ($event) => unref(form).published_at = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.published_at
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-4 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Actualizar`);
                } else {
                  return [
                    createTextVNode("Actualizar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(form).recentlySuccessful) {
              _push2(`<p class="text-sm text-green-600 font-medium"${_scopeId}>Guardado.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("devotionals.index"),
              class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancelar`);
                } else {
                  return [
                    createTextVNode("Cancelar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-surface overflow-hidden shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Título del Devocional"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: "",
                            autofocus: "",
                            autocomplete: "title"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.title
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, { value: "Contenido" }),
                          createVNode("div", { class: "mt-1" }, [
                            createVNode(_sfc_main$5, {
                              modelValue: unref(form).content,
                              "onUpdate:modelValue": ($event) => unref(form).content = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.content
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "status",
                            value: "Estado"
                          }),
                          withDirectives(createVNode("select", {
                            id: "status",
                            "onUpdate:modelValue": ($event) => unref(form).status = $event,
                            class: "mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all"
                          }, [
                            createVNode("option", { value: "draft" }, "Borrador"),
                            createVNode("option", { value: "published" }, "Publicado")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).status]
                          ]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.status
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "published_at",
                            value: "Fecha de Publicación"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "published_at",
                            type: "datetime-local",
                            class: "mt-1 block w-full",
                            modelValue: unref(form).published_at,
                            "onUpdate:modelValue": ($event) => unref(form).published_at = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            class: "mt-2",
                            message: unref(form).errors.published_at
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4 pt-4" }, [
                          createVNode(PrimaryButton, {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Actualizar")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-in-out",
                            "enter-from-class": "opacity-0",
                            "leave-active-class": "transition ease-in-out",
                            "leave-to-class": "opacity-0"
                          }, {
                            default: withCtx(() => [
                              unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-green-600 font-medium"
                              }, "Guardado.")) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Link), {
                            href: _ctx.route("devotionals.index"),
                            class: "text-sm font-bold text-text-tertiary hover:text-primary transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Devotionals/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
