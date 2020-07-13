<template>
  <el-drawer title="Slider 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最大值" prop="max">
            <el-input-number style="width: 100%;" v-model="formData.max" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小值" prop="min">
            <el-input-number style="width: 100%;" v-model="formData.min" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="步长" prop="step">
            <el-input-number style="width: 100%;" v-model="formData.step" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否显示间断点" prop="show-stops">
            <el-switch v-model="formData['show-stops']" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否显示 tooltip" prop="show-tooltip">
            <el-switch v-model="formData['show-tooltip']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否为范围选择" prop="range">
            <el-switch v-model="formData.range" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否竖向模式" prop="vertical">
            <el-switch v-model="formData.vertical" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
  name: "FbSliderEdit",
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
