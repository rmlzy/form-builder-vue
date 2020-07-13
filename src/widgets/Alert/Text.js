import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const props = _.pick(config, ["title", "type", "closeable", "close-text", "show-icon", "center", "description"]);
  return `<el-alert ${props2Text(props)} />`;
};
