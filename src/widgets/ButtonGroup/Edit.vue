<template>
  <el-drawer title="ButtonGroup 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="尺寸" prop="size">
            <el-radio-group v-model="formData.size">
              <el-radio label="">默认</el-radio>
              <el-radio label="medium">中号</el-radio>
              <el-radio label="small">小号</el-radio>
              <el-radio label="mini">迷你</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="按钮配置">
        <el-row :gutter="20">
          <el-col :span="2">排序</el-col>
          <el-col :span="8">名称</el-col>
          <el-col :span="8">主题</el-col>
          <el-col :span="4">操作</el-col>
        </el-row>
        <draggable :list="formData.options" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.options" :key="index" class="sortable">
            <el-col :span="2">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="child.text" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="child.type" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" plain type="danger" @click="() => removeChild(index)">删除</el-button>
            </el-col>
          </el-row>
        </draggable>
        <el-button size="small" style="width: 100%;" type="default" @click="addChild">
          <i class="el-icon-plus"></i>
          <span>新增</span>
        </el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbButtonGroupEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  components: {
    draggable,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        separator: [{ required: true, message: "必填项" }],
      },
      typeList: [
        { value: "", label: "默认按钮" },
        { value: "primary", label: "主要按钮" },
        { value: "success", label: "成功按钮" },
        { value: "info", label: "信息按钮" },
        { value: "warning", label: "警告按钮" },
        { value: "danger", label: "危险按钮" },
        { value: "text", label: "文字按钮" },
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
      this.formData.options.push({ text: "" });
    },
    removeChild(index) {
      this.formData.options.splice(index, 1);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.formData.options = this.formData.options.map((child) => {
          child.size = this.formData.size;
          return child;
        });
        this.$emit("ok", _.cloneDeep(this.formData));
      });
    },
    beforeClose() {
      this.$emit("cancel", {});
    },
  },
};
</script>
