import _ from "lodash";
import { props2Text, getWidgetText } from "../../helper/util";

export default (config) => {
  const formProps = _.pick(config, ["inline", "size", "label-position", "label-width", "label-suffix"]);
  formProps["label-width"] = formProps["label-width"] + "px";
  const childTexts = config.childes.map((child) => getWidgetText(child));
  return `
  <el-form ref="form" :model="formData" ${props2Text(formProps)}>
  ${childTexts.join("\n")}
  </el-form>`;
};
