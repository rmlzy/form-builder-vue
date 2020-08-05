<template>
  <el-form
    :inline="config.inline"
    :size="config.size"
    :label-position="config['label-position']"
    :label-width="config['label-width'] + 'px'"
    :label-suffix="config['label-suffix']"
  >
    <draggable
      class="stage"
      v-model="config.childes"
      v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        handle: '.form-child',
      }"
      @add="addChild"
    >
      <div class="form-highlight">
        <editable
          handle-class="form-child"
          v-for="(child, index) in config.childes"
          :id="child.uuid"
          :key="index"
          :config="child"
        />
      </div>
    </draggable>
  </el-form>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbForm",
  props: {
    config: Object,
  },
  components: {
    draggable,
  },
  beforeCreate() {
    this.$options.components.Editable = () => import("../../Editable");
  },
  methods: {
    ...mapMutations(["setWidget"]),
    addChild(evt) {
      const newConfig = _.cloneDeep(this.config);
      this.setWidget({
        uuid: newConfig.uuid,
        config: newConfig,
      });
    },
  },
};
</script>
