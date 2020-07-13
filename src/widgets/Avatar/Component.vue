<template>
  <div>
    <el-avatar v-if="config.type === 'icon'" :icon="config.icon" :size="config.size" :shape="config.shape" />
    <el-avatar
      v-if="config.type === 'image'"
      :src="config.src"
      :size="config.size"
      :shape="config.shape"
      :fit="config.fit"
    />
    <el-avatar v-if="config.type === 'text'" :size="config.size" :shape="config.shape" :fit="config.fit">{{
      config.text
    }}</el-avatar>
  </div>
</template>

<script>
export default {
  name: "FbAvatar",
  props: {
    config: Object,
  },
};
</script>
