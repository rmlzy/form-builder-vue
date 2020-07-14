import _ from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as Widgets from "../widgets/index";
import templates from "./templates";
import schema2code from "./schema2code";

/**
 * 获取页面参数
 * @param name
 * @param url
 * @returns {string|null}
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * 生成表格模拟数据
 * @param {array} columns 列配置
 * @param {number} max 数目
 * @returns {[]}
 */
export const genTableMockData = (columns, max) => {
  columns = columns || [];
  const res = [];
  for (let i = 0; i < max; i++) {
    const row = {};
    columns.forEach((col) => {
      row[col.prop] = `模拟数据${i}`;
    });
    res.push(row);
  }
  return res;
};

/**
 * 生成 uuid
 * @returns {string}
 */
export const genUuid = () => "R_" + uuidv4().replace(/-/g, "_");

/**
 * 为组件生成 uuid
 * @param {string} widgetName
 * @returns {string}
 */
export const genWidgetUuid = (widgetName) => `${widgetName}__${genUuid()}`.replace("Fb", "");

/**
 * 生成表单校验规则
 * @param {object} config 组件配置
 * @returns {[]}
 */
export const genRules = (config) => {
  const rules = [];
  if (config.required) {
    rules.push({ required: true, message: "必填项" });
  }
  return rules;
};

/**
 * 获取所有的组件
 * @returns {{}}
 */
export const getWidgets = () => {
  const widgets = {};
  const metas = Object.keys(Widgets).filter((name) => !name.endsWith("Meta") && !name.endsWith("Text"));
  metas.forEach((name) => {
    widgets[name] = Widgets[name];
  });
  return widgets;
};

/**
 * 获取所有组件的元数据
 * @returns {*[]}
 */
export const getWidgetsMeta = () => {
  const metas = Object.keys(Widgets).filter((name) => name.endsWith("Meta"));
  return metas.map((name) => Widgets[name]);
};

/**
 * 获取组件的文本格式, 用于生成代码
 * @param {object} config 组件配置
 * @returns {string}
 */
export const getWidgetText = (config) => {
  const textFuc = `${config.widget}Text`;
  return Widgets[textFuc](config);
};

/**
 * 初始化组件, 重新生成 uuid
 * @param widget
 * @returns {object}
 */
export const resetWidget = (widget) => {
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

export const initWidgets = () => {
  const widgets = getWidgetsMeta();
  return widgets.map((widget) => resetWidget(widget)).filter((widget) => widget.widget !== "FbCol");
};

export const initTemplates = () => {
  return templates;
};

/**
 * 格式化 json, 便于阅读
 * @param json
 * @returns {string}
 */
export const safeStringify = (json) => {
  let str;
  try {
    str = JSON.stringify(json, null, "\t");
  } catch (e) {
    console.log(e);
  }
  return str;
};

/**
 * 在 schema 中寻找某个 uuid 并修改
 * @param {array} schema
 * @param {string} uuid
 * @param {object} config
 * @returns {array} 新的schema
 */
export const findAndEdit = (schema, uuid, config) => {
  schema = _.cloneDeep(schema);
  const editChildesWithNewConfig = (childes, editedUuid, editedConfig) => {
    return childes.map((child) => {
      if (child.uuid === editedUuid) {
        child = editedConfig;
      } else {
        if (_.isArray(child.childes)) {
          child.childes = editChildesWithNewConfig(child.childes, editedUuid, editedConfig);
        }
      }
      return child;
    });
  };
  return editChildesWithNewConfig(schema, uuid, config);
};

/**
 * 在 schema 中寻找某个 uuid 并删除
 * @param {array} schema
 * @param {string} uuid
 * @returns {array} 新的schema
 */
export const findAndRemove = (schema, uuid) => {
  schema = _.cloneDeep(schema);
  const filterChildesWithoutUuid = (childes, removedUuid) => {
    let newChildes = childes.filter((child) => child.uuid !== removedUuid);
    newChildes = newChildes.map((child) => {
      if (_.isArray(child.childes)) {
        child.childes = filterChildesWithoutUuid(child.childes, removedUuid);
      }
      return child;
    });
    return newChildes;
  };
  return filterChildesWithoutUuid(schema, uuid);
};

/**
 * 为 schema 中所有的控件重新生成 uuid
 * @param schema
 * @returns {*}
 */
export const resetSchema = (schema) => {
  schema = _.cloneDeep(schema);
  const resetChildes = (childes) => {
    return childes.map((child) => {
      if (child.uuid) {
        child.uuid = genWidgetUuid(child.widgetName);
      } else {
        if (_.isArray(child.childes)) {
          child.childes = resetChildes(child.childes);
        }
      }
      return child;
    });
  };
  return resetChildes(schema);
};

/**
 * props 转属性
 * @param {object} props
 * @returns {string}
 */
export const props2Text = (props) => {
  let texts = [];
  for (let key in props) {
    const value = props[key];
    if (value === "" || value === undefined) {
      continue;
    }
    if (_.isObject(value)) {
      texts.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }
    if (_.isArray(value)) {
      texts.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }
    if (_.isBoolean(value)) {
      texts.push(`:${key}='${value}'`);
      continue;
    }
    if (_.isString(value)) {
      texts.push(`${key}='${value}'`);
      continue;
    }
    if (_.isNumber(value)) {
      texts.push(`:${key}='${value}'`);
      continue;
    }
    console.log(`key: ${key}, value: ${value} will be ignore!`);
  }
  return texts.join(" ");
};

/**
 * schema 转代码并格式化
 * @param {array} schema
 * @returns {Promise<AxiosResponse<any>>}
 */
export const formatCode = (schema, pageType) => {
  const code = schema2code(schema, pageType);
  return axios({
    method: "POST",
    url: "/api/builder/format",
    data: { code, type: "VUE" },
  }).then((res) => res.data);
};

/**
 * 保存代码
 * @param schema
 * @returns {Promise<AxiosResponse<any>>}
 */
export const save = async (schema) => {
  const code = schema2code(schema);
  const token = getParameterByName("token");
  if (!token) {
    return Promise.reject(new Error("未登录"));
  }
  return axios({
    method: "POST",
    url: "/api/builder/save",
    data: {
      type: "VUE",
      schema,
      code,
      token,
    },
  }).then((res) => res.data);
};
