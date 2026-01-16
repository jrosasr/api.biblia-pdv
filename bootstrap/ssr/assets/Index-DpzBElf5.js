import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-FYN_q5vT.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    messages: Object
  },
  setup(__props) {
    const form = useForm({});
    const deleteMessage = (id) => {
      if (confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
        form.delete(route("contact-messages.destroy", id));
      }
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Mensajes de Contacto" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight"${_scopeId}> Mensajes de Contacto </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight" }, " Mensajes de Contacto ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[2rem] border border-[#E0D5C9] dark:border-[#2E2A25]"${_scopeId}><div class="p-8"${_scopeId}>`);
            if (__props.messages.data.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}><p class="text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg"${_scopeId}>No hay mensajes de contacto aún.</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="border-b border-[#E0D5C9] dark:border-[#2E2A25]"${_scopeId}><th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>Nombre</th><th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>Email</th><th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>Fecha</th><th class="py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs text-right"${_scopeId}>Acciones</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.messages.data, (message) => {
                _push2(`<tr class="border-b border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 hover:bg-[#8B6F47]/5 transition-colors group"${_scopeId}><td class="py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6] font-bold"${_scopeId}>${ssrInterpolate(message.name)}</td><td class="py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6]"${_scopeId}>${ssrInterpolate(message.email)}</td><td class="py-4 px-6 text-[#8B6F47] dark:text-[#9B8D82] text-sm"${_scopeId}>${ssrInterpolate(formatDate(message.created_at))}</td><td class="py-4 px-6 text-right space-x-3"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("contact-messages.show", message.id),
                  class: "inline-flex items-center px-4 py-2 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Ver `);
                    } else {
                      return [
                        createTextVNode(" Ver ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"${_scopeId}> Eliminar </button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[2rem] border border-[#E0D5C9] dark:border-[#2E2A25]" }, [
                    createVNode("div", { class: "p-8" }, [
                      __props.messages.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode("p", { class: "text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg" }, "No hay mensajes de contacto aún.")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "w-full text-left border-collapse" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b border-[#E0D5C9] dark:border-[#2E2A25]" }, [
                              createVNode("th", { class: "py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "Nombre"),
                              createVNode("th", { class: "py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "Email"),
                              createVNode("th", { class: "py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "Fecha"),
                              createVNode("th", { class: "py-4 px-6 text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs text-right" }, "Acciones")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.messages.data, (message) => {
                              return openBlock(), createBlock("tr", {
                                key: message.id,
                                class: "border-b border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 hover:bg-[#8B6F47]/5 transition-colors group"
                              }, [
                                createVNode("td", { class: "py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6] font-bold" }, toDisplayString(message.name), 1),
                                createVNode("td", { class: "py-4 px-6 text-[#3A3026] dark:text-[#F5F0E6]" }, toDisplayString(message.email), 1),
                                createVNode("td", { class: "py-4 px-6 text-[#8B6F47] dark:text-[#9B8D82] text-sm" }, toDisplayString(formatDate(message.created_at)), 1),
                                createVNode("td", { class: "py-4 px-6 text-right space-x-3" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("contact-messages.show", message.id),
                                    class: "inline-flex items-center px-4 py-2 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Ver ")
                                    ]),
                                    _: 1
                                  }, 8, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteMessage(message.id),
                                    class: "inline-flex items-center px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                                  }, " Eliminar ", 8, ["onClick"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ContactMessages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
