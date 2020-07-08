<template>
  <div class="layout" @click="() => setActiveUuid('')">
    <div class="layout__hd">
      <el-button size="small" type="primary" @click="() => setSchemaVisible(true)">查看Schema</el-button>
      <el-button size="small" type="primary" @click="() => setCodeVisible(true)">查看Code</el-button>
      <el-button size="small" type="danger" @click="clearSchema">清空</el-button>
    </div>

    <div class="layout__sd">
      <draggable
        :list="tools"
        v-bind="{ group: { name: 'tool', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
      >
        <div class="tool" v-for="(tool, index) in tools" :key="index">
          <div class="tool__name">
            <b>{{ tool.component | ignoreFbPrefix }}</b>
            <span>{{ tool.componentName }}</span>
          </div>
        </div>
      </draggable>
    </div>

    <div class="layout__bd">
      <draggable
        class="stage"
        v-model="schema"
        v-bind="{ group: 'tool', ghostClass: 'sortable__ghost', animation: 200, handle: '.editable__handle' }"
        @add="addBlock"
      >
        <editable
          v-for="(block, index) in schema"
          :key="index"
          :active-uuid="activeUuid"
          :config="block"
          @choose="chooseBlock"
          @remove="removeBlock"
          @edit="editBlock"
        />
      </draggable>
    </div>

    <el-dialog title="Schema" :visible.sync="schemaVisible" width="70%" append-to-body>
      <pre><code>{{ schemaStr }}</code></pre>
    </el-dialog>

    <el-dialog title="Code" :visible.sync="codeVisible" width="70%" append-to-body>
      <pre><code>{{ code }}</code></pre>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import editable from "./editable";
import { ignoreFbPrefix } from "./helper/filters";
import { findAndEdit, findAndRemove, genUuid, safeStringify, getToolsMeta, schema2code } from "./helper/util";

export default {
  name: "App",
  components: {
    draggable,
    editable,
  },
  filters: {
    ignoreFbPrefix,
  },
  data() {
    return {
      schemaVisible: false,
      schema: [],
      tools: getToolsMeta(),
      activeUuid: "",
      codeVisible: false,
      code: "",
    };
  },
  computed: {
    schemaStr() {
      return safeStringify(this.schema);
    },
  },
  methods: {
    clearSchema() {
      this.schema = [];
    },
    setActiveUuid(uuid) {
      this.activeUuid = uuid;
    },
    setSchemaVisible(schemaVisible) {
      this.schemaVisible = schemaVisible;
    },
    setCodeVisible(codeVisible) {
      this.codeVisible = codeVisible;
      this.code = codeVisible ? schema2code(this.schema) : "";
    },
    chooseBlock({ uuid }) {
      this.setActiveUuid(uuid);
    },
    addBlock({ newIndex, to }) {
      const block = this.schema[newIndex];
      const uuid = `${block.component}__${genUuid()}`.replace("fb-", "");
      this.$set(this.schema, newIndex, { ...block, uuid });
    },
    removeBlock({ uuid }) {
      this.schema = findAndRemove(this.schema, uuid);
      this.$forceUpdate();
    },
    editBlock({ uuid, block }) {
      this.schema = findAndEdit(this.schema, uuid, block);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="less">
@import "./global";
</style>
