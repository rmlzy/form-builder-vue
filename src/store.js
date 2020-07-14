import Vue from "vue";
import Vuex from "vuex";
import {
  safeStringify,
  initWidgets,
  initTemplates,
  findAndEdit,
  findAndRemove,
  resetSchema,
  resetWidget,
} from "./helper/util";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: () => ({
    schema: [],
    widgets: initWidgets(),
    templates: initTemplates(),
    selectedUuid: "",
    editedUuid: "",
    previewMode: false,
    pageType: "list-page",
  }),
  getters: {
    widgets: (state) => state.widgets,
    schema: (state) => state.schema,
    schemaStr: (state) => safeStringify(state.schema),
    selectedUuid: (state) => state.selectedUuid,
    editedUuid: (state) => state.editedUuid,
    templates: (state) => state.templates,
    previewMode: (state) => state.previewMode,
    pageType: (state) => state.pageType,
  },
  mutations: {
    setSchema(state, payload) {
      const { schema } = payload;
      state.schema = schema;
    },
    setSelectedUuid(state, payload) {
      const { uuid } = payload;
      state.selectedUuid = uuid;
    },
    setEditedUuid(state, payload) {
      const { uuid } = payload;
      state.editedUuid = uuid;
    },
    setWidget(state, payload) {
      const { uuid, config } = payload;
      state.schema = findAndEdit(state.schema, uuid, config);
    },
    setPreviewMode(state, payload) {
      const { previewMode } = payload;
      state.previewMode = previewMode;
    },
    setPageType(state, payload) {
      const { pageType } = payload;
      state.pageType = pageType;
    },
    removeWidget(state, payload) {
      const { uuid } = payload;
      state.schema = findAndRemove(state.schema, uuid);
    },
    resetWidget(state, payload) {
      const { index } = payload;
      const newWidget = resetWidget(state.widgets[index]);
      Vue.set(state.widgets, index, newWidget);
    },
    addTemplate(state, payload) {
      const { schema } = payload;
      const newSchema = resetSchema(schema);
      state.schema = [...state.schema, ...newSchema];
    },
  },
  actions: {},
});
