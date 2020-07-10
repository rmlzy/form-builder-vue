<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-color-picker :width="config.width" :show-alpha="config['show-alpha']" :color-format="config['color-format']" />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbColorPicker",
  props: {
    config: Object,
  },
};
</script>
