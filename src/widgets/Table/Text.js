import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (config) => {
  const tableProps = _.pick(config, ["border", "stripe", "size", "show-header", "show-summary"]);
  const selectionText = config.showSelection ? `<el-table-column type="selection" />` : "";
  const columnTexts = config.columns.map((col) => {
    const colProps = _.pick(col, ["col", "label", "fixed", "sortable"]);
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
  <div style="text-align: right;">
    <br />
    <el-pagination 
      ${props2Text(paginationProps)} 
      :total="total" 
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50, 100]"
      @size-change="onSizeChange" 
      @current-change="onCurrentChange"
    />
  </div>`;
  }
  return `
  <el-table :data="tableData" ${props2Text(tableProps)}>
    ${selectionText}
    ${columnTexts.join("\n")}
    ${paginationText}
  </el-table>`;
};
