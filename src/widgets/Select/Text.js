import _ from "lodash";
import { props2Text } from "../../helper/util";

export default (option) => {
  const formItemProps = _.pick(option, ["label", "name", "required"]);
  const selectProps = _.pick(option, ["placeholder", "size", "clearable", "filterable"]);
  const items = option.options.map((child) => {
    const optionProps = {
      label: child.label,
      value: child.value,
    };
    return `<el-option ${props2Text(optionProps)} />`;
  });
  return `
  <el-form-item ${props2Text(formItemProps)}>
    <el-select ${props2Text(selectProps)}>
    ${items.join("\n")}
    </el-select>
  </el-form-item>`;
};
