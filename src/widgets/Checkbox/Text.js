import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const checkboxGroupProps = _.pick(config, ["size", "border", "clearable"]);
  const items = config.options.map((child) => {
    const configProps = {
      value: child.value,
      border: config.border,
    };
    if (config.useButton) {
      return `<el-checkbox-button ${props2Text(configProps)}>${child.label}</el-checkbox-button>`;
    } else {
      return `<el-checkbox ${props2Text(configProps)}>${child.label}</el-checkbox>`;
    }
  });
  checkboxGroupProps["v-model"] = `formData.${config.name}`;
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-checkbox-group ${props2Text(checkboxGroupProps)}>
    ${items.join("\n")}
    </el-checkbox-group>
  </el-form-item>`;
};
