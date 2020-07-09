<template>
  <el-drawer title="Divider 配置" size="60%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="内容" prop="text">
            <el-input v-model="formData.text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分割线方向" prop="direction">
            <el-radio-group v-model="formData.direction">
              <el-radio label="horizontal">水平</el-radio>
              <el-radio label="vertical">垂直</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分割线文案的位置" prop="content-position">
            <el-radio-group v-model="formData['content-position']">
              <el-radio label="left">左</el-radio>
              <el-radio label="right">中</el-radio>
              <el-radio label="center">右</el-radio>
            </el-radio-group>
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
  name: "FbDividerEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
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
