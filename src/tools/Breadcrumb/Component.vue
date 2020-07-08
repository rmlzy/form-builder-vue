<template>
  <el-breadcrumb :separator.sync="config.separator">
    <el-breadcrumb-item v-for="(child, index) in config.childes" :key="index">{{ child.text }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "FbBreadcrumb",
  props: {
    config: Object,
  },
};
</script>
