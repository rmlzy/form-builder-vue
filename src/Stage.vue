<template>
  <div class="layout__mid__bd">
    <draggable
      class="stage"
      v-model="schema"
      v-bind="{ group: 'widget', ghostClass: 'sortable__ghost', animation: 200, handle: '.stage-child' }"
    >
      <editable handle-class="stage-child" v-for="(block, index) in schema" :key="index" :config="getCopy(block)" />
    </draggable>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import _ from "lodash";
import Draggable from "vuedraggable";
import Editable from "./Editable";
import { genUuid, genWidgetUuid, safeStringify } from "./helper/util";

export default {
  name: "Stage",
  components: {
    Draggable,
    Editable,
  },
  computed: {
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
