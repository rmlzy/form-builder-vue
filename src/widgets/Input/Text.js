import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const inputProps = _.pick(config, [
    "type",
    "maxlength",
    "minlength",
    "show-word-limit",
    "placeholder",
    "clearable",
    "show-password",
    "size",
  ]);
  inputProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(inputProps)} />
    ${extraText}
  </el-form-item>`;
};
