<template>
  <el-form-item :label="config.label" :prop="config.name" :required="config.required">
    <el-rate :max="config.max" :allow-half="config['allow-half']" :show-score="config['show-score']" />
    <div v-if="config.extra">{{ config.extra }}</div>
  </el-form-item>
</template>

<script>
export default {
  name: "FbRate",
  props: {
    config: Object,
  },
};
</script>
