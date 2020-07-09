import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const formItemProps = _.pick(option, ["label", "name", "required"]);
  const inputProps = _.pick(option, [
    "type",
    "maxlength",
    "minlength",
    "show-word-limit",
    "placeholder",
    "clearable",
    "show-password",
    "size",
  ]);
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(inputProps)} />
  </el-form-item>`;
};
