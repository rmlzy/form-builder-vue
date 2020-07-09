import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["separator"]);
  const items = option.childes.map((child) => `<el-breadcrumb-item>${child.text}</el-breadcrumb-item>`);
  return `
  <el-breadcrumb ${props2Text(props)}>
    ${items.join("\n")}
  </el-breadcrumb>`;
};
