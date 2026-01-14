import { unref, withCtx, createVNode, createBlock, openBlock, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CdgzzzdO.js";
import { useForm, Head } from "@inertiajs/vue3";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "vue-chartjs";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    readingsData: Array
  },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const props = __props;
    const chartData = {
      labels: props.readingsData.map((item) => item.date),
      datasets: [
        {
          label: "Lecturas por día",
          backgroundColor: "#f87979",
          data: props.readingsData.map((item) => item.total_readings)
        }
      ]
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    const form = useForm({
      title: "",
      body: ""
    });
    const sendCustomNotification = () => {
      form.post(route("notifications.custom"), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          alert("Notificación enviada con éxito");
        },
        onError: (errors) => {
          console.error(errors);
          alert("Error al enviar la notificación");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-bold leading-tight text-primary"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-bold leading-tight text-primary" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}><h3 class="text-lg font-bold mb-4"${_scopeId}>Estadísticas de Lectura</h3><div class="h-96"${_scopeId}>`);
            if (__props.readingsData.length > 0) {
              _push2(ssrRenderComponent(unref(Bar), {
                data: chartData,
                options: chartOptions
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="text-center text-text-tertiary"${_scopeId}>No hay datos de lectura disponibles.</div>`);
            }
            _push2(`</div></div></div></div></div><div class="pb-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}><h3 class="text-lg font-bold mb-4"${_scopeId}>Enviar Notificación Personalizada</h3><form class="space-y-4"${_scopeId}><div${_scopeId}><label for="title" class="block text-sm font-bold text-text-secondary"${_scopeId}>Título</label><input${ssrRenderAttr("value", unref(form).title)} type="text" id="title" class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all" required${_scopeId}>`);
            if (unref(form).errors.title) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="body" class="block text-sm font-bold text-text-secondary"${_scopeId}>Mensaje</label><textarea id="body" rows="3" class="mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all" required${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea>`);
            if (unref(form).errors.body) {
              _push2(`<div class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.body)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center gap-4"${_scopeId}><button type="submit" class="inline-flex items-center px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Enviar Notificación </button>`);
            if (unref(form).recentlySuccessful) {
              _push2(`<span class="text-sm text-green-600 font-medium"${_scopeId}>Enviada.</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4" }, "Estadísticas de Lectura"),
                      createVNode("div", { class: "h-96" }, [
                        __props.readingsData.length > 0 ? (openBlock(), createBlock(unref(Bar), {
                          key: 0,
                          data: chartData,
                          options: chartOptions
                        })) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center text-text-tertiary"
                        }, "No hay datos de lectura disponibles."))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "pb-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-surface shadow-sm sm:rounded-2xl border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      createVNode("h3", { class: "text-lg font-bold mb-4" }, "Enviar Notificación Personalizada"),
                      createVNode("form", {
                        onSubmit: withModifiers(sendCustomNotification, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "title",
                            class: "block text-sm font-bold text-text-secondary"
                          }, "Título"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            id: "title",
                            class: "mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          unref(form).errors.title ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-500 text-sm mt-1"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "body",
                            class: "block text-sm font-bold text-text-secondary"
                          }, "Mensaje"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).body = $event,
                            id: "body",
                            rows: "3",
                            class: "mt-1 block w-full border-border bg-background text-text focus:border-primary focus:ring-primary rounded-xl shadow-sm transition-all",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).body]
                          ]),
                          unref(form).errors.body ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-500 text-sm mt-1"
                          }, toDisplayString(unref(form).errors.body), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "inline-flex items-center px-6 py-2 bg-primary text-white dark:text-background font-bold rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-50",
                            disabled: unref(form).processing
                          }, " Enviar Notificación ", 8, ["disabled"]),
                          unref(form).recentlySuccessful ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-sm text-green-600 font-medium"
                          }, "Enviada.")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
