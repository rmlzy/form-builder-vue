<template>
  <div class="fb-inline">
    <draggable
      class="stage"
      v-model="config.childes"
      v-bind="{
        group: {
          name: 'widget',
        },
        ghostClass: 'sortable__ghost',
        animation: 200,
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
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbInline",
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
