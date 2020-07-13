<template>
  <el-drawer title="Row 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="栅格间隔" prop="gutter">
            <el-input-number size="mini" v-model="formData.gutter"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="列配置">
        <el-row :gutter="20">
          <el-col :span="2">排序</el-col>
          <el-col :span="8">名称</el-col>
          <el-col :span="8">内联</el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <draggable :list="formData.childes" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.childes" :key="index" class="sortable">
            <el-col :span="2">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <el-input-number size="mini" v-model="child.span" />
            </el-col>
            <el-col :span="8">
              <el-switch size="mini" v-model="child.inline" />
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
import _ from "lodash";
import Draggable from "vuedraggable";
import { genWidgetUuid } from "../../helper/util";

export default {
  name: "FbRowEdit",
  props: {
    visible: Boolean,
    config: Object,
  },
  components: {
    Draggable,
  },
  data() {
    return {
      formData: _.cloneDeep(this.config),
      rules: {},
    };
  },
  watch: {
    config(newVal, oldVal) {
      this.formData = _.cloneDeep(newVal);
    },
  },
  methods: {
    addChild() {
      this.formData.childes.push({ widget: "FbCol", span: 0, uuid: genWidgetUuid("FbCol"), childes: [] });
    },
    removeChild(index) {
      this.formData.childes.splice(index, 1);
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
