<template>
  <div :class="{ editable: true, active: active, clearfix: true }" @click.stop="onChoose">
    <div :class="{ editable__handle: true, [handleClass]: handleClass }">
      <i class="el-icon-s-operation"></i>
    </div>
    <div class="editable__actions">
      <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
        <i class="el-icon-edit" @click="() => setVisible(true)"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
        <i class="el-icon-delete text-danger" @click="onRemove"></i>
      </el-tooltip>
    </div>
    <div class="editable__name">{{ config.widgetName }} {{ config.uuid }}</div>
    <div class="editable__bd">
      <component :is="config.widget" :config="config" />
      <component
        :is="`${config.widget}Edit`"
        :visible="visible"
        :config="config"
        @ok="onOk"
        @cancel="() => setVisible(false)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getWidgets } from "./helper/util";

export default {
  name: "Editable",
  props: {
    handleClass: {
      type: String,
      default: "handle",
    },
    config: {
      type: Object,
      value: {},
    },
  },
  components: {
    ...getWidgets(),
  },
  data() {
    return {
      visible: false, // 控制编辑控件显隐
    };
  },
  computed: {
    ...mapGetters(["selectedUuid"]),
    active() {
      return this.config.uuid === this.selectedUuid;
    },
  },
  methods: {
    ...mapMutations(["setSelectedUuid", "removeWidget", "setWidget"]),
    setVisible(visible) {
      this.visible = visible;
    },
    onChoose() {
      const { uuid } = this.config;
      this.setSelectedUuid({ uuid });
    },
    onRemove() {
      const { uuid } = this.config;
      this.removeWidget({ uuid });
    },
    onOk(newConfig) {
      const { uuid } = this.config;
      this.setWidget({ uuid, config: newConfig });
      this.setVisible(false);
      console.log("编辑了组件: ", newConfig);
    },
  },
};
</script>
