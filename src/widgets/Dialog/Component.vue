<template>
  <el-dialog
    visible
    :title="config.title"
    :width="config.width"
    :center="config.center"
    :destroy-on-close="config['destroy-on-close']"
    :modal="false"
    :modal-append-to-body="false"
    :lock-scroll="false"
    custom-class="editable-dialog"
    top="10px"
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
    <span slot="footer" class="dialog-footer">
      <el-button v-if="config.showCancelButton">{{ config.cancelButtonText }}</el-button>
      <el-button v-if="config.showConfirmButton" type="primary">{{ config.confirmButtonText }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  name: "FbDialog",
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

<style lang="less">
.editable-dialog {
  margin-bottom: 15px;
}
</style>
