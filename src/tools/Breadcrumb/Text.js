import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["title", "type", "closeable", "close-text", "show-icon"]);
  return `<el-alert ${props2Text(props)} />`;
};
