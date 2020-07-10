<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-date-picker
      v-model="whatever"
      type="datetime"
      :editable="config.editable"
      :clearable="config.clearable"
      :size="config.size"
      :placeholder="config.placeholder"
      :start-placeholder="config['start-placeholder']"
      :end-placeholder="config['end-placeholder']"
      :align="config.align"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbDateTimePicker",
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
