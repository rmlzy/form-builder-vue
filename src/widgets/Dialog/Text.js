import _ from "lodash";
import { props2Text, getWidgetText } from "../../helper/util";

export default (config) => {
  const dialogProps = _.pick(config, ["title", "width", "modal", "append-to-body", "center", "destroy-on-close"]);
  const childTexts = config.childes.map((child) => getWidgetText(child));
  const cancelBtn = config.showCancelButton ? `<el-button>${config.cancelButtonText}</el-button>` : "";
  const confirmBtn = config.showConfirmButton
    ? `<el-button type="primary">${config.confirmButtonText}</el-button>`
    : "";
  const buttonTexts = `
  <span slot="footer" class="dialog-footer">
    ${cancelBtn}
    ${confirmBtn}
  </span>`;
  return `
  <el-dialog ${props2Text(dialogProps)}>
  ${childTexts.join("\n")}
  ${buttonTexts}
  </el-dialog>`;
};
