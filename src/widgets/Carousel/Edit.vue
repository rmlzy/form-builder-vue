<template>
  <el-drawer title="Carousel 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="高度" prop="height">
            <el-slider v-model="formData.height" :min="0" :max="500" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="自动切换的时间间隔，单位为毫秒" prop="interval">
            <el-slider v-model="formData.interval" :step="1000" :min="0" :max="10000" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否自动切换" prop="autoplay">
            <el-switch v-model="formData.autoplay" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否循环显示" prop="loop">
            <el-switch v-model="formData.loop" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="指示器的位置" prop="indicator-position">
            <el-radio-group v-model="formData['indicator-position']">
              <el-radio label="">默认</el-radio>
              <el-radio label="outside">外部</el-radio>
              <el-radio label="none">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="切换箭头的显示时机" prop="arrow">
            <el-radio-group v-model="formData.arrow">
              <el-radio label="hover">鼠标悬浮时</el-radio>
              <el-radio label="always">总是</el-radio>
              <el-radio label="never">从不</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="走马灯展示的方向" prop="direction">
            <el-radio-group v-model="formData.direction">
              <el-radio label="horizontal">水平</el-radio>
              <el-radio label="vertical">垂直</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="选项配置">
        <el-row :gutter="20">
          <el-col :span="2">排序</el-col>
          <el-col :span="14">图片地址</el-col>
          <el-col :span="4">操作</el-col>
        </el-row>
        <draggable :list="formData.options" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.options" :key="index" class="sortable">
            <el-col :span="2">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="14">
              <el-input size="mini" v-model="child.link" />
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
  name: "FbCarouselEdit",
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
