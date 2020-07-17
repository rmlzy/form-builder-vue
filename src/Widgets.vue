<template>
  <el-tabs type="border-card" v-model="activeTab">
    <el-tab-pane label="控件" name="widgets">
      <div class="side">
        <div class="side__hd">
          <el-input v-model="widgetKeyword" size="mini" placeholder="输入关键字查询" clearable />
        </div>
        <div class="side__bd">
          <draggable
            :list="widgets"
            v-bind="{ group: { name: 'widget', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
            @start="onStart"
          >
            <div
              v-for="(widget, index) in widgets"
              :key="index"
              :class="{ widget: true, 'widget--hide': !(widget.widget + widget.widgetName).includes(widgetKeyword) }"
              :id="widget.widget"
            >
              <div class="widget__name">
                <b>{{ widget.widget | ignoreFbPrefix }}</b>
                <span>{{ widget.widgetName }}</span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="模板" name="templates">
      <div class="side">
        <div class="side__hd">
          <el-input v-model="templateKeyword" size="mini" placeholder="输入关键字查询" clearable />
        </div>
        <div class="side__bd">
          <div
            v-for="(item, index) in templates"
            :key="index"
            :class="{ widget: true, 'widget--hide': !(item.template + item.templateName).includes(templateKeyword) }"
            :id="item.template"
            @click="onAddTemplate(item.schema)"
          >
            <div class="widget__name">
              <b>{{ item.template | ignoreFbPrefix }}</b>
              <span>{{ item.templateName }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
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
  data() {
    return {
      activeTab: "widgets",
      widgetKeyword: "",
      templateKeyword: "",
    };
  },
  computed: {
    ...mapGetters(["widgets", "templates"]),
  },
  methods: {
    ...mapMutations(["resetWidget", "addTemplate"]),
    onStart(evt) {
      // 拖动开始时, 为控件创建新的 uuid
      this.resetWidget({ index: evt.oldIndex });
    },
    onAddTemplate(schema) {
      this.addTemplate({ schema });
    },
  },
};
</script>

<style lang="less">
.widget {
  position: relative;
  cursor: pointer;
  user-select: none;
  list-style: none;
  margin-bottom: 5px;
  padding: 8px;
  background: #f4f4f5;
  font-size: 12px;

  &--hide {
    display: none;
  }

  &__icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }

  &__name {
    b {
      margin-right: 5px;
    }
  }
}
</style>
