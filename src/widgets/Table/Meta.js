export default {
  widget: "FbTable",
  widgetName: "表格",
  border: true,
  size: "",
  stripe: false,
  "show-header": true,
  "highlight-current-row": false,
  pagination: true,
  paginationConfig: {
    "page-size": 10,
  },
  columns: [
    {
      prop: "id",
      label: "ID",
    },
    {
      prop: "name",
      label: "用户名",
    },
    {
      prop: "mobile",
      label: "手机号",
    },
    {
      prop: "status",
      label: "状态",
    },
    {
      prop: "action",
      label: "操作",
    },
  ],
};
