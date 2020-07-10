import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const stepsProps = _.pick(config, ["direction", "active", "align-center", "simple"]);
  const items = config.options.map((child) => {
    const stepProps = {
      title: child.title,
      description: child.description,
    };
    return `<el-step ${props2Text(stepProps)} />`;
  });
  return `
  <el-steps ${props2Text(stepsProps)}>
    ${items.join("\n")}
  </el-steps>`;
};
