<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-input
      :type="config.type"
      :maxlength="config.maxlength"
      :minlength="config.minlength"
      :show-word-limit="config['show-word-limit']"
      :placeholder="config.placeholder"
      :clearable="config.clearable"
      :show-password="config['show-password']"
      :size="config.size"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbInput",
  props: {
    config: Object,
  },
};
</script>
