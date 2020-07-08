import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const formItemProps = _.pick(option, ["label", "name", "required"]);
  const textareaProps = _.pick(option, ["type", "maxlength", "minlength", "show-word-limit", "placeholder", "rows"]);
  textareaProps.type = "textarea";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(textareaProps)} />
  </el-form-item>`;
};
