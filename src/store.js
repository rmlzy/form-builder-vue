import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import templates from "./helper/templates";
import {
  safeStringify,
  findAndEdit,
  findAndRemove,
  getWidgetsMeta,
  genUuid,
  genWidgetUuid,
  resetSchema,
} from "./helper/util";

const initWidget = (widget) => {
  widget = _.cloneDeep(widget);
  widget.uuid = genWidgetUuid(widget.widget);
  if (widget.name !== undefined) {
    widget.name = genUuid();
  }
  // 拖拽 Row 控件时, 初始化 Col
  if (widget.widget === "FbRow") {
    widget.childes = [
      { widget: "FbCol", span: 8, uuid: genWidgetUuid("FbCol"), childes: [] },
      { widget: "FbCol", span: 8, uuid: genWidgetUuid("FbCol"), childes: [] },
      { widget: "FbCol", span: 8, uuid: genWidgetUuid("FbCol"), childes: [] },
    ];
  }
  return widget;
};

const initWidgets = () => {
  const widgets = getWidgetsMeta();
  return widgets.map((widget) => initWidget(widget)).filter((widget) => widget.widget !== "FbCol");
};

const initTemplates = () => {
  return templates;
};

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: () => ({
    schema: [],
    widgets: initWidgets(),
    templates: initTemplates(),
    selectedUuid: "",
    editedUuid: "",
  }),
  getters: {
    widgets: (state) => state.widgets,
    schema: (state) => state.schema,
    schemaStr: (state) => safeStringify(state.schema),
    selectedUuid: (state) => state.selectedUuid,
    editedUuid: (state) => state.editedUuid,
    templates: (state) => state.templates,
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
    removeWidget(state, payload) {
      const { uuid } = payload;
      state.schema = findAndRemove(state.schema, uuid);
    },
    resetWidget(state, payload) {
      const { index } = payload;
      const newWidget = initWidget(state.widgets[index]);
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
