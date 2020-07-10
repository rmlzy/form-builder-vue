<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-time-picker
      v-model="whatever"
      :editable="config.editable"
      :clearable="config.clearable"
      :size="config.size"
      :placeholder="config.placeholder"
      :is-range="config['is-range']"
      :start-placeholder="config['start-placeholder']"
      :end-placeholder="config['end-placeholder']"
      :align="config.align"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbTimePicker",
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
