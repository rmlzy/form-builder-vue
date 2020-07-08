<template>
  <el-divider :direction="config.direction" :content-position="config['content-position']">
    {{ config.text }}
  </el-divider>
</template>

<script>
export default {
  name: "FbDivider",
  props: {
    config: Object,
  },
};
</script>
