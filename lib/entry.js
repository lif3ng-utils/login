import { isVue2, isVue3, install } from "vue-demi";
import MyLogin from "../src/components/MyLogin.vue";
export * from "../src/tcb/auth";

// install();
console.log({ isVue2, isVue3 });

export default {
  install(Vue) {
    // if (isVue3) {
    Vue.component("MyLogin", MyLogin);
    // }
  },
};

// export { default as MyLogin } from "../src/components/MyLogin.vue";
