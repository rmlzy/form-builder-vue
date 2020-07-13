<template>
  <h3 class="fb-title">{{ config.text }}</h3>
</template>

<script>
export default {
  name: "FbTitle",
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
