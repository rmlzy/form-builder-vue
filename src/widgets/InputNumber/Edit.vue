<template>
  <el-drawer title="InputNumber 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标签" prop="label">
            <el-input v-model="formData.label"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最大值" prop="min">
            <el-input-number style="width: 100%;" v-model="formData.min" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小值" prop="max">
            <el-input-number style="width: 100%;" v-model="formData.max" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="步长" prop="step">
            <el-input-number style="width: 100%;" v-model="formData.step" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否只能输入 step 的倍数" prop="step-strictly">
            <el-switch v-model="formData['step-strictly']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否必填" prop="required">
            <el-switch v-model="formData.required" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数值精度" prop="precision">
            <el-input-number style="width: 100%;" v-model="formData.precision" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="占位文本" prop="placeholder">
            <el-input v-model="formData.placeholder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="辅助文本" prop="extra">
            <el-input v-model="formData.extra"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否使用控制按钮" prop="controls">
            <el-switch v-model="formData.controls"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="控制按钮位置" prop="controls-position">
            <el-select v-model="formData['controls-position']">
              <el-option value="">默认</el-option>
              <el-option value="right">右边</el-option>
            </el-select>
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
  name: "FbInputNumberEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        label: [{ required: true, message: "必填项" }],
        name: [{ required: true, message: "必填项" }],
        type: [{ required: true, message: "必填项" }],
      },
      typeList: [
        { value: "text", label: "文字" },
        { value: "email", label: "邮箱" },
        { value: "password", label: "密码" },
        { value: "color", label: "颜色" },
        { value: "url", label: "URL" },
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
