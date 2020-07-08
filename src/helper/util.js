import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import * as Tools from "../tools/index";

export const genUuid = () => uuidv4();

export const getToolsComponent = () => {
  const components = {};
  const metas = Object.keys(Tools).filter((name) => !name.includes("Meta") && !name.includes("Text"));
  metas.forEach((name) => {
    components[name] = Tools[name];
  });
  return components;
};

export const getToolsMeta = () => {
  const metas = Object.keys(Tools).filter((name) => name.includes("Meta"));
  return metas.map((name) => Tools[name]);
};

export const schema2code = (schema) => {
  const codes = [];
  const getToolText = (option) => {
    const textFuc = `${option.component}Text`;
    return Tools[textFuc](option);
  };
  schema.forEach((block) => {
    codes.push(getToolText(block));
  });
  return codes.join("\n");
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

export const findAndEdit = (schema, uuid, newData) => {
  schema = _.cloneDeep(schema);
  schema = schema.map((block) => {
    if (block.uuid === uuid) {
      block = newData;
    } else {
      if (block.childes) {
        block.childes = (block.childes || []).map((col) => {
          if (col.uuid === uuid) {
            col = newData;
          } else {
            if (col.childes) {
              col.childes = (col.childes || []).map((cmpt) => {
                if (cmpt.uuid === uuid) {
                  cmpt = newData;
                }
                return cmpt;
              });
            }
          }
          return col;
        });
      }
    }
    return block;
  });
  return schema;
};

export const findAndRemove = (schema, uuid) => {
  schema = _.cloneDeep(schema);
  schema = schema.filter((block) => block.uuid !== uuid);
  schema = schema.map((block) => {
    if (_.isArray(block.childes)) {
      block.childes = block.childes.filter((col) => col.uuid !== uuid);
      block.childes = block.childes.map((col) => {
        if (_.isArray(col.childes)) {
          col.childes = col.childes.filter((cmpt) => cmpt.uuid !== uuid);
        }
        return col;
      });
    }
    return block;
  });
  return schema;
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
    console.log(`key: ${key}, value: ${value} will be ignore!`);
  }
  return texts.join(" ");
};
