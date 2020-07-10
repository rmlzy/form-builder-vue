import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const tabsProps = _.pick(config, ["type", "closable", "addable", "editable", "tab-position", "stretch"]);
  const items = config.options.map((child) => {
    const tabPaneProps = { label: child.label, name: child.label };
    return `<el-tab-pane ${props2Text(tabPaneProps)} />`;
  });
  return `
  <el-tabs ${props2Text(tabsProps)}>
    ${items.join("\n")}
  </el-tabs>`;
};
