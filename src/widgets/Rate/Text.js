import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const switchProps = _.pick(config, ["max", "allow-half", "show-score"]);
  switchProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-rate ${props2Text(switchProps)} />
    ${extraText}
  </el-form-item>`;
};
