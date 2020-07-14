<template>
  <el-drawer title="Button 配置" size="60%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="按钮文字" prop="text">
            <el-input v-model="formData.text"></el-input>
          </el-form-item>
        </el-col>
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
          <el-form-item label="图标" prop="type">
            <el-select v-model="formData.icon" filterable placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in iconList" :key="item.value" :value="item">
                {{ item }}
                <i :class="item"></i>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="尺寸" prop="size">
            <el-radio-group v-model="formData.size">
              <el-radio label="">默认</el-radio>
              <el-radio label="medium">中号</el-radio>
              <el-radio label="small">小号</el-radio>
              <el-radio label="mini">迷你</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否朴素按钮" prop="plain">
            <el-switch v-model="formData.plain" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否圆角按钮" prop="round">
            <el-switch v-model="formData.round" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否圆形按钮" prop="circle">
            <el-switch v-model="formData.circle" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原生 type 属性" prop="native-type">
            <el-select v-model="formData['native-type']">
              <el-option label="button" value="button" />
              <el-option label="submit" value="submit" />
              <el-option label="reset" value="reset" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import _ from "lodash";
import iconList from "../../helper/icons"

export default {
  name: "FbButtonEdit",
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
      iconList: iconList,
      typeList: [
        { value: "", label: "默认按钮 (白色)" },
        { value: "primary", label: "主要按钮 (蓝色)" },
        { value: "success", label: "成功按钮 (绿色)" },
        { value: "info", label: "信息按钮 (灰色)" },
        { value: "warning", label: "警告按钮 (黄色)" },
        { value: "danger", label: "危险按钮 (红色)" },
        { value: "text", label: "文字按钮" },
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
