import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "name", "required"]);
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
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(inputProps)} />
  </el-form-item>`;
};
