<template>
  <el-steps
    :direction="config.direction"
    :active="config.active"
    :align-center="config['align-center']"
    :simple="config.simple"
  >
    <el-step
      v-for="(child, index) in config.options"
      :key="index"
      :title="child.title"
      :description="child.description"
    />
  </el-steps>
</template>

<script>
export default {
  name: "FbSteps",
  props: {
    config: Object,
  },
};
</script>
