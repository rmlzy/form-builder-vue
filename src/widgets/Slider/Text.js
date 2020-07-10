import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "required"]);
  formItemProps.prop = config.name;
  const sliderProps = _.pick(config, ["min", "max", "step", "show-stops", "show-tooltip", "range", "vertical"]);
  sliderProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-slider ${props2Text(sliderProps)} />
    ${extraText}
  </el-form-item>`;
};
