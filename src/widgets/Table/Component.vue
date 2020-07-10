<template>
  <div>
    <el-table
      :data="mockData"
      :border="config.border"
      :stripe="config.stripe"
      :size="config.size"
      :show-header="config['show-header']"
      :show-summary="config['show-summary']"
    >
      <el-table-column v-if="config.showSelection" type="selection" />
      <el-table-column
        v-for="(col, index) in config.columns"
        :key="index"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :sortable="col.sortable"
      />
    </el-table>
    <div v-if="config.pagination" style="text-align: right;">
      <br />
      <el-pagination
        :total="10"
        :page-size="config.paginationConfig['page-size']"
        :small="config.paginationConfig.small"
        :background="config.paginationConfig.background"
        :hide-on-single-page="config.paginationConfig['hide-on-single-page']"
      />
    </div>
  </div>
</template>

<script>
import { genTableMockData } from "../../helper/util";

export default {
  name: "FbTable",
  props: {
    config: Object,
  },
  data() {
    return {
      mockData: genTableMockData(this.config.columns, 10),
    };
  },
};
</script>
