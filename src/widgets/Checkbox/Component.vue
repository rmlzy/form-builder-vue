<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-checkbox-group v-model="whatever" style="width: 100%;">
      <template v-for="(item, index) in config.options">
        <el-checkbox-button v-if="config.useButton" :key="index" :label="item.value" :border="config.border">
          {{ item.label }}
        </el-checkbox-button>
        <el-checkbox v-else :key="index" :label="item.value" :border="config.border">
          {{ item.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
export default {
  name: "FbCheckbox",
  props: {
    config: Object,
  },
  data() {
    return {
      whatever: [],
    };
  },
};
</script>
