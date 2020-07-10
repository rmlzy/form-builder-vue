import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "name", "required"]);
  const selectProps = _.pick(config, ["placeholder", "size", "clearable", "filterable"]);
  const items = config.configs.map((child) => {
    const configProps = {
      label: child.label,
      value: child.value,
    };
    return `<el-config ${props2Text(configProps)} />`;
  });
  selectProps["v-model"] = `formData.${config.name}`;
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-select ${props2Text(selectProps)}>
    ${items.join("\n")}
    </el-select>
  </el-form-item>`;
};
