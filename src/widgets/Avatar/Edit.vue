<template>
  <el-drawer title="Avatar 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="formData.type">
              <el-option label="文字" value="text" />
              <el-option label="图标" value="icon" />
              <el-option label="图片" value="image" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="formData.type === 'text'" label="文字" prop="text">
            <el-input v-model="formData.text" placeholder="请输入文字" />
          </el-form-item>
          <el-form-item v-if="formData.type === 'icon'" label="图标" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入图标名称" />
          </el-form-item>
          <el-form-item v-if="formData.type === 'image'" label="图片" prop="image">
            <el-input v-model="formData.image" placeholder="请输入图片地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设置头像的大小" prop="size">
            <el-radio-group v-model="formData.size">
              <el-radio label="large">大号</el-radio>
              <el-radio label="medium">中号</el-radio>
              <el-radio label="small">小号</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设置头像的形状" prop="shape">
            <el-radio-group v-model="formData.shape">
              <el-radio label="circle">圆形</el-radio>
              <el-radio label="square">正方形</el-radio>
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
  name: "FbAvatarEdit",
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
