<template>
  <el-drawer title="Input 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
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
          <el-form-item label="类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最大长度" prop="maxlength">
            <el-input-number style="width: 100%;" v-model="formData.maxlength" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小长度" prop="minlength">
            <el-input-number style="width: 100%;" v-model="formData.minlength" :min="0" :step="1" step-strictly />
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否必填" prop="required">
            <el-switch v-model="formData.required" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否显示输入字数统计" prop="show-word-limit">
            <el-switch v-model="formData['show-word-limit']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否可清空" prop="clearable">
            <el-switch v-model="formData.clearable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否显示切换密码图标" prop="show-password">
            <el-switch v-model="formData['show-password']" />
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
  name: "FbInputEdit",
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
