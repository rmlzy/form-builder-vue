<template>
  <el-drawer title="Steps 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="显示方向" prop="direction">
            <el-radio-group v-mode="formData.direction">
              <el-radio label="horizontal">水平</el-radio>
              <el-radio label="vertical">垂直</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前激活步骤" prop="active">
            <el-input-number style="width: 100%;" v-model="formData.active" :min="0" :step="1" step-strictly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="进行居中对齐" prop="align-center">
            <el-switch v-model="formData['align-center']" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否应用简洁风格" prop="simple">
            <el-switch v-model="formData.simple" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="步骤配置">
        <el-row :gutter="20">
          <el-col :span="2">排序</el-col>
          <el-col :span="8">标题</el-col>
          <el-col :span="8">描述</el-col>
          <el-col :span="4">操作</el-col>
        </el-row>
        <draggable :list="formData.options" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.options" :key="index" class="sortable">
            <el-col :span="2">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="child.title" />
            </el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="child.description" />
            </el-col>
            <el-col :span="4">
              <el-button size="mini" plain type="danger" @click="() => removeChild(index)">删除</el-button>
            </el-col>
          </el-row>
        </draggable>
        <el-button size="small" style="width: 100%;" type="default" @click="addChild">
          <i class="el-icon-plus"></i>
          <span>新增</span>
        </el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbStepsEdit",
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
        separator: [{ required: true, message: "必填项" }],
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
