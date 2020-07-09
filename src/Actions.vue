<template>
  <div class="layout__mid__hd">
    <el-button size="small" plain @click="() => setSchemaVisible(true)">查看Schema</el-button>
    <el-button size="small" plain :loading="codeLoading" @click="() => setCodeVisible(true)">查看Code</el-button>
    <el-button size="small" plain type="danger" @click="clearSchema">清空</el-button>

    <el-dialog title="Schema" :visible.sync="schemaVisible" width="70%" append-to-body>
      <pre><code>{{ schemaStr }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadSchema">下载</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Code" :visible.sync="codeVisible" width="70%" append-to-body>
      <pre><code>{{ code.text }}</code></pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadVue">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formatCode, safeStringify } from "./helper/util";
import fileDownload from "js-file-download";

export default {
  name: "Actions",
  data() {
    return {
      schemaVisible: false,
      codeVisible: false,
      code: {},
      codeLoading: false,
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
        this.codeLoading = true;
        const res = await formatCode(this.schema);
        this.codeLoading = false;
        if (res.success) {
          this.code = res.data;
        }
      } else {
        this.code = {};
      }
      this.codeVisible = codeVisible;
    },
    downloadSchema() {
      fileDownload(safeStringify(this.schema), "schema.json");
    },
    downloadVue() {
      fileDownload(this.code.text, `${this.code.uuid}.vue`);
    },
  },
};
</script>
