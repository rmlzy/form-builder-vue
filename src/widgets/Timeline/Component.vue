<template>
  <el-timeline :reverse="config.reverse">
    <el-timeline-item v-for="(child, index) in config.options" :key="index" :timestamp="child.timestamp">
      {{ child.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: "FbTimeline",
  props: {
    config: Object,
  },
};
</script>
