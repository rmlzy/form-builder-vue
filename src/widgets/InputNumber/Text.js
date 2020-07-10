import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const formItemProps = _.pick(config, ["label", "name", "required"]);
  const inputNumberProps = _.pick(config, [
    "min",
    "max",
    "step",
    "step-strictly",
    "precision",
    "controls",
    "controls-position",
    "placeholder",
  ]);
  inputNumberProps["v-model"] = `formData.${config.name}`;
  const extraText = config.extra ? `<div>${config.extra}</div>` : "";
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-input ${props2Text(inputNumberProps)} />
    ${extraText}
  </el-form-item>`;
};
