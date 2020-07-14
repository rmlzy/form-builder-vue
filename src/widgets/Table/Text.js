import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const tableProps = _.pick(config, ["border", "stripe", "size", "show-header", "show-summary"]);
  tableProps.data = config.mockData;
  const selectionText = config.showSelection ? `<el-table-column type="selection" />` : "";
  const columnTexts = config.columns.map((col) => {
    const colProps = _.pick(col, ["col", "label", "fixed", "sortable", "prop"]);
    return `<el-table-column ${props2Text(colProps)} />`;
  });
  let paginationText;
  if (config.pagination) {
    const paginationProps = _.pick(config.paginationConfig, [
      "page-size",
      "small",
      "background",
      "hide-on-single-page",
    ]);
    paginationText = `
  <div style="text-align: right; margin: 15px 0;">
    <el-pagination 
      ${props2Text(paginationProps)}
      :total="total" 
      :current-page="page"
      :page-sizes="[10, 20, 30, 50, 100]"
      @size-change="onSizeChange" 
      @current-change="onPageChange"
    />
  </div>`;
  }
  return `
  <el-table style="margin: 15px 0;" :loading="loading" ${props2Text(tableProps)}>
    ${selectionText}
    ${columnTexts.join("\n")}
  </el-table>
  ${paginationText}`;
};
