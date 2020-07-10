<template>
  <el-calendar v-model="whatever" :range="[config.startDate, config.endDate]" />
</template>

<script>
export default {
  name: "FbCalendar",
  props: {
    config: Object,
  },
  data() {
    return {
      whatever: "",
    };
  },
};
</script>
