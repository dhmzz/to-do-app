<template>
    <el-button type="success" @click="openAddListDialog">Add to do activities +</el-button>
    <template v-for="item in ToDoApp.data" :key="item.id">
        <div style="display: flex; justify-content: center;">
            <el-card style="width: 1000px; margin-top: 20px;">
                <el-dropdown style="width: 100%">
                    <span class="el-dropdown-link">
                        {{ item.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu style="width: 100%;">
                            <el-button 
                                type="success" 
                                size="small" 
                                style="width: 100%" 
                            >
                                Add List
                            </el-button>

                            <el-dropdown-item></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-card>
            <div style="max-width: 800px; margin-top: 20px; margin-left: 5px;">
                <el-button type="danger" size="small" @click="handleDeleteChecklist(item.id)">Delete</el-button>
                <!-- <el-button type="success" size="small" @click="handleDeleteDetail(item.id)">-</el-button> -->
            </div>
        </div>
    </template>

    <el-dialog title="Add New Checklist" v-model="addListDialogVisible">
        <el-input v-model="newChecklistName" placeholder="Enter checklist name"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addListDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleAddChecklist">Add</el-button>
        </span>
    </el-dialog>

    <el-dialog title="Are you sure to delete this data?" v-model="addListDialogVisible">
        <!-- <el-input v-model="newChecklistName" placeholder="Enter checklist name"></el-input> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addListDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleAddChecklist">Yes</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useChecklistStore } from '../../stores/ToDoAp-store';

const ToDoApp = useChecklistStore();

const addListDialogVisible = ref(false);
const newChecklistName = ref('');

const openAddListDialog = () => {
    addListDialogVisible.value = true;
};

const handleDeleteChecklist = async(id:number) => {
    try {
        await ToDoApp.handleDeleteChecklist(id);
        await ToDoApp.handleGetChecklist();
    } catch (error) {
        console.error('Gagal menambahkan checklist:', error);
    }
}

const handleAddChecklist = async () => {
    if (!newChecklistName.value) {
        return;
    }
    try {
        await ToDoApp.handleCreateChecklist(newChecklistName.value);
        addListDialogVisible.value = false;
        newChecklistName.value = '';
        await ToDoApp.handleGetChecklist();
    } catch (error) {
        console.error('Gagal menambahkan checklist:', error);
    }
};

onMounted(async () => {
    await ToDoApp.handleGetChecklist();
});
</script>

<style scoped>
</style>
