<template>
  <draggable
    :list="widgets"
    v-bind="{ group: { name: 'widget', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
    @start="onStart"
  >
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="widget"
      :id="widget.widget"
      v-if="widget.widget !== 'FbCol'"
    >
      <div class="widget__name">
        <b>{{ widget.widget | ignoreFbPrefix }}</b>
        <span>{{ widget.widgetName }}</span>
      </div>
    </div>
  </draggable>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Draggable from "vuedraggable";
import { ignoreFbPrefix } from "./helper/filters";

export default {
  name: "Widgets",
  filters: {
    ignoreFbPrefix,
  },
  components: {
    Draggable,
  },
  computed: {
    ...mapGetters(["widgets"]),
  },
  methods: {
    ...mapMutations(["setWidgetUuid"]),
    onStart(evt) {
      // 拖动开始时, 为控件创建新的 uuid
      this.setWidgetUuid({ index: evt.oldIndex });
    },
  },
};
</script>
