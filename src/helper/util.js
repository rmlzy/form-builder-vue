import _ from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as Widgets from "../widgets/index";

const _genVueFile = (code) => {
  return `
<template>
  <div>
  ${code}
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {}
  },
  methods: {},
};
</script>`;
};

export const genUuid = () => uuidv4();

export const genWidgetUuid = (widgetName) => `${widgetName}__${genUuid()}`.replace("Fb", "");

export const genRules = (option) => {
  const rules = [];
  if (option.required) {
    rules.push({ required: true, message: "必填项" });
  }
  return rules;
};

export const getWidgets = () => {
  const widgets = {};
  const metas = Object.keys(Widgets).filter((name) => !name.endsWith("Meta") && !name.endsWith("Text"));
  metas.forEach((name) => {
    widgets[name] = Widgets[name];
  });
  return widgets;
};

export const getWidgetsMeta = () => {
  const metas = Object.keys(Widgets).filter((name) => name.endsWith("Meta"));
  return metas.map((name) => Widgets[name]);
};

export const getWidgetMeta = (widgetName) => Widgets[`${widgetName}Meta`];

export const getWidgetText = (config) => {
  const textFuc = `${config.widget}Text`;
  return Widgets[textFuc](config);
};

export const schema2code = (schema) => {
  const codes = [];
  schema.forEach((block) => {
    codes.push(getWidgetText(block));
  });
  return _genVueFile(codes.join("\n"));
};

export const safeStringify = (json) => {
  let str;
  try {
    str = JSON.stringify(json, null, "\t");
  } catch (e) {
    console.log(e);
  }
  return str;
};

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
 * Props 转属性
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
      texts.push(`:${key}="${JSON.stringify(value)}"`);
      continue;
    }
    if (_.isArray(value)) {
      texts.push(`:${key}="${JSON.stringify(value)}"`);
      continue;
    }
    if (_.isBoolean(value)) {
      texts.push(`:${key}="${value}"`);
      continue;
    }
    if (_.isString(value)) {
      texts.push(`${key}="${value}"`);
      continue;
    }
    if (_.isNumber(value)) {
      texts.push(`:${key}="${value}"`);
      continue;
    }
    console.log(`key: ${key}, value: ${value} will be ignore!`);
  }
  return texts.join(" ");
};

export const formatCode = (schema) => {
  const code = schema2code(schema);
  return axios({
    method: "POST",
    url: "/api/builder/format",
    data: { code, type: "vue" },
  }).then((res) => res.data);
};
