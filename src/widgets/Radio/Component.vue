<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-radio-group v-model="whatever" style="width: 100%;">
      <template v-for="(item, index) in config.options">
        <el-radio-button v-if="config.useButton" :key="index" :label="item.value" :border="config.border">
          {{ item.label }}
        </el-radio-button>
        <el-radio v-else :key="index" :label="item.value" :border="config.border">
          {{ item.label }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: "FbRadio",
  props: {
    config: Object,
  },
  data() {
    return {
      whatever: "",
    };
  },
};
</script>
