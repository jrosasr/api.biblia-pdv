import { unref, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CdgzzzdO.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    contactMessage: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const deleteMessage = () => {
      if (confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
        form.delete(route("contact-messages.destroy", props.contactMessage.data.id));
      }
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Detalle del Mensaje" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight"${_scopeId}> Detalle del Mensaje </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("contact-messages.index"),
              class: "text-[#8B6F47] dark:text-[#E3C598] font-black flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg> Volver a la lista `);
                } else {
                  return [
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
                        d: "M15 19l-7-7 7-7"
                      })
                    ])),
                    createTextVNode(" Volver a la lista ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-black text-2xl text-[#3A3026] dark:text-[#F5F0E6] leading-tight" }, " Detalle del Mensaje "),
                createVNode(unref(Link), {
                  href: _ctx.route("contact-messages.index"),
                  class: "text-[#8B6F47] dark:text-[#E3C598] font-black flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                }, {
                  default: withCtx(() => [
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
                        d: "M15 19l-7-7 7-7"
                      })
                    ])),
                    createTextVNode(" Volver a la lista ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-4xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25]"${_scopeId}><div class="p-10 md:p-16"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-[#E0D5C9] dark:border-[#2E2A25]"${_scopeId}><div${_scopeId}><span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>De:</span><h3 class="text-3xl font-black text-[#3A3026] dark:text-[#F5F0E6] mt-1"${_scopeId}>${ssrInterpolate(__props.contactMessage.data.name)}</h3><p class="text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg"${_scopeId}>${ssrInterpolate(__props.contactMessage.data.email)}</p></div><div class="text-left md:text-right"${_scopeId}><span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>Recibido el:</span><p class="text-[#3A3026] dark:text-[#F5F0E6] font-bold mt-1"${_scopeId}>${ssrInterpolate(formatDate(__props.contactMessage.data.created_at))}</p></div></div><div class="space-y-6"${_scopeId}><span class="text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs"${_scopeId}>Mensaje:</span><div class="text-xl leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] bg-[#FFF8F0] dark:bg-white/5 p-8 rounded-[2rem] border border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.contactMessage.data.message)}</div></div><div class="mt-12 pt-12 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center"${_scopeId}><a${ssrRenderAttr("href", `mailto:${__props.contactMessage.data.email}?subject=RE: Contacto Biblia PDV`)} class="px-10 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center gap-3"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> Responder por Email </a><button class="px-8 py-4 bg-red-500/10 text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg> Eliminar Mensaje </button></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-4xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-[#111111] overflow-hidden shadow-xl rounded-[3rem] border border-[#E0D5C9] dark:border-[#2E2A25]" }, [
                    createVNode("div", { class: "p-10 md:p-16" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-[#E0D5C9] dark:border-[#2E2A25]" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "De:"),
                          createVNode("h3", { class: "text-3xl font-black text-[#3A3026] dark:text-[#F5F0E6] mt-1" }, toDisplayString(__props.contactMessage.data.name), 1),
                          createVNode("p", { class: "text-[#8B6F47] dark:text-[#9B8D82] font-bold text-lg" }, toDisplayString(__props.contactMessage.data.email), 1)
                        ]),
                        createVNode("div", { class: "text-left md:text-right" }, [
                          createVNode("span", { class: "text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "Recibido el:"),
                          createVNode("p", { class: "text-[#3A3026] dark:text-[#F5F0E6] font-bold mt-1" }, toDisplayString(formatDate(__props.contactMessage.data.created_at)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("span", { class: "text-[#8B6F47] dark:text-[#E3C598] font-black uppercase tracking-widest text-xs" }, "Mensaje:"),
                        createVNode("div", { class: "text-xl leading-relaxed text-[#3A3026] dark:text-[#F5F0E6] bg-[#FFF8F0] dark:bg-white/5 p-8 rounded-[2rem] border border-[#E0D5C9]/50 dark:border-[#2E2A25]/50 whitespace-pre-wrap" }, toDisplayString(__props.contactMessage.data.message), 1)
                      ]),
                      createVNode("div", { class: "mt-12 pt-12 border-t border-[#E0D5C9] dark:border-[#2E2A25] flex justify-between items-center" }, [
                        createVNode("a", {
                          href: `mailto:${__props.contactMessage.data.email}?subject=RE: Contacto Biblia PDV`,
                          class: "px-10 py-5 bg-[#8B6F47] dark:bg-[#E3C598] text-white dark:text-[#111111] font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "w-6 h-6",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            })
                          ])),
                          createTextVNode(" Responder por Email ")
                        ], 8, ["href"]),
                        createVNode("button", {
                          onClick: deleteMessage,
                          class: "px-8 py-4 bg-red-500/10 text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
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
                          ])),
                          createTextVNode(" Eliminar Mensaje ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ContactMessages/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
