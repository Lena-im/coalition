import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/echarts";
import Vuelidate from "vuelidate";
import VueSimpleAlert from "vue-simple-alert";

export const EventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

Vue.config.devtools = true;
