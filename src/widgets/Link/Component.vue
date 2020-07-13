<template>
  <el-link
    :type="config.type"
    :target="config.target"
    :href="config.href"
    :underline="config.underline"
  >
    {{ config.text }}
  </el-link>
</template>

<script>
export default {
  name: "FbLink",
  props: {
    config: Object,
  },
};
</script>
