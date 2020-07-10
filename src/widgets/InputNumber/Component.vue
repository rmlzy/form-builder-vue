<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-input-number
      :min="config.min"
      :max="config.max"
      :step="config.step"
      :step-strictly="config['step-strictly']"
      :precision="config.precision"
      :controls="config.controls"
      :controls-position="config['controls-position']"
      :placeholder="config.placeholder"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbInputNumber",
  props: {
    config: Object,
  },
};
</script>
