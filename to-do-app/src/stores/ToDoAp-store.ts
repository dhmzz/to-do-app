import { defineStore } from 'pinia'
import apiClient from '../utils/apiClient'
import { ElMessage } from 'element-plus'

export const useChecklistStore = defineStore('todoapp', {
    state: () => ({
        data: [] as ChecklistItem[],
    }),

    actions: {
        async handleGetChecklist() {
            try {
                const res = await apiClient.get(`/checklist`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (res.status === 200) {
                    this.data = res.data.data;
                    ElMessage({
                        message: "Checklist berhasil diambil!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal mengambil checklist",
                    type: 'error',
                });
            }
        },

        async handleCreateChecklist(name: string) {
            try {
                const param = {
                    name: name
                };

                const res = await apiClient.post(`/checklist`, param, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 201) {
                    this.data.push(res.data);
                    ElMessage({
                        message: "Checklist berhasil dibuat!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal membuat checklist",
                    type: 'error',
                });
            }
        },

        async handleDeleteChecklist(checklistId: number) {
            try {
                const res = await apiClient.delete(`/checklist/${checklistId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 204) {
                    this.data = this.data.filter(item => item.id !== checklistId);
                    ElMessage({
                        message: "Checklist berhasil dihapus!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal menghapus checklist",
                    type: 'error',
                });
            }
        },

        async handleGetAllChecklistItems(checklistId: number) {
            try {
                const res = await apiClient.get(`/checklist/${checklistId}/item`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (res.status === 200) {
                    // Lakukan sesuatu dengan data item checklist
                    return res.data.data;
                } else {
                    ElMessage({
                        message: "Gagal mengambil item checklist",
                        type: 'error',
                    });
                }
            } catch (error) {
                console.error('Error fetching checklist items:', error);
                throw error;
            }
        },

        async handleCreateNewChecklistItem(checklistId: number, itemName: string) {
            try {
                const param = {
                    itemName: itemName
                };

                const res = await apiClient.post(`/checklist/${checklistId}/item`, param, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 201) {
                    ElMessage({
                        message: "Item checklist berhasil dibuat!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal membuat item checklist",
                    type: 'error',
                });
                console.error('Error creating new checklist item:', error);
                throw error;
            }
        },

        async handleGetChecklistItem(checklistId: number, checklistItemId: number) {
            try {
                const res = await apiClient.get(`/checklist/${checklistId}/item/${checklistItemId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 200) {
                    return res.data;
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal mengambil item checklist",
                    type: 'error',
                });
                console.error('Error fetching checklist item:', error);
                throw error;
            }
        },

        async handleUpdateChecklistItemStatus(checklistId: number, checklistItemId: number) {
            try {
                const res = await apiClient.put(`/checklist/${checklistId}/item/${checklistItemId}`, null, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 200) {
                    ElMessage({
                        message: "Status item checklist berhasil diperbarui",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal memperbarui status item checklist",
                    type: 'error',
                });
                console.error('Error updating checklist item status:', error);
                throw error;
            }
        },

        async handleDeleteChecklistItem(checklistId: number, checklistItemId: number) {
            try {
                const res = await apiClient.delete(`/checklist/${checklistId}/item/${checklistItemId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 204) {
                    ElMessage({
                        message: "Item checklist berhasil dihapus!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal menghapus item checklist",
                    type: 'error',
                });
                console.error('Error deleting checklist item:', error);
                throw error;
            }
        },

        async handleRenameChecklistItem(checklistId: number, checklistItemId: number, itemName: string) {
            try {
                const res = await apiClient.put(`/checklist/${checklistId}/item/rename/${checklistItemId}`, {
                    itemName: itemName
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.status === 200) {
                    ElMessage({
                        message: "Nama item checklist berhasil diubah!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal mengubah nama item checklist",
                    type: 'error',
                });
                console.error('Error renaming checklist item:', error);
                throw error;
            }
        }
    }
});

interface ChecklistItem {
    id: number;
    name: string;
    items: any[] | null; // Ganti 'any' dengan tipe yang lebih spesifik jika Anda tahu struktur 'items'
    checklistCompletionStatus: boolean;
}

