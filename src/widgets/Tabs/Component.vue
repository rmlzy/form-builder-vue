<template>
  <el-tabs
    :type="config.type"
    :closable="config.closable"
    :addable="config.addable"
    :editable="config.editable"
    :tab-position="config['tab-position']"
    :stretch="config.stretch"
  >
    <el-tab-pane v-for="(child, index) in config.options" :key="index" :label="child.label" :name="child.label" />
  </el-tabs>
</template>

<script>
export default {
  name: "FbTabs",
  props: {
    config: Object,
  },
};
</script>
