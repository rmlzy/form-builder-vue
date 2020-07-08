<template>
  <el-drawer title="Breadcrumb 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分隔符" prop="separator">
            <el-input v-model="formData.separator"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <draggable :list="formData.childes" handle=".sortable__handle" ghost-class="sortable__ghost">
        <el-row :gutter="20" v-for="(child, index) in formData.childes" :key="index" class="sortable">
          <el-col :span="2">
            <div class="sortable__handle">
              <i class="el-icon-s-operation"></i>
            </div>
          </el-col>
          <el-col :span="10">
            <el-input size="mini" v-model="child.text" />
          </el-col>
          <el-col :span="4">
            <el-button size="mini" type="danger" @click="() => removeChild(index)">删除</el-button>
          </el-col>
        </el-row>
      </draggable>
      <el-button size="small" style="width: 100%;" type="default" @click="addChild">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </el-button>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbBreadcrumbEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  components: {
    draggable,
  },
  data() {
    return {
      formData: {},
      rules: {
        separator: [{ required: true, message: "必填项" }],
      },
      typeList: [
        { value: "success", label: "成功提示" },
        { value: "warning", label: "警告提示" },
        { value: "info", label: "消息提示" },
        { value: "error", label: "错误提示" },
      ],
    };
  },
  watch: {
    config(newVal, oldVal) {
      this.formData = _.cloneDeep(newVal);
    },
  },
  methods: {
    addChild() {
      this.formData.childes.push({ text: "" });
    },
    removeChild(index) {
      this.formData.childes.splice(index, 1);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$emit("ok", _.cloneDeep(this.formData));
      });
    },
    beforeClose() {
      this.$emit("before-close", {});
    },
  },
};
</script>
