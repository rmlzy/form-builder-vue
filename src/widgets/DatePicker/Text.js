import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const datePickerProps = _.pick(config, [
    "type",
    "editable",
    "clearable",
    "size",
    "placeholder",
    "is-range",
    "clearable",
    "start-placeholder",
    "end-placeholder",
    "align",
  ]);
  datePickerProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-date-picker ${props2Text(datePickerProps)} />
    ${extraText}
  </el-form-item>`;
};
