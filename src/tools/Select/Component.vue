<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-select
      v-model="formData[config.name]"
      style="width: 100%;"
      :placeholder="config.placeholder"
      :size="config.size"
      :clearable="config.clearable"
      :filterable="config.filterable"
    >
      <el-option v-for="(item, index) in config.childes" :key="index" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: "FbSelect",
  props: {
    config: Object,
  },
  data() {
    return {
      formData: {},
    };
  },
};
</script>
