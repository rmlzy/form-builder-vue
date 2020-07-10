<template>
  <el-drawer title="Upload 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文件列表的类型" prop="list-type">
            <el-select v-model="formData['list-type']">
              <el-option label="按钮风格" value="text" />
              <el-option label="卡片风格" value="picture-card" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData['list-type'] === 'picture-card'">
          <el-form-item label="是否启用拖拽上传" prop="drag">
            <el-switch v-model="formData.drag" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否支持多选文件" prop="multiple">
            <el-switch v-model="formData.multiple" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="上传文案" prop="text">
            <el-input v-model="formData.text" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提示文案" prop="tip">
            <el-input v-model="formData.tip" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最大允许上传个数" prop="limit">
            <el-input-number style="width: 100%;" v-model="formData.limit" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否在选取文件后立即进行上传" prop="auto-upload">
            <el-switch v-model="formData['auto-upload']" />
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
  name: "FbUploadEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        title: [{ required: true, message: "必填项" }],
        type: [{ required: true, message: "必填项" }],
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
