<template>
  <el-drawer title="Rate 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
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
          <el-form-item label="最大分值" prop="max">
            <el-input-number style="width: 100%;" v-model="formData.max" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否允许半选" prop="allow-half">
            <el-switch v-model="formData['allow-half']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否显示当前分数" prop="show-score">
            <el-switch v-model="formData['show-score']" />
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
  name: "FbRateEdit",
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
