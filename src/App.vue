<template>
  <el-form>
    <div class="layout" @click="() => setSelectedUuid({ uuid: '' })">
      <div class="layout__left">
        <widgets />
      </div>
      <div class="layout__mid">
        <div class="layout__mid__hd">
          <actions />
        </div>
        <div class="layout__mid__bd">
          <stage />
        </div>
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

.layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 0 0 200px;

  &__left {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    padding: 10px 0 10px 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__mid {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 52px 10px 0;

    &__hd {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 10px;
    }

    &__bd {
      height: 100%;
      border: 1px solid #ddd;
      overflow-y: auto;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
      background-image: radial-gradient(#f5f5f5 1px, transparent 1px);
      background-size: calc(10 * 1px) calc(10 * 1px);
      background-color: #fff;

      & > .stage {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
