import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const uploadProps = _.pick(config, ["list-type", "drag", "limit", "multiple"]);
  uploadProps.action = "https://jsonplaceholder.typicode.com/posts/";
  let uploadText;
  if (config["list-type"] === "text") {
    uploadText = `<el-button icon="el-icon-plus" size="small" type="primary">${config.text}</el-button>`;
  } else {
    uploadText = `
      <i class="el-icon-plus"></i>
      <div class="el-upload__text">${config.text}</div>`;
  }
  const tipText = config.tip ? `<div slot="tip" class="el-upload__tip">${config.tip}</div>` : "";
  return `<el-upload ${props2Text(uploadProps)}>
  ${uploadText}
  ${tipText}
  </el-upload>`;
};
