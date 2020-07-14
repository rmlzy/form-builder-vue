<template>
  <el-carousel
    :height="config.height + 'px'"
    :interval="config.interval"
    :autoplay="config.autoplay"
    :loop="config.loop"
    :arrow="config.arrow"
    :indicator-position="config['indicator-position']"
    :direction="config.direction"
  >
    <el-carousel-item v-for="(child, index) in config.options" :key="index">
      <img style="width: 100%; height: 100%;" :src="child.link" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "FbCarousel",
  props: {
    config: Object,
  },
};
</script>
