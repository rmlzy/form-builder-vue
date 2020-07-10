<template>
  <el-button
    :size="config.size"
    :type="config.type"
    :plain="config.plain"
    :round="config.round"
    :circle="config.circle"
    :native-type="config['native-type']"
  >
    {{ config.text }}
  </el-button>
</template>

<script>
export default {
  name: "FbButton",
  props: {
    config: Object,
  },
};
</script>
