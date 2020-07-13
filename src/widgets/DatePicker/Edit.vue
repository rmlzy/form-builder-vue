<template>
  <el-drawer title="DatePicker 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
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
          <el-form-item label="显示类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否必填" prop="required">
            <el-switch v-model="formData.required" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文本框可输入" prop="editable">
            <el-switch v-model="formData.editable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否显示清除按钮" prop="clearable">
            <el-switch v-model="formData.clearable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对齐方式" prop="align">
            <el-radio-group v-model="formData.align">
              <el-radio label="left">左</el-radio>
              <el-radio label="center">中</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="尺寸" prop="size">
        <el-radio-group v-model="formData.size">
          <el-radio label="">默认</el-radio>
          <el-radio label="medium">中号</el-radio>
          <el-radio label="small">小号</el-radio>
          <el-radio label="mini">迷你</el-radio>
        </el-radio-group>
      </el-form-item>
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
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import _ from "lodash";

export default {
  name: "FbDatePickerEdit",
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
        { value: "date", label: "日" },
        { value: "week", label: "周" },
        { value: "month", label: "月" },
        { value: "year", label: "年" },
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
