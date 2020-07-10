import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const timelineProps = _.pick(option, ["reverse"]);
  const items = option.options.map((child) => {
    const timelineItemProps = { timestamp: child.timestamp };
    return `<el-timeline-item ${props2Text(timelineItemProps)}>${child.content}</el-timeline-item>`;
  });
  return `
  <el-timeline ${props2Text(timelineProps)}>
    ${items.join("\n")}
  </el-timeline>`;
};
