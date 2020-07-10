import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const props = _.pick(config, ["type", "size", "plain", "round", "circle", "native-type"]);
  return `<el-button ${props2Text(props)}>${config.text}</el-button>`;
};
