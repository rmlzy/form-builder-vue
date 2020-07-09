<template>
  <el-drawer title="Select 配置" size="60%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small">
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
          <el-form-item label="尺寸" prop="size">
            <el-radio-group v-model="formData.size">
              <el-radio label="medium">默认</el-radio>
              <el-radio label="small">小号</el-radio>
              <el-radio label="mini">迷你</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否必填" prop="required">
            <el-switch v-model="formData.required" />
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
          <el-form-item label="是否可清空" prop="clearable">
            <el-switch v-model="formData.clearable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可搜索" prop="filterable">
            <el-switch v-model="formData.filterable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="选项">
        <el-row :gutter="20">
          <el-col :span="3">排序</el-col>
          <el-col :span="8">名称</el-col>
          <el-col :span="8">值</el-col>
        </el-row>
        <draggable :list="formData.options" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.options" :key="index" class="sortable">
            <el-col :span="3">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <el-input style="width: 80%;" size="mini" v-model="child.label" />
            </el-col>
            <el-col :span="8">
              <el-input style="width: 80%;" size="mini" v-model="child.value" />
            </el-col>
            <el-col :span="4">
              <el-button size="mini" plain type="danger" @click="() => removeChild(index)">删除</el-button>
            </el-col>
          </el-row>
        </draggable>
      </el-form-item>
      <el-button size="small" style="width: 100%;" type="default" @click="addChild">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </el-button>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbSelectEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  components: {
    draggable,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {
        label: [{ required: true, message: "必填项" }],
        name: [{ required: true, message: "必填项" }],
      },
    };
  },
  watch: {
    config(newVal, oldVal) {
      this.formData = _.cloneDeep(newVal);
    },
  },
  methods: {
    addChild() {
      this.formData.options.push({ text: "" });
    },
    removeChild(index) {
      this.formData.options.splice(index, 1);
    },
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
