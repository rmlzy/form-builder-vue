import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["separator"]);
  const items = option.options.map((child) => `<el-breadcrumb-item>${child.text}</el-breadcrumb-item>`);
  return `
  <el-breadcrumb style="margin: 15px 0;" ${props2Text(props)}>
    ${items.join("\n")}
  </el-breadcrumb>`;
};
