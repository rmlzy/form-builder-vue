import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const colorPickerProps = _.pick(config, ["show-alpha", "color-format"]);
  colorPickerProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-color-picker ${props2Text(colorPickerProps)} />
    ${extraText}
  </el-form-item>`;
};
