<template>
  <div class="row-highlight">
    <el-row :gutter="config.gutter">
      <el-col
        v-for="(child, childIndex) in config.childes"
        :key="childIndex"
        :span="child.span"
        :class="{ 'fb-inline': child.inline }"
      >
        <draggable
          :id="child.uuid"
          class="stage"
          v-model="child.childes"
          v-bind="{
            group: {
              name: 'widget',
            },
            ghostClass: 'sortable__ghost',
            handle: '.form-child',
          }"
          @add="addChildToCol"
        >
          <div class="col-highlight">
            <editable
              handle-class="form-child"
              v-for="(subChild, subChildIndex) in child.childes"
              :key="subChildIndex"
              :config="subChild"
            />
          </div>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import _ from "lodash";
import { genUuid, genWidgetUuid } from "../../helper/util";

export default {
  name: "FbRow",
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
    addChildToCol(evt) {
      const newConfig = _.cloneDeep(this.config);
      this.setWidget({ uuid: newConfig.uuid, config: newConfig });
    },
  },
};
</script>
