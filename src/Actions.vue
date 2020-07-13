<template>
  <div>
    <el-button size="small" plain @click="() => setSchemaVisible(true)">查看Schema</el-button>
    <el-button size="small" plain :loading="codeLoading" @click="() => setCodeVisible(true)">查看Code</el-button>
    <el-button size="small" type="primary" :loading="saveLoading" @click="saveSchema">保存</el-button>
    <el-popconfirm
      title="清空以后无法恢复, 是否继续？"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @onConfirm="clearSchema"
    >
      <el-button slot="reference" size="small" style="float: right;" plain type="danger">
        清空
      </el-button>
    </el-popconfirm>

    <el-dialog title="Schema" :visible.sync="schemaVisible" top="5%" width="70%" append-to-body>
      <pre><code>{{ schemaStr }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadSchema">下载</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Code" :visible.sync="codeVisible" top="5%" width="70%" append-to-body>
      <pre><code>{{ code.text }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadVue">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formatCode, safeStringify, save } from "./helper/util";
import fileDownload from "js-file-download";

export default {
  name: "Actions",
  data() {
    return {
      schemaVisible: false,
      codeVisible: false,
      code: {},
      codeLoading: false,
      saveLoading: false,
    };
  },
  computed: {
    ...mapGetters(["schema", "schemaStr"]),
  },
  methods: {
    ...mapMutations(["setSchema"]),
    clearSchema() {
      this.setSchema({ schema: [] });
    },
    setSchemaVisible(schemaVisible) {
      this.schemaVisible = schemaVisible;
    },
    async setCodeVisible(codeVisible) {
      if (codeVisible) {
        try {
          this.codeLoading = true;
          const res = await formatCode(this.schema);
          if (res.success) {
            this.code = res.data;
            this.codeVisible = true;
          } else {
            this.$message.error(res.message);
          }
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.codeLoading = false;
        }
      } else {
        this.code = {};
        this.codeVisible = false;
      }
    },
    downloadSchema() {
      fileDownload(safeStringify(this.schema), "schema.json");
    },
    downloadVue() {
      fileDownload(this.code.text, `${this.code.uuid}.vue`);
    },
    async saveSchema() {
      this.saveLoading = true;
      try {
        const res = await save(this.schema);
        if (res.success) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.saveLoading = false;
      }
    },
  },
};
</script>
