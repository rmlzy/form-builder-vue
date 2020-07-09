<template>
  <el-page-header :title="config.title" :content="config.content" />
</template>

<script>
export default {
  name: "FbAlert",
  props: {
    config: Object,
  },
};
</script>
