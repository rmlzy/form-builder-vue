import _ from "lodash";
import { getWidgetText, props2Text } from "../../helper/util";

export default (config) => {
  const colProps = _.pick(config, ["span"]);
  const childTexts = config.childes.map((child) => getWidgetText(child));
  return `<el-col ${props2Text(colProps)}>
  ${childTexts.join("\n")}
  </el-col>`;
};
