import _ from "lodash";
import { props2Text, getWidgetText } from "../../helper/util";

export default (config) => {
  const formProps = _.pick(config, ["header"]);
  const childTexts = config.childes.map((child) => getWidgetText(child));
  return `<el-card ${props2Text(formProps)}>
  ${childTexts.join("\n")}
  </el-form>`;
};
