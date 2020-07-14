import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const props = _.pick(option, ["interval", "autoplay", "loop", "arrow", "direction", "indicator-position"]);
  const items = option.options.map((child) => {
    return `
    <el-carousel-item>
      <img style="width: 100%; height: 100%;" src="${child.link}" />
    </el-carousel-item>`;
  });
  return `
  <el-carousel style="margin: 15px 0;" ${props2Text(props)}>
    ${items.join("\n")}
  </el-carousel>`;
};
