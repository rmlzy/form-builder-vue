<template>
  <description :label="config.label" :value="config.value" />
</template>

<script>
import Description from "../../components/Description/Description";

export default {
  name: "FbDescription",
  props: {
    config: Object,
  },
  components: {
    Description,
  },
};
</script>
