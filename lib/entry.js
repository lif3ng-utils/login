import { Vue2 } from "vue-demi";
import { isVue2, isVue3 } from "vue-demi";
import MyLogin from "../src/components/MyLogin.vue";
export * from "../src/tcb/auth";

export default {
  install(Vue) {
    console.log({ isVue2, isVue3 });
    if (isVue3) {
      Vue.component("MyLogin", MyLogin);
    }
    if (Vue2) {
      Vue2.component("MyLogin", MyLogin);
    }
  },
};
