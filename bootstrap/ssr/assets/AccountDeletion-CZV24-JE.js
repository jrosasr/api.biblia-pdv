import { withCtx, unref, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-DWct4yhk.js";
import { _ as _sfc_main$4 } from "./InputError-CAen27BF.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-CKMUgw9s.js";
import { P as PrimaryButton } from "./PrimaryButton-DBdTauee.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./AboutModal-BwJrT03Y.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./BibleFooter-D0APqaEY.js";
const _sfc_main = {
  __name: "AccountDeletion",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      email: "",
      password: ""
    });
    const submit = () => {
      form.post(route("account.delete.destroy"), {
        onFinish: () => form.reset("password"),
        onSuccess: () => {
          alert("Tu cuenta ha sido eliminada correctamente.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Eliminar Cuenta" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}><h1 class="text-xl font-bold mb-2"${_scopeId}>Eliminar Cuenta</h1><p${_scopeId}> Al eliminar tu cuenta, todos tus datos serán borrados permanentemente de nuestros servidores. Esta acción no se puede deshacer. Por favor, ingresa tus credenciales para confirmar. </p></div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: "Correo electrónico"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: "Contraseña"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ELIMINAR MI CUENTA PERMANENTEMENTE `);
                } else {
                  return [
                    createTextVNode(" ELIMINAR MI CUENTA PERMANENTEMENTE ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Eliminar Cuenta" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600 dark:text-gray-400" }, [
                createVNode("h1", { class: "text-xl font-bold mb-2" }, "Eliminar Cuenta"),
                createVNode("p", null, " Al eliminar tu cuenta, todos tus datos serán borrados permanentemente de nuestros servidores. Esta acción no se puede deshacer. Por favor, ingresa tus credenciales para confirmar. ")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: "Correo electrónico"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "password",
                    value: "Contraseña"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-6 flex items-center justify-end" }, [
                  createVNode(PrimaryButton, {
                    class: ["bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" ELIMINAR MI CUENTA PERMANENTEMENTE ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/AccountDeletion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
