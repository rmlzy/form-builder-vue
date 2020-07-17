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
                <i class="el-icon-document-add" @click="showFileDialog"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="创建文件夹" placement="top">
                <i class="el-icon-folder-add" @click="showFolderDialog"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="side__bd" @click="onClickOutside">
            <div v-if="saving" class="folder__saving">
              <i class="el-icon-loading"></i>
              <span>保存中...</span>
            </div>
            <el-tree
              ref="tree"
              default-expand-all
              draggable
              highlight-current
              :data="folders"
              :current-node-key="activeNode.id"
              :filter-node-method="filterFolder"
              @node-click="onFolderClick"
            >
              <div slot-scope="{ node, data }" :class="{ folder__node: true, active: currentFileId === data.id }">
                <i v-if="data.isFolder" class="el-icon-folder" />
                <i v-if="data.isFile" class="el-icon-document" />
                <span style="margin-left: 5px;">{{ node.label }}</span>
                <i class="el-icon-edit folder__node--edit" @click.stop="showEditDialog(data)" />
                <i class="el-icon-delete text-danger folder__node--remove" @click.stop="showDialogConfirm(data)"></i>
              </div>
            </el-tree>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :title="editMode ? '更新文件夹' : '创建文件夹'"
      :visible.sync="createFolderVisible"
      append-to-body
      :before-close="closeFolderDialog"
    >
      <el-form ref="createFolderForm" :model="createFolderForm" :rules="createFolderRules" label-width="120px">
        <el-form-item label="文件夹名称" prop="label">
          <el-input v-model="createFolderForm.label" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFolderDialog">取 消</el-button>
        <el-button type="primary" @click="createFolder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="editMode ? '更新文件' : '创建文件'"
      :visible.sync="createFileVisible"
      append-to-body
      :before-close="closeFileDialog"
    >
      <el-form ref="createFileForm" :model="createFileForm" :rules="createFileRules" label-width="120px">
        <el-form-item label="文件名称" prop="label">
          <el-input v-model="createFileForm.label" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFileDialog">取 消</el-button>
        <el-button type="primary" @click="createFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { genUuid, removeChildInFolders, pushChildToFolders, editChildInFolders } from "./helper/util";
import { getSchema, createEmptyCode, getFolders, saveFolders } from "./helper/service";

export default {
  name: "Folders",
  data() {
    return {
      teamId: "",
      filterText: "",
      folders: [],
      activeNode: {},
      saving: false,
      editMode: false,

      createFolderVisible: false,
      createFolderForm: {
        label: "",
      },
      createFolderRules: {
        label: [{ required: true, message: "必填项" }],
      },

      createFileVisible: false,
      createFileForm: {
        label: "",
      },
      createFileRules: {
        label: [{ required: true, message: "必填项" }],
      },
    };
  },
  computed: {
    ...mapGetters(["currentFileId"]),
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    const { teamId } = this.$route.query;
    this.teamId = teamId;
    if (!this.teamId) {
      this.$alert("您暂无团队, 请创建团队或申请加入。", "提示", {
        type: "warning",
        showClose: false,
        showConfirmButton: true,
        confirmButtonText: "创建团队",
        showCancelButton: true,
        cancelButtonText: "申请加入",
        callback: (action) => {
          if (action === "confirm") {
            window.parent.location.href = "/team/new.html";
          }
          if (action === "cancel") {
            window.parent.location.href = "/team/join.html";
          }
        },
      });
      return;
    }
    this.getFolders();
  },
  methods: {
    ...mapMutations(["setCurrentFileId", "setSchema"]),
    async onFolderClick(node) {
      this.activeNode = node;
      if (node.isFolder) return;
      this.setCurrentFileId({ currentFileId: node.id });
      const loading = this.$loading();
      try {
        const res = await getSchema(node.id);
        if (res.success) {
          this.setSchema({ schema: res.data.schema });
        } else {
          this.$message.error(res.message);
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        loading.close();
      }
    },

    onClickOutside() {
      this.setCurrentFileId({ currentFileId: "" });
      this.setSchema({ schema: [] });
    },

    filterFolder(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    showEditDialog(data) {
      const { isFolder, isFile, label } = data;
      this.activeNode = data;
      this.editMode = true;
      if (isFolder) {
        this.createFolderForm.label = label;
        this.showFolderDialog();
      }
      if (isFile) {
        this.createFileForm.label = label;
        this.showFileDialog();
      }
    },

    showDialogConfirm(data) {
      const { id, isFolder, children } = data;
      if (isFolder && children.length > 0) {
        this.$alert("无法删除非空文件夹", "提示", { confirmButtonText: "确定", type: "warning" });
        return;
      }
      this.$confirm("删除以后无法恢复, 是否继续", "提示", {
        confirmButtonText: "确定",
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            this.folders = removeChildInFolders(this.folders, id);
            this.saveFolders();
            this.onClickOutside();
          }
        },
      });
    },

    showFolderDialog() {
      this.createFolderVisible = true;
    },

    closeFolderDialog() {
      this.createFolderVisible = false;
      this.editMode = false;
      this.$refs.createFolderForm.resetFields();
    },

    createFolder() {
      this.$refs.createFolderForm.validate((valid) => {
        if (!valid) return;
        const { label } = this.createFolderForm;
        const { id } = this.activeNode;
        if (this.editMode) {
          const editedFile = { id, label };
          this.folders = editChildInFolders(this.folders, editedFile);
        } else {
          const newFolder = { id: genUuid(false), label: label, isFolder: true, children: [] };
          this.folders = pushChildToFolders(this.folders, id, newFolder);
        }
        this.closeFolderDialog();
        this.saveFolders();
      });
    },

    showFileDialog() {
      this.createFileVisible = true;
    },

    closeFileDialog() {
      this.createFileVisible = false;
      this.editMode = false;
      this.$refs.createFileForm.resetFields();
    },

    createFile() {
      this.$refs.createFileForm.validate(async (valid) => {
        if (!valid) return;
        const { label } = this.createFileForm;
        const { id } = this.activeNode;
        if (this.editMode) {
          const editedFile = { id, label };
          this.folders = editChildInFolders(this.folders, editedFile);
        } else {
          const newFileId = genUuid(false);
          const newFile = { id: newFileId, label: label, isFile: true };
          const res = await createEmptyCode(newFileId);
          if (!res.success) {
            this.$message.error(res.message);
            return;
          }
          this.folders = pushChildToFolders(this.folders, id, newFile);
        }
        this.closeFileDialog();
        await this.saveFolders();
      });
    },

    async getFolders() {
      const loading = this.$loading();
      try {
        const res = await getFolders(this.teamId);
        if (res.success) {
          this.folders = res.data;
        } else {
          this.$message.error(res.message);
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        loading.close();
      }
    },

    async saveFolders() {
      this.saving = true;
      try {
        const res = await saveFolders(this.teamId, this.folders);
        if (!res.success) {
          this.$message.error(res.message);
        }
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.saving = false;
      }
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

  &__node {
    width: 100%;
    position: relative;
    color: #1f2f3d;

    &.active {
      color: #409eff;
    }

    &:hover {
      .folder__node--remove {
        display: block;
      }

      .folder__node--edit {
        display: block;
      }
    }

    &--edit {
      display: none;
      position: absolute;
      top: 3px;
      right: 25px;
    }

    &--remove {
      display: none;
      position: absolute;
      top: 3px;
      right: 3px;
    }
  }

  &__saving {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: #909399;

    span {
      margin-left: 3px;
    }
  }
}
</style>
