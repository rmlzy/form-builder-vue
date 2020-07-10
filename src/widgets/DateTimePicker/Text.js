import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const dateTimePickerProps = _.pick(config, [
    "editable",
    "clearable",
    "size",
    "placeholder",
    "start-placeholder",
    "end-placeholder",
    "align",
  ]);
  dateTimePickerProps.type = "datetime";
  dateTimePickerProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-date-picker ${props2Text(dateTimePickerProps)} />
    ${extraText}
  </el-form-item>`;
};
