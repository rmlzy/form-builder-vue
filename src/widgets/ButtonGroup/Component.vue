<template>
  <el-button-group>
    <el-button v-for="(child, index) in config.options" :key="index" :type="child.type" :size="child.size">
      {{ child.text }}
    </el-button>
  </el-button-group>
</template>

<script>
export default {
  name: "FbButtonGroup",
  props: {
    config: Object,
  },
};
</script>
