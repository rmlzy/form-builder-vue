<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-switch
      :width="config.width"
      :active-text="config['active-text']"
      :inactive-text="config['inactive-text']"
      :active-color="config['active-color']"
      :inactive-color="config['inactive-color']"
    />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbSwitch",
  props: {
    config: Object,
  },
};
</script>
