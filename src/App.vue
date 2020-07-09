<template>
  <el-form>
    <div class="layout" @click="() => setSelectedUuid({ uuid: '' })">
      <div class="layout__left">
        <widgets />
      </div>
      <div class="layout__mid">
        <actions />
        <stage />
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapMutations } from "vuex";
import Widgets from "./Widgets.vue";
import Stage from "./Stage.vue";
import Actions from "./Actions.vue";

export default {
  name: "App",
  components: {
    Widgets,
    Actions,
    Stage,
  },
  methods: {
    ...mapMutations(["setSelectedUuid"]),
  },
};
</script>

<style lang="less">
@import "./global";
</style>
