<template>
  <el-drawer title="Table 配置" size="50%" :visible.sync="visible" append-to-body :before-close="beforeClose">
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="small" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否带有纵向边框" prop="border">
            <el-switch v-model="formData.border" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否为斑马纹 table" prop="stripe">
            <el-switch v-model="formData.stripe" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否显示表头" prop="show-header">
            <el-switch v-model="formData['show-header']" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否在表尾显示合计行" prop="show-summary">
            <el-switch v-model="formData['show-summary']" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否展示多选框" prop="showSelection">
            <el-switch v-model="formData.showSelection" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>

      <el-form-item label="尺寸" prop="size">
        <el-radio-group v-model="formData.size">
          <el-radio label="">默认</el-radio>
          <el-radio label="medium">中号</el-radio>
          <el-radio label="small">小号</el-radio>
          <el-radio label="mini">迷你</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="列配置" prop="columns">
        <el-row :gutter="20">
          <el-col :span="2">排序</el-col>
          <el-col :span="4">名称</el-col>
          <el-col :span="4">字段</el-col>
          <el-col :span="5">固定</el-col>
          <el-col :span="4">支持排序</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
        <draggable :list="formData.columns" handle=".sortable__handle" ghost-class="sortable__ghost">
          <el-row :gutter="20" v-for="(child, index) in formData.columns" :key="index" class="sortable">
            <el-col :span="2">
              <div class="sortable__handle">
                <i class="el-icon-s-operation"></i>
              </div>
            </el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="child.label" />
            </el-col>
            <el-col :span="4">
              <el-input size="mini" v-model="child.prop" />
            </el-col>
            <el-col :span="5">
              <el-select v-model="child.fixed">
                <el-option label="不固定" value="" />
                <el-option label="左侧" value="left" />
                <el-option label="右侧" value="right" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-switch v-model="child.sortable" />
            </el-col>
            <el-col :span="2">
              <el-button size="mini" plain type="danger" @click="() => removeChild(index)">删除</el-button>
            </el-col>
          </el-row>
        </draggable>
        <el-button size="small" style="width: 100%;" type="default" @click="addChild">
          <i class="el-icon-plus"></i>
          <span>新增</span>
        </el-button>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否支持分页" prop="pagination">
            <el-switch v-model="formData.pagination" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-card v-if="formData.pagination" header="分页配置" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="每页显示条目个数" prop="page-size">
              <el-select v-model="formData.paginationConfig['page-size']">
                <el-option :value="10" label="10" />
                <el-option :value="20" label="20" />
                <el-option :value="30" label="30" />
                <el-option :value="50" label="50" />
                <el-option :value="100" label="100" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否使用小型分页样式" prop="small">
              <el-switch v-model="formData.paginationConfig.small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否为分页按钮添加背景色" prop="background">
              <el-switch v-model="formData.paginationConfig.background" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="只有一页时是否隐藏" prop="hide-on-single-page">
              <el-switch v-model="formData.paginationConfig['hide-on-single-page']" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbTableEdit",
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
        columns: [{ required: true, message: "必填项" }],
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
      this.formData.columns.push({ text: "" });
    },
    removeChild(index) {
      this.formData.columns.splice(index, 1);
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
