<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :list-type="config['list-type']"
    :drag="config.drag"
    :limit="config.limit"
    :multiple="config.multiple"
  >
    <template v-if="config['list-type'] === 'text'">
      <el-button icon="el-icon-plus" size="small" type="primary">{{ config.text }}</el-button>
    </template>
    <template v-else>
      <i class="el-icon-plus"></i>
      <div class="el-upload__text">{{ config.text }}</div>
    </template>
    <div slot="tip" class="el-upload__tip">{{ config.tip }}</div>
  </el-upload>
</template>

<script>
export default {
  name: "FbUpload",
  props: {
    config: Object,
  },
};
</script>
