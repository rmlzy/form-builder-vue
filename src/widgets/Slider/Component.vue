<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-slider
      :min="config.min"
      :max="config.max"
      :step="config.step"
      :show-stops="config['show-stops']"
      :show-tooltip="config['show-tooltip']"
      :range="config.range"
      :vertical="config.vertical"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbSlider",
  props: {
    config: Object,
  },
};
</script>
