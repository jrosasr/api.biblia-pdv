import { unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-DttxNdiC.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./TextInput-CKMUgw9s.js";
import { _ as _sfc_main$3 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$5 } from "./TextArea-DkIJefRA.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    story: Object,
    series: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      series_id: props.story.series_id,
      title: props.story.title,
      description: props.story.description || "",
      difficulty_level: props.story.difficulty_level || 1,
      cover_image: null,
      book: props.story.book,
      chapter_start: props.story.chapter_start,
      verse_start: props.story.verse_start,
      chapter_end: props.story.chapter_end || "",
      verse_end: props.story.verse_end || "",
      _method: "patch"
    });
    const bibleBooks = [
      "Génesis",
      "Éxodo",
      "Levítico",
      "Números",
      "Deuteronomio",
      "Josué",
      "Jueces",
      "Rut",
      "1 Samuel",
      "2 Samuel",
      "1 Reyes",
      "2 Reyes",
      "1 Crónicas",
      "2 Crónicas",
      "Esdras",
      "Nehemías",
      "Ester",
      "Job",
      "Salmos",
      "Proverbios",
      "Eclesiastés",
      "Cantares",
      "Isaías",
      "Jeremías",
      "Lamentaciones",
      "Ezequiel",
      "Daniel",
      "Oseas",
      "Joel",
      "Amós",
      "Abdías",
      "Jonás",
      "Miqueas",
      "Nahúm",
      "Habacuc",
      "Sofonías",
      "Hageo",
      "Zacarías",
      "Malaquías",
      "Mateo",
      "Marcos",
      "Lucas",
      "Juan",
      "Hechos",
      "Romanos",
      "1 Corintios",
      "2 Corintios",
      "Gálatas",
      "Efesios",
      "Filipenses",
      "Colosenses",
      "1 Tesalonicenses",
      "2 Tesalonicenses",
      "1 Timoteo",
      "2 Timoteo",
      "Tito",
      "Filemón",
      "Hebreos",
      "Santiago",
      "1 Pedro",
      "2 Pedro",
      "1 Juan",
      "2 Juan",
      "3 Juan",
      "Judas",
      "Apocalipsis"
    ];
    const submit = () => {
      form.post(route("bible-stories.update", props.story.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Editar Historia Bíblica" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}> Editar Historia: ${ssrInterpolate(__props.story.title)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight" }, " Editar Historia: " + toDisplayString(__props.story.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-5xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700"${_scopeId}><div class="p-8"${_scopeId}><form class="space-y-8"${_scopeId}><section${_scopeId}><div class="mb-6 pb-2 border-b border-gray-100 dark:border-gray-700"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100"${_scopeId}>Información General</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"${_scopeId}><div class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "series_id",
              value: "Serie / Categoría",
              class: "font-medium"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2"${_scopeId}><select id="series_id" class="block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-3" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).series_id) ? ssrLooseContain(unref(form).series_id, "") : ssrLooseEqual(unref(form).series_id, "")) ? " selected" : ""}${_scopeId}>Seleccionar Serie</option><!--[-->`);
            ssrRenderList(__props.series, (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).series_id) ? ssrLooseContain(unref(form).series_id, item.id) : ssrLooseEqual(unref(form).series_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.title)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.series_id
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Título de la Historia",
              class: "font-medium"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "title",
              type: "text",
              class: "mt-2 block w-full text-base py-3 rounded-lg",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "description",
              value: "Descripción",
              class: "font-medium"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "description",
              class: "mt-2 block w-full text-base rounded-lg",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              rows: "4"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "difficulty_level",
              value: "Nivel de Dificultad",
              class: "font-medium"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2"${_scopeId}><select id="difficulty_level" class="block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-3" required${_scopeId}><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "1") : ssrLooseEqual(unref(form).difficulty_level, "1")) ? " selected" : ""}${_scopeId}>Historias cortas</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "2") : ssrLooseEqual(unref(form).difficulty_level, "2")) ? " selected" : ""}${_scopeId}>Historias largas</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(form).difficulty_level) ? ssrLooseContain(unref(form).difficulty_level, "3") : ssrLooseEqual(unref(form).difficulty_level, "3")) ? " selected" : ""}${_scopeId}>Historias más difíciles</option></select></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.difficulty_level
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "cover_image",
              value: "Imagen de Portada",
              class: "font-medium"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-4"${_scopeId}>`);
            if (__props.story.cover_image && !unref(form).cover_image) {
              _push2(`<div class="w-full h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm"${_scopeId}><img${ssrRenderAttr("src", __props.story.cover_image)} class="w-full h-full object-cover" alt="Portada actual"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative group items-center"${_scopeId}><div class="space-y-1 text-center w-full"${_scopeId}>`);
            if (unref(form).cover_image) {
              _push2(`<div class="mb-4"${_scopeId}><p class="text-sm text-green-600 font-semibold truncate"${_scopeId}>${ssrInterpolate(unref(form).cover_image.name)}</p></div>`);
            } else {
              _push2(`<svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"${_scopeId}><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`);
            }
            _push2(`<label for="cover_image" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(form).cover_image ? "Cambiar archivo" : "Subir nueva imagen")}</span><input id="cover_image" type="file" class="sr-only" accept="image/*"${_scopeId}></label></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.cover_image
            }, null, _parent2, _scopeId));
            _push2(`</div></div></section><section class="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl"${_scopeId}><div class="mb-6 pb-2 border-b border-gray-200 dark:border-gray-600"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100"${_scopeId}>Referencia Bíblica</h3></div><div class="grid grid-cols-1 lg:grid-cols-4 gap-6"${_scopeId}><div class="lg:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "book",
              value: "Libro"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-2"${_scopeId}><select id="book" class="block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-2.5" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).book) ? ssrLooseContain(unref(form).book, "") : ssrLooseEqual(unref(form).book, "")) ? " selected" : ""}${_scopeId}>Seleccionar Libro</option><!--[-->`);
            ssrRenderList(bibleBooks, (book) => {
              _push2(`<option${ssrRenderAttr("value", book)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).book) ? ssrLooseContain(unref(form).book, book) : ssrLooseEqual(unref(form).book, book)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(book)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.book
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "chapter_start",
              value: "Cap. Inicio",
              class: "truncate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "chapter_start",
              type: "number",
              class: "mt-2 block w-full text-center",
              modelValue: unref(form).chapter_start,
              "onUpdate:modelValue": ($event) => unref(form).chapter_start = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.chapter_start
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "verse_start",
              value: "Vers. Inicio",
              class: "truncate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "verse_start",
              type: "number",
              class: "mt-2 block w-full text-center",
              modelValue: unref(form).verse_start,
              "onUpdate:modelValue": ($event) => unref(form).verse_start = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-2",
              message: unref(form).errors.verse_start
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "chapter_end",
              value: "Cap. Fin",
              class: "truncate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "chapter_end",
              type: "number",
              class: "mt-2 block w-full text-center",
              modelValue: unref(form).chapter_end,
              "onUpdate:modelValue": ($event) => unref(form).chapter_end = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "verse_end",
              value: "Vers. Fin",
              class: "truncate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "verse_end",
              type: "number",
              class: "mt-2 block w-full text-center",
              modelValue: unref(form).verse_end,
              "onUpdate:modelValue": ($event) => unref(form).verse_end = $event
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></section><div class="flex items-center justify-end gap-5 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("bible-stories.index"),
              class: "text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
              class: "px-8 py-3 text-base shadow-lg hover:shadow-indigo-500/30 transition-shadow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Actualizar Historia `);
                } else {
                  return [
                    createTextVNode(" Actualizar Historia ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-5xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700" }, [
                    createVNode("div", { class: "p-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("section", null, [
                          createVNode("div", { class: "mb-6 pb-2 border-b border-gray-100 dark:border-gray-700" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-gray-100" }, "Información General")
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8" }, [
                            createVNode("div", { class: "space-y-6" }, [
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "series_id",
                                  value: "Serie / Categoría",
                                  class: "font-medium"
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  withDirectives(createVNode("select", {
                                    id: "series_id",
                                    "onUpdate:modelValue": ($event) => unref(form).series_id = $event,
                                    class: "block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-3",
                                    required: ""
                                  }, [
                                    createVNode("option", {
                                      value: "",
                                      disabled: ""
                                    }, "Seleccionar Serie"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.series, (item) => {
                                      return openBlock(), createBlock("option", {
                                        key: item.id,
                                        value: item.id
                                      }, toDisplayString(item.title), 9, ["value"]);
                                    }), 128))
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, unref(form).series_id]
                                  ])
                                ]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.series_id
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "title",
                                  value: "Título de la Historia",
                                  class: "font-medium"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "title",
                                  type: "text",
                                  class: "mt-2 block w-full text-base py-3 rounded-lg",
                                  modelValue: unref(form).title,
                                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.title
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "description",
                                  value: "Descripción",
                                  class: "font-medium"
                                }),
                                createVNode(_sfc_main$5, {
                                  id: "description",
                                  class: "mt-2 block w-full text-base rounded-lg",
                                  modelValue: unref(form).description,
                                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                  rows: "4"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.description
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "difficulty_level",
                                  value: "Nivel de Dificultad",
                                  class: "font-medium"
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  withDirectives(createVNode("select", {
                                    id: "difficulty_level",
                                    "onUpdate:modelValue": ($event) => unref(form).difficulty_level = $event,
                                    class: "block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-3",
                                    required: ""
                                  }, [
                                    createVNode("option", { value: "1" }, "Historias cortas"),
                                    createVNode("option", { value: "2" }, "Historias largas"),
                                    createVNode("option", { value: "3" }, "Historias más difíciles")
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, unref(form).difficulty_level]
                                  ])
                                ]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.difficulty_level
                                }, null, 8, ["message"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode(_sfc_main$2, {
                                for: "cover_image",
                                value: "Imagen de Portada",
                                class: "font-medium"
                              }),
                              createVNode("div", { class: "flex flex-col gap-4" }, [
                                __props.story.cover_image && !unref(form).cover_image ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "w-full h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                                }, [
                                  createVNode("img", {
                                    src: __props.story.cover_image,
                                    class: "w-full h-full object-cover",
                                    alt: "Portada actual"
                                  }, null, 8, ["src"])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative group items-center" }, [
                                  createVNode("div", { class: "space-y-1 text-center w-full" }, [
                                    unref(form).cover_image ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mb-4"
                                    }, [
                                      createVNode("p", { class: "text-sm text-green-600 font-semibold truncate" }, toDisplayString(unref(form).cover_image.name), 1)
                                    ])) : (openBlock(), createBlock("svg", {
                                      key: 1,
                                      class: "mx-auto h-12 w-12 text-gray-400",
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
                                    ])),
                                    createVNode("label", {
                                      for: "cover_image",
                                      class: "relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                    }, [
                                      createVNode("span", null, toDisplayString(unref(form).cover_image ? "Cambiar archivo" : "Subir nueva imagen"), 1),
                                      createVNode("input", {
                                        id: "cover_image",
                                        type: "file",
                                        class: "sr-only",
                                        onInput: ($event) => unref(form).cover_image = $event.target.files[0],
                                        accept: "image/*"
                                      }, null, 40, ["onInput"])
                                    ])
                                  ])
                                ])
                              ]),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.cover_image
                              }, null, 8, ["message"])
                            ])
                          ])
                        ]),
                        createVNode("section", { class: "bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl" }, [
                          createVNode("div", { class: "mb-6 pb-2 border-b border-gray-200 dark:border-gray-600" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-gray-100" }, "Referencia Bíblica")
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-6" }, [
                            createVNode("div", { class: "lg:col-span-1" }, [
                              createVNode(_sfc_main$2, {
                                for: "book",
                                value: "Libro"
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                withDirectives(createVNode("select", {
                                  id: "book",
                                  "onUpdate:modelValue": ($event) => unref(form).book = $event,
                                  class: "block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 py-2.5",
                                  required: ""
                                }, [
                                  createVNode("option", {
                                    value: "",
                                    disabled: ""
                                  }, "Seleccionar Libro"),
                                  (openBlock(), createBlock(Fragment, null, renderList(bibleBooks, (book) => {
                                    return createVNode("option", {
                                      key: book,
                                      value: book
                                    }, toDisplayString(book), 9, ["value"]);
                                  }), 64))
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).book]
                                ])
                              ]),
                              createVNode(_sfc_main$3, {
                                class: "mt-2",
                                message: unref(form).errors.book
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "chapter_start",
                                  value: "Cap. Inicio",
                                  class: "truncate"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "chapter_start",
                                  type: "number",
                                  class: "mt-2 block w-full text-center",
                                  modelValue: unref(form).chapter_start,
                                  "onUpdate:modelValue": ($event) => unref(form).chapter_start = $event,
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.chapter_start
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "verse_start",
                                  value: "Vers. Inicio",
                                  class: "truncate"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "verse_start",
                                  type: "number",
                                  class: "mt-2 block w-full text-center",
                                  modelValue: unref(form).verse_start,
                                  "onUpdate:modelValue": ($event) => unref(form).verse_start = $event,
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$3, {
                                  class: "mt-2",
                                  message: unref(form).errors.verse_start
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "chapter_end",
                                  value: "Cap. Fin",
                                  class: "truncate"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "chapter_end",
                                  type: "number",
                                  class: "mt-2 block w-full text-center",
                                  modelValue: unref(form).chapter_end,
                                  "onUpdate:modelValue": ($event) => unref(form).chapter_end = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_sfc_main$2, {
                                  for: "verse_end",
                                  value: "Vers. Fin",
                                  class: "truncate"
                                }),
                                createVNode(_sfc_main$4, {
                                  id: "verse_end",
                                  type: "number",
                                  class: "mt-2 block w-full text-center",
                                  modelValue: unref(form).verse_end,
                                  "onUpdate:modelValue": ($event) => unref(form).verse_end = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end gap-5 pt-4" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("bible-stories.index"),
                            class: "text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancelar ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(PrimaryButton, {
                            disabled: unref(form).processing,
                            class: "px-8 py-3 text-base shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Actualizar Historia ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BibleStories/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
