import { ref, computed, watch, onMounted, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DttxNdiC.js";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "vue-chartjs";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
    const stats = ref([]);
    const period = ref("24h");
    const loading = ref(false);
    const periods = [
      { value: "24h", label: "Últimas 24 Horas" },
      { value: "7d", label: "Últimos 7 Días" },
      { value: "30d", label: "Últimos 30 Días" }
    ];
    const fetchStats = async () => {
      loading.value = true;
      try {
        const response = await axios.get(route("statistics.index"), {
          params: { period: period.value }
        });
        stats.value = response.data.data;
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        loading.value = false;
      }
    };
    const chartData = computed(() => {
      const groupedData = {};
      stats.value.forEach((stat) => {
        const dateKey = stat.date.split("T")[0];
        if (!groupedData[dateKey]) {
          groupedData[dateKey] = { impressions: 0, clicks: 0, scrolls: 0 };
        }
        groupedData[dateKey].impressions += stat.impressions || 0;
        groupedData[dateKey].clicks += stat.clicks || 0;
        groupedData[dateKey].scrolls += stat.scrolls || 0;
      });
      const sortedDates = Object.keys(groupedData).sort();
      const labels = sortedDates.map((date) => date.split("-").reverse().join("/"));
      const impressionsData = sortedDates.map((date) => groupedData[date].impressions);
      const clicksData = sortedDates.map((date) => groupedData[date].clicks);
      return {
        labels,
        datasets: [
          {
            label: "Impresiones",
            backgroundColor: "#3B82F6",
            borderColor: "#3B82F6",
            // Azul Tailwind
            data: impressionsData,
            tension: 0.4,
            // Curva suave
            fill: false
          },
          {
            label: "Clicks",
            backgroundColor: "#10B981",
            borderColor: "#10B981",
            // Verde Tailwind
            data: clicksData,
            tension: 0.4,
            fill: false
          }
        ]
      };
    });
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(156, 163, 175, 0.1)"
            // Gray-400 with opacity
          },
          ticks: { color: "#6B7280" }
        },
        x: {
          grid: { display: false },
          ticks: { color: "#6B7280" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#374151" }
          // Gray-700
        }
      }
    };
    watch(period, () => {
      fetchStats();
    });
    onMounted(() => {
      fetchStats();
    });
    function calculateCTR(clicks, impressions) {
      if (!impressions) return "0.00%";
      return (clicks / impressions * 100).toFixed(2) + "%";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Estadísticas" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-text"${_scopeId}>Estadísticas</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-text" }, "Estadísticas")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-surface shadow-sm sm:rounded-lg border border-border"${_scopeId}><div class="p-6 text-text"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>Métricas de Eventos</h3><div class="flex bg-surface-alt/50 p-1 rounded-xl"${_scopeId}><!--[-->`);
            ssrRenderList(periods, (p) => {
              _push2(`<button class="${ssrRenderClass([period.value === p.value ? "bg-[#8B6F47] text-white shadow-md" : "text-text-secondary hover:text-text hover:bg-surface-alt", "px-4 py-2 rounded-lg transition-all text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(p.label)}</button>`);
            });
            _push2(`<!--]--></div></div>`);
            if (loading.value) {
              _push2(`<div class="flex flex-col items-center justify-center py-12"${_scopeId}><svg class="animate-spin h-10 w-10 text-[#8B6F47]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg><p class="mt-4 text-text-secondary"${_scopeId}>Cargando datos...</p></div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (stats.value.length > 0) {
                _push2(`<div class="mb-8 p-4 bg-surface rounded-xl border border-border h-80"${_scopeId}><h4 class="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider"${_scopeId}>Tendencia de Actividad</h4><div class="h-64 w-full"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Line), {
                  data: chartData.value,
                  options: chartOptions
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (stats.value.length === 0) {
                _push2(`<div class="text-center py-16 bg-surface-alt/30 rounded-2xl border border-dashed border-border"${_scopeId}><div class="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg></div><h4 class="text-lg font-medium text-text"${_scopeId}>No hay datos registrados</h4><p class="text-text-secondary mt-1 max-w-sm mx-auto"${_scopeId}>No se han encontrado eventos para el período seleccionado. Las métricas aparecerán aquí una vez que haya actividad.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (stats.value.length > 0) {
                _push2(`<div class="overflow-x-auto rounded-xl border border-border"${_scopeId}><table class="w-full text-left text-sm"${_scopeId}><thead class="bg-surface-alt text-text-secondary font-semibold border-b border-border"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Fecha</th><th class="px-6 py-4"${_scopeId}>Evento</th><th class="px-6 py-4"${_scopeId}>Descripción</th><th class="px-6 py-4 text-center"${_scopeId}>Impresiones</th><th class="px-6 py-4 text-center"${_scopeId}>Clicks</th><th class="px-6 py-4 text-center"${_scopeId}>CTR</th></tr></thead><tbody class="divide-y divide-border bg-surface"${_scopeId}><!--[-->`);
                ssrRenderList(stats.value, (stat) => {
                  _push2(`<tr class="hover:bg-surface-alt/30 transition-colors"${_scopeId}><td class="px-6 py-4 text-text font-mono whitespace-nowrap"${_scopeId}>${ssrInterpolate(stat.date.split("T")[0].split("-").reverse().join("/"))}</td><td class="px-6 py-4"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-base font-medium text-text"${_scopeId}>${ssrInterpolate(stat.name)}</span><span class="text-xs text-text-secondary font-mono mt-1 opacity-70"${_scopeId}>${ssrInterpolate(stat.event)}</span></div></td><td class="px-6 py-4 text-text-secondary max-w-xs truncate"${ssrRenderAttr("title", stat.description)}${_scopeId}>${ssrInterpolate(stat.description || "Sin descripción")}</td><td class="px-6 py-4 text-center"${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"${_scopeId}>${ssrInterpolate(stat.impressions.toLocaleString())}</span></td><td class="px-6 py-4 text-center"${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"${_scopeId}>${ssrInterpolate(stat.clicks.toLocaleString())}</span></td><td class="px-6 py-4 text-center font-bold"${_scopeId}><span class="${ssrRenderClass(parseFloat(calculateCTR(stat.clicks, stat.impressions)) > 0 ? "text-[#8B6F47]" : "text-text-secondary opacity-50")}"${_scopeId}>${ssrInterpolate(calculateCTR(stat.clicks, stat.impressions))}</span></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-4 text-right"${_scopeId}><p class="text-xs text-text-secondary"${_scopeId}> * CTR (Click Through Rate) = (Clicks / Impresiones) x 100 </p></div></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-surface shadow-sm sm:rounded-lg border border-border" }, [
                    createVNode("div", { class: "p-6 text-text" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center mb-8 gap-4" }, [
                        createVNode("h3", { class: "text-lg font-medium" }, "Métricas de Eventos"),
                        createVNode("div", { class: "flex bg-surface-alt/50 p-1 rounded-xl" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(periods, (p) => {
                            return createVNode("button", {
                              key: p.value,
                              onClick: ($event) => period.value = p.value,
                              class: ["px-4 py-2 rounded-lg transition-all text-sm font-medium", period.value === p.value ? "bg-[#8B6F47] text-white shadow-md" : "text-text-secondary hover:text-text hover:bg-surface-alt"]
                            }, toDisplayString(p.label), 11, ["onClick"]);
                          }), 64))
                        ])
                      ]),
                      loading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center justify-center py-12"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "animate-spin h-10 w-10 text-[#8B6F47]",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])),
                        createVNode("p", { class: "mt-4 text-text-secondary" }, "Cargando datos...")
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        stats.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-8 p-4 bg-surface rounded-xl border border-border h-80"
                        }, [
                          createVNode("h4", { class: "text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider" }, "Tendencia de Actividad"),
                          createVNode("div", { class: "h-64 w-full" }, [
                            createVNode(unref(Line), {
                              data: chartData.value,
                              options: chartOptions
                            }, null, 8, ["data"])
                          ])
                        ])) : createCommentVNode("", true),
                        stats.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center py-16 bg-surface-alt/30 rounded-2xl border border-dashed border-border"
                        }, [
                          createVNode("div", { class: "w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-8 w-8 text-text-secondary",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              })
                            ]))
                          ]),
                          createVNode("h4", { class: "text-lg font-medium text-text" }, "No hay datos registrados"),
                          createVNode("p", { class: "text-text-secondary mt-1 max-w-sm mx-auto" }, "No se han encontrado eventos para el período seleccionado. Las métricas aparecerán aquí una vez que haya actividad.")
                        ])) : createCommentVNode("", true),
                        stats.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "overflow-x-auto rounded-xl border border-border"
                        }, [
                          createVNode("table", { class: "w-full text-left text-sm" }, [
                            createVNode("thead", { class: "bg-surface-alt text-text-secondary font-semibold border-b border-border" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-6 py-4" }, "Fecha"),
                                createVNode("th", { class: "px-6 py-4" }, "Evento"),
                                createVNode("th", { class: "px-6 py-4" }, "Descripción"),
                                createVNode("th", { class: "px-6 py-4 text-center" }, "Impresiones"),
                                createVNode("th", { class: "px-6 py-4 text-center" }, "Clicks"),
                                createVNode("th", { class: "px-6 py-4 text-center" }, "CTR")
                              ])
                            ]),
                            createVNode("tbody", { class: "divide-y divide-border bg-surface" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(stats.value, (stat) => {
                                return openBlock(), createBlock("tr", {
                                  key: stat.id,
                                  class: "hover:bg-surface-alt/30 transition-colors"
                                }, [
                                  createVNode("td", { class: "px-6 py-4 text-text font-mono whitespace-nowrap" }, toDisplayString(stat.date.split("T")[0].split("-").reverse().join("/")), 1),
                                  createVNode("td", { class: "px-6 py-4" }, [
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode("span", { class: "text-base font-medium text-text" }, toDisplayString(stat.name), 1),
                                      createVNode("span", { class: "text-xs text-text-secondary font-mono mt-1 opacity-70" }, toDisplayString(stat.event), 1)
                                    ])
                                  ]),
                                  createVNode("td", {
                                    class: "px-6 py-4 text-text-secondary max-w-xs truncate",
                                    title: stat.description
                                  }, toDisplayString(stat.description || "Sin descripción"), 9, ["title"]),
                                  createVNode("td", { class: "px-6 py-4 text-center" }, [
                                    createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" }, toDisplayString(stat.impressions.toLocaleString()), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 text-center" }, [
                                    createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" }, toDisplayString(stat.clicks.toLocaleString()), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 text-center font-bold" }, [
                                    createVNode("span", {
                                      class: parseFloat(calculateCTR(stat.clicks, stat.impressions)) > 0 ? "text-[#8B6F47]" : "text-text-secondary opacity-50"
                                    }, toDisplayString(calculateCTR(stat.clicks, stat.impressions)), 3)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-4 text-right" }, [
                          createVNode("p", { class: "text-xs text-text-secondary" }, " * CTR (Click Through Rate) = (Clicks / Impresiones) x 100 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Statistics/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
