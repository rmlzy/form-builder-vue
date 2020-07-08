import Vue from "vue";
import Vuex from "vuex";
import { safeStringify, findAndEdit, findAndRemove } from "./helper/util";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: () => ({
    schema: [
      {
        component: "fb-title",
        componentName: "标题1",
        text: "这是一个标题1",
        uuid: "1",
      },
      {
        component: "fb-title",
        componentName: "标题2",
        text: "这是一个标题2",
        uuid: "2",
      },
    ],
    tools: [
      {
        component: "P",
        componentName: "段落",
        text: "这是一个段落",
      },
    ],
    activeUuid: "",
  }),
  getters: {
    tools: (state) => state.tools,
    schema: (state) => state.schema,
    schemaStr: (state) => safeStringify(state.schema),
    activeUuid: (state) => state.activeUuid,
  },
  mutations: {
    setActiveUuid(state, payload) {
      const { uuid } = payload;
      state.activeUuid = uuid;
    },
    setBlockByUuid(state, payload) {
      const { uuid, block } = payload;
      state.schema = findAndEdit(state.schema, uuid, block);
    },
    removeBlockByUuid(state, payload) {
      const { uuid } = payload;
      state.schema = findAndRemove(state.schema, uuid);
    },
  },
  actions: {},
});
