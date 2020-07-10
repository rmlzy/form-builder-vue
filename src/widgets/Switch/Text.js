import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const switchProps = _.pick(config, ["width", "active-text", "inactive-text", "active-color", "inactive-color"]);
  switchProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-switch ${props2Text(switchProps)} />
    ${extraText}
  </el-form-item>`;
};
