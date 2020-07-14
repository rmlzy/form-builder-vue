import _ from "lodash";
import { getWidgetText } from "./util";

/**
 * 收集所有的表单控件的name字段, 生成 formData 填充到模板中
 * @param {array} schema
 * @returns {object}
 */
const _collectFormData = (schema) => {
  const formData = {};
  schema = _.cloneDeep(schema);
  const findChildWithName = (childes) => {
    childes.forEach((child) => {
      if (child.name) {
        formData[child.name] = "";
      }
      if (_.isArray(child.childes)) {
        findChildWithName(child.childes);
      }
    });
  };
  findChildWithName(schema);
  return formData;
};

const _schema2template = (schema) => {
  const codes = [];
  schema.forEach((block) => {
    codes.push(getWidgetText(block));
  });
  return codes.join("\n");
};

const _genListPage = (schema) => {
  const template = _schema2template(schema);
  const data = {
    formData: {}, // 查询表单
  };
  const mounted = [];
  const methods = [];
  // 收集表单数据
  if (template.includes("<el-form")) {
    data.formData = _collectFormData(schema);
  }
  if (template.includes("<el-table")) {
    data.list = []; // 表格数据源
    data.loading = false; // 表格数据加载状态
    mounted.push(`this.fetchTableData();`);
    methods.push(`
    /**
     * 查询
     */
    search() {
      this.formData.page = 1;
      this.fetchTableData();
    },`);
    methods.push(`
    /**
     * 重置
     */
    reset() {
      this.page = 1;
      this.size = 10;
      this.$refs.form.resetFields();
      this.fetchTableData();
    },`);
    // 表格带分页时
    if (template.includes("<el-pagination")) {
      methods.push(`
      /**
       * 获取表格数据
       * @returns {Promise<*[]>}
       */
      async fetchTableData() {
        this.loading = true;
        try {
          const res = await request({
            method: "GET",
            url: "/api/mock/api",
            params: this.formData,
          });
          if (res.respCode !== '0000') {
            this.$message.error(res.respDesc);
            return;
          }
          const { list, total, page, size } = res.data;
          this.list = list;
          this.total = total;
          this.page = page;
          this.size = size;
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.loading = false;
        }
      },`);
    } else {
      methods.push(`
      /**
       * 获取表格数据
       * @returns {Promise<*[]>}
       */
      async fetchTableData() {
        this.loading = true;
        try {
          const res = await request({
            method: "GET",
            url: "/api/mock/api",
            params: this.formData,
          });
          if (res.respCode !== '0000') {
            this.$message.error(res.respDesc);
            return;
          }
          const { list } = res.data;
          this.list = list;
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.loading = false;
        }
      },`);
    }
  }
  if (template.includes("<el-pagination")) {
    data.total = 0; // 分页参数: 总条数
    data.page = 1; // 分页参数: 页码
    data.size = 10; // 分页参数: 页长
    methods.push(`
    /**
     * size 改变时会触发
     * @param {number} size 新的页长
     */
    onSizeChange(size) {
      this.page = 1;
      this.size = size;
      this.fetchTableData();
    },`);
    methods.push(`
    /**
     * page 改变时会触发
     * @param {number} page 新的页码
     */
    onPageChange(page) {
      this.page = page;
      this.fetchTableData();
    },`);
  }
  if (template.includes("<el-dialog")) {
    data.dialogVisible = false;
    methods.push(`
    /**
     * 展示对话框
     */
    showDialog() {
      // TODO: 其他逻辑
      this.dialogVisible = true;
    },`);
    methods.push(`
    /**
     * 关闭对话框
     */
    closeDialog() {
      // TODO: 其他逻辑
      this.dialogVisible = false;
    },`);
    methods.push(`
    /**
     * 对话框点击 "确定"
     */
    onDialogOk() {
      // TODO: 其他逻辑
      this.closeDialog();
    },`);
  }
  return `
  <template>
    <div>
      ${template}
    </div>
  </template>
  
  <script>
  import request from "@/utils/request";
  
  export default {
    name: "ListPage",
    data() {
      return ${JSON.stringify(data)};
    },
    mounted() {
      ${mounted.join("\n")}
    },
    methods: {
      ${methods.join("\n")}
    },
  };
  </script>`;
};

const _genFormPage = (template) => {};

const _genDetailPage = (template) => {};

/**
 * 生成 Vue 文件
 * @param schema
 * @param pageType
 * @returns {string}
 */
const schema2code = (schema, pageType) => {
  let code = "";
  if (pageType === "list-page") {
    code = _genListPage(schema);
  }
  if (pageType === "form-page") {
    code = _genFormPage(schema);
  }
  if (pageType === "detail-page") {
    code = _genDetailPage(schema);
  }
  return code;
};

export default schema2code;
