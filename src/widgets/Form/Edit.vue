<template>
  <el-drawer title="Form 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="行内表单模式" prop="inline">
            <el-switch v-model="formData.inline" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="表单域标签的后缀" prop="label-suffix">
            <el-input v-model="formData['label-suffix']"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="尺寸" prop="size">
            <el-radio-group v-model="formData.size">
              <el-radio label="medium">默认</el-radio>
              <el-radio label="small">小号</el-radio>
              <el-radio label="mini">迷你</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="表单域标签的位置" prop="label-position">
            <el-radio-group v-model="formData['label-position']">
              <el-radio label="top">上</el-radio>
              <el-radio label="left">左</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="表单域标签的宽度" prop="label-width">
            <el-slider v-model="formData['label-width']" :min="0" :max="300"></el-slider>
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
  name: "FbFormEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        inline: [{ required: true, message: "必填项" }],
      },
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
