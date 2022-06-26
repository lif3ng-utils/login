import { isVue2, isVue3 } from "vue-demi";
import MyLogin from "../src/components/MyLogin.vue";
export default {
  install(Vue) {
    if (isVue3) {
      Vue.component("MyLogin", MyLogin);
    }
  },
};
