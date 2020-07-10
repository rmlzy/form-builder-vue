import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const textareaProps = _.pick(config, ["type", "maxlength", "minlength", "show-word-limit", "placeholder", "rows"]);
  textareaProps.type = "textarea";
  textareaProps["v-model"] = `formData.${config.name}`;
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(textareaProps)} />
  </el-form-item>`;
};
