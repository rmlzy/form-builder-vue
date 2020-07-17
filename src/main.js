import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "prismjs";
import "prismjs/themes/prism.css";
import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css";
import App from "./App";
import store from "./store";
import routes from "./routers";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.component("prism-editor", VuePrismEditor);

const router = new VueRouter({ routes });

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount("#app");
