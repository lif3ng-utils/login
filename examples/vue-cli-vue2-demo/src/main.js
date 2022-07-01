import Vue from "vue";
import App from "./App.vue";
import Login from "@lif3ng/login";
import VueCompositionAPI from "@vue/composition-api";

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(Login);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
