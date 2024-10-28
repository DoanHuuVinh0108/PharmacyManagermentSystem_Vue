<template>
    <a-flex :align="start" style="margin-bottom: 20px">
        <CreateModal objectName="Shift" :formFields="shiftFormFieldsCreate" :formState="shiftFormStateCreate"
            :rules="shiftFormRulesCreate" :createObject="createShift" @ShiftCreated="refresh" />
        <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
        
        <form class="max-w-sm mx-auto">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
            </label>
            <select v-model="pharmacyId" id="countries" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected>Choose a pharmacy</option>
                <option v-for="item in pharmacyData"  :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
        </form>
    </a-flex>

    <a-table  :columns="columns" :data-source="shiftData" :scroll="{ x: 1200 }" :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
        onChange: handlePageChange,
    }">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
                <div class="justify-center text-center">
                    <div class="inline-block p-2">
                        <UpdateModal objectName="Shift" :formFields="shiftFormFieldsUpdate" :formState="record"
                            :rules="shiftFormRulesUpdate" :updateObject="updateShift" @ShiftUpdated="refresh" />
                    </div>
                    <div class="inline-block">
                        <DeleteModal :id="{ id: record.id }" @deleted="deleteShift" />
                    </div>
                </div>
            </template>
            <template v-else>
                {{ text }}
            </template>
        </template>
    </a-table>
</template>

<script>
import { getShifts, createShift, updateShift, deleteShift } from '@/services/shiftService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';
import { getAll } from '../services/pharmacyService';

export default {
    name: 'ShiftPage',
    components: {
        CreateModal,
        UpdateModal,
        DeleteModal
    },
    data() {
        return {
            shiftFormStateCreate: {
                dates: [],
                count: 0,
                limit: 0,
                pharmacyId: 0
            },
            shiftFormFieldsCreate: [
                {
                    name: 'dates',
                    label: 'dates',
                    type: 'multi-date',
                    mode: 'multiple',
                    defaultValue: [],
                },
                { label: 'Count', name: 'count', type: 'int' },
                { label: 'Limit', name: 'limit', type: 'int' },
                { label: 'Pharmacy ID', name: 'pharmacyId', type: 'int' }
            ],
            shiftFormRulesCreate: {
                dates: [{ required: true, message: 'Please select dates!', trigger: 'change' }],
                count: [{ required: true, message: 'Please input the count!', trigger: 'blur' }],
                limit: [{ required: true, message: 'Please input the limit!', trigger: 'blur' }],
                pharmacyId: [{ required: true, message: 'Please input the pharmacy ID!', trigger: 'blur' }]
            },
            shiftFormFieldsUpdate: [
                { label: 'Date', name: 'date', type: 'date'},
                { label: 'Count', name: 'count', type: 'int' },
                { label: 'Limit', name: 'limit', type: 'int' },
                { label: 'Pharmacy ID', name: 'pharmacyId', type: 'int' }
            ],
            shiftFormRulesUpdate: {
                date: [{ required: true, message: 'Please select dates!', trigger: 'change' }],
                count: [{ required: true, message: 'Please input the count!', trigger: 'blur' }],
                limit: [{ required: true, message: 'Please input the limit!', trigger: 'blur' }],
                pharmacyId: [{ required: true, message: 'Please input the pharmacy ID!', trigger: 'blur' }]
            },
            columns: [
                { title: 'Date', dataIndex: 'date', key: 'date', width: 100 },
                { title: 'Count', dataIndex: 'count', key: 'count', width: 100 },
                { title: 'Limit', dataIndex: 'limit', key: 'limit', width: 100 },
                { title: 'Pharmacy ID', dataIndex: 'pharmacyId', key: 'pharmacyId', width: 150 },
                { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
            ],
            shiftData: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            pharmacyId: 1,
            pharmacyData: []
        };
    },
    methods: {
        async createShift(formState) {
            try {
                await createShift(formState);
                await this.fetchShifts();
            } catch (error) {
                console.error('Failed to create shift:', error);
                this.$message.error('Failed to create shift');
            }
        },
        async updateShift(formState) {
            try {
                await updateShift(formState);
                await this.fetchShifts();
                this.$message.success('Shift updated successfully');
            } catch (error) {
                console.error('Failed to update shift:', error);
                this.$message.error('Failed to update shift');
            }
        },
        async fetchShifts() {
            try {
                const response = await getShifts({
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    pharmacyId: this.pharmacyId
                });
                this.shiftData = Array.isArray(response.items) ? response.items : [];
                this.totalItems = response.totalItems;
            } catch (error) {
                console.error('Failed to fetch shifts:', error);
                this.shiftData = [];
                this.$message.error('Failed to fetch shifts');
            }
        },
        async deleteShift(id) {
            try {
                await deleteShift(id);
                await this.fetchShifts();
                this.$message.success('Shift deleted successfully');
            } catch (error) {
                console.error('Failed to delete shift:', error);
                this.$message.error('Failed to delete shift');
            }
        },
        refresh() {
            this.fetchShifts();
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchShifts();
        },
        async getAllPharmacies() {
            try {
                const response = await getAll();
                this.pharmacyData = response;
                console.log(this.pharmacyData);
            } catch (error) {
                console.error('Failed to fetch pharmacies:', error);
                this.pharmacyData = [];
            }
        }
    },
    async mounted() {
        await this.fetchShifts();
        await this.getAllPharmacies();
    }
};
</script>