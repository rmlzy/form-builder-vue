<template>
  <el-drawer title="Form 配置" size="60%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主题" prop="type">
            <el-select v-model="formData.type" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否可关闭" prop="closeable">
            <el-switch v-model="formData.closable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关闭按钮自定义文本" prop="close-text">
            <el-switch v-model="formData['close-text']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="展示图标" prop="show-icon">
            <el-switch v-model="formData['show-icon']" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文字是否居中" prop="center">
            <el-switch v-model="formData.center" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="辅助文字">
            <el-input type="textarea" :rows="2" v-model="formData.description"></el-input>
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
