const listPageSchema = [
  {
    widget: "FbBreadcrumb",
    widgetName: "面包屑",
    separator: "/",
    options: [
      {
        text: "首页",
      },
      {
        text: "模块A",
      },
      {
        text: "列表页",
      },
    ],
    uuid: "Breadcrumb__9af9741f_7579_498b_aba7_9a4b9b460da6",
  },
  {
    widget: "FbForm",
    widgetName: "表单",
    model: "formData",
    inline: false,
    "label-position": "right",
    "label-width": 100,
    "label-suffix": "：",
    size: "medium",
    childes: [
      {
        widget: "FbRow",
        widgetName: "栅格",
        gutter: 20,
        childes: [
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__9fdbe9d9_1c5f_44e0_8c4b_8e87e2b16194",
            childes: [
              {
                widget: "FbInput",
                widgetName: "输入框",
                label: "姓名",
                name: "name",
                type: "text",
                placeholder: "请输入",
                uuid: "Input__4c359c3b_1d7d_41f9_bc88_3037dff106f9",
                clearable: true,
              },
            ],
          },
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__4ee3c721_75db_480e_94c0_886d2edbfdb3",
            childes: [
              {
                widget: "FbInput",
                widgetName: "输入框",
                label: "手机号",
                name: "mobile",
                type: "text",
                placeholder: "请输入",
                uuid: "Input__60705182_d263_4959_a1c9_565e0947256a",
                minlength: 11,
                clearable: true,
              },
            ],
          },
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__88f40e6a_26a0_496d_8c35_857adb492498",
            childes: [
              {
                widget: "FbInput",
                widgetName: "输入框",
                label: "订单号",
                name: "orderNo",
                type: "text",
                placeholder: "请输入",
                uuid: "Input__434afcd7_455a_459e_80ed_08e1bebe1806",
                clearable: true,
              },
            ],
          },
        ],
        uuid: "Row__0e5fc08c_273c_433b_9318_c1425c3715aa",
      },
      {
        widget: "FbRow",
        widgetName: "栅格",
        gutter: 20,
        childes: [
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__b3641100_6801_4445_adf6_3191e4b90f9e",
            childes: [
              {
                widget: "FbDatePicker",
                widgetName: "日期选择器",
                label: "下单时间",
                name: "orderDate",
                type: "date",
                size: "",
                align: "left",
                placeholder: "请选择",
                uuid: "DatePicker__3e1f010a_d409_466f_a107_b9bc77b0bcff",
                clearable: true,
              },
            ],
          },
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__d2f81208_30c7_4ef8_a8de_08548323a16a",
            childes: [
              {
                widget: "FbSwitch",
                widgetName: "开关",
                label: "是否激活",
                name: "active",
                "active-color": "#409EFF",
                "inactive-color": "#C0CCDA",
                uuid: "Switch__17c39d6e_6c49_4166_a4fd_2868d2a2cfd8",
                "active-text": "是",
                "inactive-text": "否",
              },
            ],
          },
          {
            widget: "FbCol",
            span: 8,
            uuid: "Col__79373047_3ccc_458d_a1ee_b3334ca98dbb",
            childes: [
              {
                widget: "FbButton",
                widgetName: "按钮",
                text: "搜索",
                type: "primary",
                "native-type": "button",
                uuid: "Button__f6130c10_9107_4597_b6e0_207f488d7b95",
                size: "small",
              },
            ],
          },
        ],
        uuid: "Row__cfbd63a9_7e46_495e_a8ba_b7f3d8c4ee55",
      },
    ],
    uuid: "Form__b893ea4a_2212_4a7c_9129_2584408539a8",
  },
  {
    widget: "FbAlert",
    widgetName: "警告",
    title: "共查询到 100 条数据",
    type: "success",
    closable: false,
    uuid: "Alert__b2ef5287_2f7b_4caf_a7cc_4bd65e237104",
    "show-icon": true,
  },
  {
    widget: "FbTable",
    widgetName: "表格",
    border: false,
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
    uuid: "Table__65dd54b9_63ac_4c2c_bd94_ae83db2dcc93",
  },
];

export default [
  {
    template: "ListPage",
    templateName: "列表页",
    schema: listPageSchema,
  },
];
