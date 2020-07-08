<template>
  <div :class="{ editable: true, active: config.uuid === activeUuid }" @click.stop="onChoose">
    <div class="editable__handle">
      <i class="el-icon-s-operation"></i>
    </div>
    <div class="editable__actions">
      <i class="el-icon-edit" @click="() => setVisible(true)"></i>
      <i class="el-icon-delete text-danger" @click="onRemove"></i>
    </div>
    <component :is="config.component" :config="config"></component>
    <component
      :is="`${config.component}Edit`"
      :visible.sync="visible"
      :config="config"
      @ok="onEdit"
      @before-close="() => setVisible(false)"
    ></component>
  </div>
</template>

<script>
import { getToolsComponent } from "./helper/util";

export default {
  name: "Editable",
  props: {
    activeUuid: {
      type: String,
      value: "",
    },
    config: {
      type: Object,
      value: {},
    },
  },
  components: {
    ...getToolsComponent(),
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    setVisible(visible) {
      this.visible = visible;
    },
    onChoose() {
      this.$emit("choose", {
        uuid: this.config.uuid,
      });
    },
    onRemove() {
      this.$emit("remove", {
        uuid: this.config.uuid,
      });
    },
    onEdit(newOption) {
      this.$emit("edit", {
        uuid: this.config.uuid,
        block: newOption,
      });
      this.setVisible(false);
    },
  },
};
</script>
