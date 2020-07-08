import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["title", "content"]);
  return `<el-page-header ${props2Text(props)} />`;
};
