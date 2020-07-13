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
    uuid: "面包屑__R_ba2e9f25_9221_4285_b240_ef8b65dddd5a",
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
                text: "重置",
                type: "",
                size: "small",
                icon: "",
                "native-type": "button",
                uuid: "Button__R_cbea7976_3db2_412e_b079_e28f6fcb7e22",
              },
              {
                widget: "FbButton",
                widgetName: "按钮",
                text: "搜索",
                type: "primary",
                "native-type": "button",
                uuid: "Button__f6130c10_9107_4597_b6e0_207f488d7b95",
                size: "small",
                icon: "el-icon-search",
              },
            ],
            inline: true,
          },
        ],
        uuid: "Row__cfbd63a9_7e46_495e_a8ba_b7f3d8c4ee55",
      },
    ],
    uuid: "表单__R_18b048b4_bf26_4c3f_94d7_c4eca19610ed",
  },
  {
    widget: "FbButton",
    widgetName: "按钮",
    text: "新增",
    type: "primary",
    size: "small",
    icon: "el-icon-plus",
    "native-type": "button",
    uuid: "按钮__R_7c3a7584_c905_4605_997b_260b3baa01fb",
  },
  {
    widget: "FbAlert",
    widgetName: "警告",
    title: "共查询到 100 条数据",
    type: "success",
    closable: false,
    uuid: "警告__R_2254b386_ea6e_42b9_8900_ee13529d2074",
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
    uuid: "表格__R_292a849e_4f97_403d_8e24_33364c71d807",
  },
];

const detailPageSchema = [
  {
    widget: "FbTitle",
    widgetName: "标题",
    text: "退款申请",
    uuid: "Title__R_082e8396_f7d1_49d5_921e_5ce8ba861484",
  },
  {
    widget: "FbRow",
    widgetName: "栅格",
    gutter: 20,
    childes: [
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_41c01769_7f41_4935_b3d5_0828b7494e75",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "取货单号",
            value: "1000000000",
            uuid: "Description__R_7ca2cab6_442c_4892_8aef_5d481b63a49c",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_8c7a0c4f_a28c_4f78_9ae4_3818e06667cd",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "状态",
            value: "已取货",
            uuid: "Description__R_61801bbc_d03f_480c_9095_e7c69da07c1d",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_58872c3a_4777_4744_a2e5_5a234c06d0ca",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "销售单号",
            value: "1234123421",
            uuid: "Description__R_75286487_1d04_4912_b63e_0f425ff67467",
          },
        ],
      },
    ],
    uuid: "Row__R_f387d96b_72c2_4eac_abc6_d9ba84aedf91",
  },
  {
    widget: "FbRow",
    widgetName: "栅格",
    gutter: 20,
    childes: [
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_1e6117ca_fd5b_4ab9_b3af_e6d7575284be",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "子订单",
            value: "3214321432",
            uuid: "Description__R_404708a2_b068_40ee_ac71_d52ba17da36c",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_5cc757a5_d3d1_4efd_a717_b3057764c39e",
        childes: [],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_32ecf9b9_72d3_41ee_9c73_a93033e05b34",
        childes: [],
      },
    ],
    uuid: "Row__R_7f0c1b06_8ce0_42ad_a8a0_7900061d0859",
  },
  {
    widget: "FbDivider",
    widgetName: "分割线",
    text: "",
    direction: "horizontal",
    "content-position": "center",
    uuid: "Divider__R_bf64bdef_c393_4a11_a8f0_cbab90525944",
  },
  {
    widget: "FbTitle",
    widgetName: "标题",
    text: "用户信息",
    uuid: "Title__R_f7f00536_d58d_4d52_b0f7_d20a85f198ed",
  },
  {
    widget: "FbRow",
    widgetName: "栅格",
    gutter: 20,
    childes: [
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_68fa0654_c543_4c53_be1e_42125b285d6b",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "用户姓名",
            value: "Rmlzy",
            uuid: "Description__R_a5563c88_0260_495f_ae80_db76e01b130c",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_dd7af6f6_59dd_4fa4_8048_5e34ed610884",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "联系电话",
            value: "18100000000",
            uuid: "Description__R_78d24821_3777_491c_aed3_363df8039898",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_0c62b443_a3cd_4d3e_bb9e_82d290a540de",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "常用快递",
            value: "菜鸟仓储",
            uuid: "Description__R_651db5fd_52b5_49be_92c9_e7eefce01b8e",
          },
        ],
      },
    ],
    uuid: "Row__R_ab28ee9f_450a_47e6_abd9_fc8ac934cd42",
  },
  {
    widget: "FbRow",
    widgetName: "栅格",
    gutter: 20,
    childes: [
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_3d98838f_9dcd_4cd3_a87b_c3b9aece1e88",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "取货地址",
            value: "浙江省杭州市西湖区万塘路18号",
            uuid: "Description__R_1a0bbf99_1a5e_4a7e_829f_1b1e4b6c0089",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_cd13bcff_2cf8_41b1_aba6_64e6d1fea300",
        childes: [
          {
            widget: "FbDescription",
            widgetName: "描述",
            label: "备注",
            value: "无",
            uuid: "Description__R_e54031c6_3a0a_483c_a051_8bc99619656d",
          },
        ],
      },
      {
        widget: "FbCol",
        span: 8,
        uuid: "Col__R_d0303bce_0b53_4985_8de4_a2667203de92",
        childes: [],
      },
    ],
    uuid: "Row__R_aca381e8_782f_425a_86a8_21d32fc5952d",
  },
  {
    widget: "FbDivider",
    widgetName: "分割线",
    text: "",
    direction: "horizontal",
    "content-position": "center",
    uuid: "Divider__R_2b0f3221_2a92_494d_ad3d_c895a45c6f4d",
  },
  {
    widget: "FbTitle",
    widgetName: "标题",
    text: "退货商品",
    uuid: "Title__R_fcb70945_50b2_42ae_bef9_37b2e840fc48",
  },
  {
    widget: "FbTable",
    widgetName: "表格",
    border: true,
    size: "",
    stripe: true,
    "show-header": true,
    "highlight-current-row": false,
    pagination: true,
    paginationConfig: {
      "page-size": 10,
    },
    columns: [
      {
        prop: "field1",
        label: "商品编号",
        sortable: true,
      },
      {
        prop: "field2",
        label: "商品名称",
      },
      {
        prop: "field3",
        label: "商品条码",
      },
      {
        prop: "field4",
        label: "单价",
        sortable: true,
      },
      {
        prop: "field5",
        label: "数量（件）",
      },
      {
        text: "",
        label: "金额",
        prop: "field6",
        sortable: true,
      },
    ],
    uuid: "Table__R_1af3a501_fc07_4bf2_bc49_163d92adffea",
    "show-summary": true,
  },
];

export default [
  {
    template: "FbListPage",
    templateName: "列表页",
    schema: listPageSchema,
  },
  {
    template: "FbDetailPage",
    templateName: "详情页",
    schema: detailPageSchema,
  },
];
