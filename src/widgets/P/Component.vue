<template>
  <p>{{ config.text }}</p>
</template>

<script>
export default {
  name: "FbP",
  props: {
    config: Object,
  },
};
</script>

<style lang="less">
.fb-title {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5715;
}
</style>
