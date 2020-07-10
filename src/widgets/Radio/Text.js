import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "name", "required"]);
  const radioGroupProps = _.pick(config, ["size", "border", "clearable"]);
  const items = config.options.map((child) => {
    const configProps = {
      value: child.value,
      border: config.border,
    };
    if (config.useButton) {
      return `<el-radio-button ${props2Text(configProps)}>${child.label}</el-radio-button>`;
    } else {
      return `<el-radio ${props2Text(configProps)}>${child.label}</el-radio>`;
    }
  });
  radioGroupProps["v-model"] = `formData.${config.name}`;
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-radio-group ${props2Text(radioGroupProps)}>
    ${items.join("\n")}
    </el-radio-group>
  </el-form-item>`;
};
