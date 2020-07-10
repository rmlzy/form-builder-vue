<template>
  <el-drawer title="ColorPicker 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
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
          <el-form-item label="是否支持透明度选择" prop="show-alpha">
            <el-switch v-model="formData['show-alpha']" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="写入 v-model 的颜色的格式" prop="color-format">
            <el-select v-model="formData['color-format']">
              <el-option label="hsl" value="hsl" />
              <el-option label="hsv" value="hsv" />
              <el-option label="rgb" value="rgb" />
            </el-select>
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
    name: "FbColorPickerEdit",
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
