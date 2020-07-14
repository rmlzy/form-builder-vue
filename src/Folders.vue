<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="目录">
        <div class="side">
          <div class="side__hd">
            <div class="folder__actions">
              <el-input
                size="mini"
                v-model="filterText"
                placeholder="输入关键字查询"
                clearable
                style="margin-right: 10px;"
              ></el-input>
              <el-tooltip class="item" effect="dark" content="创建页面" placement="top">
                <i class="el-icon-document-add"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="创建文件夹" placement="top">
                <i class="el-icon-folder-add" @click="showCreateFolderDialog"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="side__bd">
            <el-tree
              ref="tree"
              :data="folders"
              default-expand-all
              :filter-node-method="filterFolder"
              draggable
              @node-click="onFolderClick"
              :render-content="renderContent"
            ></el-tree>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="文件名称" :visible.sync="createFolderVisible" append-to-body>
      <el-form ref="createFolderForm" :model="createFolderForm" :rules="createFolderRules" label-width="120px">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="createFolderForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateFolderDialog">取 消</el-button>
        <el-button type="primary" @click="createFolder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { genUuid } from "./helper/util";

export default {
  name: "Folders",
  data() {
    return {
      filterText: "",
      folders: [],

      createFolderVisible: false,
      createFolderForm: {
        name: "",
      },
      createFolderRules: {
        name: [{ required: true, message: "必填项" }],
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <div>
          {data.isFolder ? <i class="el-icon-folder" /> : ""}
          {data.isFile ? <i class="el-icon-document" /> : ""}
          <span style="margin-left: 5px;">{node.label}</span>
        </div>
      );
    },

    onFolderClick(node) {
      console.log(node);
    },

    filterFolder(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    showCreateFolderDialog() {
      this.createFolderVisible = true;
    },

    closeCreateFolderDialog() {
      this.createFolderVisible = false;
      this.$refs.createFolderForm.resetFields();
    },

    createFolder() {
      this.$refs.createFolderForm.validate((valid) => {
        if (!valid) return;
        const { name } = this.createFolderForm;
        this.folders.push({
          id: genUuid(),
          label: name,
          isFolder: true,
          children: [],
        });
        this.closeCreateFolderDialog();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.folder {
  &__actions {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    i {
      font-size: 16px;
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
</style>
