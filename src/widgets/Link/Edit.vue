<template>
  <el-drawer title="Link 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="链接文字" prop="text">
            <el-input v-model="formData.text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="链接地址" prop="href">
            <el-input v-model="formData.href"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否在新标签页打开" prop="target">
            <el-select v-model="formData.target">
              <el-option label="默认" value="_self" />
              <el-option label="在新窗口中打开" value="_blank" />
              <el-option label="在父框架集中打开" value="_parent" />
              <el-option label="在整个窗口中打开" value="_top" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否下划线" prop="underline">
            <el-switch v-model="formData.underline" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import _ from "lodash";

export default {
  name: "FbLinkEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        text: [{ required: true, message: "必填项" }],
      },
      typeList: [
        { value: "primary", label: "主要链接" },
        { value: "success", label: "成功链接" },
        { value: "info", label: "信息链接" },
        { value: "warning", label: "警告链接" },
        { value: "danger", label: "危险链接" },
      ],
    };
  },
  watch: {
    config(newVal, oldVal) {
      this.formData = _.cloneDeep(newVal);
    },
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$emit("ok", _.cloneDeep(this.formData));
      });
    },
    beforeClose() {
      this.$emit("cancel", {});
    },
  },
};
</script>
