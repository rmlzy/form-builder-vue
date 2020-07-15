import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import store from "./store";
import routes from "./routers";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({ routes });

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount("#app");
