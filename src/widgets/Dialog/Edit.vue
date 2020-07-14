<template>
  <el-drawer title="Dialog 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宽度" prop="width">
            <el-input v-model="formData.width" placeholder="例如: 300px 或 50%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否需要遮罩层" prop="modal">
            <el-switch v-model="formData.modal" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="插入至 body 元素上" prop="append-to-body">
            <el-switch v-model="formData['append-to-body']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否对头部和底部采用居中布局" prop="center">
            <el-switch v-model="formData.center" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关闭时销毁 Dialog 中的元素" prop="destroy-on-close">
            <el-switch v-model="formData['destroy-on-close']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否展示确认按钮" prop="showConfirmButton">
            <el-switch v-model="formData.showConfirmButton" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认按钮文案" prop="confirmButtonText">
            <el-input v-model="formData.confirmButtonText" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否展示取消按钮" prop="showCancelButton">
            <el-switch v-model="formData.showCancelButton" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="取消按钮文案" prop="cancelButtonText">
            <el-input v-model="formData.cancelButtonText" />
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
  name: "FbDialogEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        title: [{ required: true, message: "必填项" }],
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
