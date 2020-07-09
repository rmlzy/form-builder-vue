<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-input
      type="textarea"
      :maxlength="config.maxlength"
      :minlength="config.minlength"
      :show-word-limit="config['show-word-limit']"
      :placeholder="config.placeholder"
      :rows="config.rows"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbTextArea",
  props: {
    config: Object,
  },
};
</script>
