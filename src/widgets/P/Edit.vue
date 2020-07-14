<template>
  <el-drawer title="P 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="内容" prop="text">
            <el-input type="textarea" v-model="formData.text"></el-input>
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
  name: "FbPEdit",
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
