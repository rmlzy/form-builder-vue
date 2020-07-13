import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const props = _.pick(config, ["type", "target", "href", "underline"]);
  return `<el-link ${props2Text(props)}>${config.text}</el-link>`;
};
