import { props2Text } from "../../helper/util";

export default (config) => {
  const items = config.options.map((child) => {
    const buttonProps = {
      type: child.type,
      size: config.size,
    };
    return `<el-button ${props2Text(buttonProps)}>${child.text}</el-button>`;
  });
  return `
  <el-button-group>
    ${items.join("\n")}
  </el-button-group>`;
};
