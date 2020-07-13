<template>
  <draggable
    :class="{ stage: true, 'stage--preview': previewMode }"
    v-model="schema"
    v-bind="{ group: 'widget', ghostClass: 'sortable__ghost', animation: 200, handle: '.stage-child' }"
  >
    <editable handle-class="stage-child" v-for="(block, index) in schema" :key="index" :config="getCopy(block)" />
  </draggable>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import Draggable from "vuedraggable";
import Editable from "./Editable";

export default {
  name: "Stage",
  components: {
    Draggable,
    Editable,
  },
  computed: {
    ...mapGetters(["previewMode"]),
    schema: {
      get() {
        return this.$store.state.schema;
      },
      set(schema) {
        this.$store.commit("setSchema", { schema });
      },
    },
  },
  methods: {
    ...mapMutations(["setSchema"]),
    // 获取拷贝, 防止 draggable 控件修改 vuex 的 state
    getCopy(any) {
      return _.cloneDeep(any);
    },
  },
};
</script>

<style lang="less">
.stage {
  &__sort {
    &__ghost {
      position: relative;

      &:before {
        position: absolute;
        top: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        content: "";
        background: #f56c6c;
      }
    }

    &__drag {
      opacity: 0.6;
    }
  }
}
</style>
