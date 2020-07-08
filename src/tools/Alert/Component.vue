<template>
  <el-alert
    :title="config.title"
    :type="config.type"
    :closable="config.closable"
    :close-text="config['close-text']"
    :show-icon="config['show-icon']"
    :center="config.center"
    :description="config.description"
  />
</template>

<script>
export default {
  name: "FbAlert",
  props: {
    config: Object,
  },
};
</script>
