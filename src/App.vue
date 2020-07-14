<template>
  <el-form>
    <div class="layout" @click="() => setSelectedUuid({ uuid: '' })">
      <div class="layout__left">
        <div class="box">
          <div class="box__item">
            <folders />
          </div>
          <div class="box__item">
            <widgets />
          </div>
        </div>
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
import Folders from "./Folders.vue";
import Widgets from "./Widgets.vue";
import Stage from "./Stage.vue";
import Actions from "./Actions.vue";

export default {
  name: "App",
  components: {
    Folders,
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
  padding: 0 0 0 300px;

  &__left {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    padding: 10px 0 10px 10px;

    .box {
      position: relative;
      width: 100%;
      height: 100%;

      &__item {
        width: 100%;
        height: 50%;
        overflow-y: hidden;
      }
    }
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
