import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["direction", "content-position"]);
  return `<el-divider ${props2Text(props)} />`;
};
