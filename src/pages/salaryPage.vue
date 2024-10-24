<template>
    <a-flex :align="start" style="margin-bottom: 20px">
        <!-- Create new salary entry modal -->
        <CreateModal objectName="Salary" :formFields="getSalaryFormFieldsCreate()" :formState="salaryFormStateCreate"
            :rules="salaryFormRulesCreate" :createObject="createSalary" @SalaryCreated="refresh" />
        <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>

    <a-table :columns="columns" :data-source="salaryData" :scroll="{ x: 1500 }" :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
        onChange: handlePageChange,
    }">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
                <div class="justify-center text-center">
                    <div class="inline-block p-2">
                        <UpdateModal objectName="Salary" :formFields="getSalaryFormFieldsUpdate()" :formState="record"
                            :rules="salaryFormRulesUpdate" :updateObject="updateSalary" @SalaryUpdated="refresh" />
                    </div>
                    <div class="inline-block">
                        <DeleteModal :id="{month:record.month,year:record.year,employeeId:record.employeeId}" @deleted="deleteSalary" />
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
import { getSalaries, createSalary, updateSalary, deleteSalary } from '@/services/salaryService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';
import { getUserByRole } from '@/services/userService';

export default {
    name: 'SalaryPage',
    components: {
        CreateModal,
        UpdateModal,
        DeleteModal
    },
    data() {
        return {
            salaryFormStateCreate: {
                month: 0,
                year: 0,
                basicSalary: 0,
                bonus: 0,
                dayWorked: 0,
                dayOff: 0,
                employeeId: ''
            },
            salaryFormRulesCreate: {
                month: [{ required: true, message: 'Please input the month!', trigger: 'blur' }],
                year: [{ required: true, message: 'Please input the year!', trigger: 'blur' }],
                basicSalary: [{ required: true, message: 'Please input the basic salary!', trigger: 'blur' }],
                bonus: [{ required: true, message: 'Please input the bonus!', trigger: 'blur' }],
                dayWorked: [{ required: true, message: 'Please input the days worked!', trigger: 'blur' }],
                dayOff: [{ required: true, message: 'Please input the days off!', trigger: 'blur' }],
                employeeId: [{ required: true, message: 'Please input the employee ID!', trigger: 'blur' }]
            },
            salaryFormRulesUpdate: {
                month: [{ required: true, message: 'Please input the month!', trigger: 'blur' }],
                year: [{ required: true, message: 'Please input the year!', trigger: 'blur' }],
                basicSalary: [{ required: true, message: 'Please input the basic salary!', trigger: 'blur' }],
                bonus: [{ required: true, message: 'Please input the bonus!', trigger: 'blur' }],
                dayWorked: [{ required: true, message: 'Please input the days worked!', trigger: 'blur' }],
                dayOff: [{ required: true, message: 'Please input the days off!', trigger: 'blur' }],
                employeeId: [{ required: true, message: 'Please input the employee ID!', trigger: 'blur' }]
            },
            columns: [
                { title: 'Month', dataIndex: 'month', key: 'month', width: 100 },
                { title: 'Year', dataIndex: 'year', key: 'year', width: 100 },
                { title: 'Basic Salary', dataIndex: 'basicSalary', key: 'basicSalary', width: 150 },
                { title: 'Bonus', dataIndex: 'bonus', key: 'bonus', width: 100 },
                { title: 'Days Worked', dataIndex: 'dayWorked', key: 'dayWorked', width: 150 },
                { title: 'Days Off', dataIndex: 'dayOff', key: 'dayOff', width: 150 },
                { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', width: 150 },
                { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
            ],
            salaryData: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            employeeData: []
        };
    },
    methods: {
        async createSalary(formState) {
            try {
                await createSalary(formState);
                await this.fetchSalaries();
            } catch (error) {
                console.error('Failed to create salary:', error);
            }
        },
        async updateSalary(formState) {
            try {
                await updateSalary(formState);
                await this.fetchSalaries();
            } catch (error) {
                console.error('Failed to update salary:', error);
            }
        },
        async fetchSalaries() {
            try {
                const response = await getSalaries({
                    page: this.currentPage,
                    pageSize: this.pageSize,
                });
                this.salaryData = Array.isArray(response.items) ? response.items : [];
                this.totalItems = response.totalItems;
            } catch (error) {
                console.error('Failed to fetch salaries:', error);
                this.salaryData = [];
            }
        },
        async deleteSalary({month,year,employeeId}) {
            try {
                await deleteSalary({month,year,employeeId});
                await this.fetchSalaries();
            } catch (error) {
                console.error('Failed to delete salary:', error);
            }
        },
        refresh() {
            this.fetchSalaries();
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchSalaries();
        },
        getSalaryFormFieldsUpdate(record) {
            const fields = [
                { label: 'Month', name: 'month', type: 'number',disabled: true },
                { label: 'Year', name: 'year', type: 'number',disabled: true  },
                { label: 'Basic Salary', name: 'basicSalary', type: 'number' },
                { label: 'Bonus', name: 'bonus', type: 'number' },
                { label: 'Days Worked', name: 'dayWorked', type: 'number' },
                { label: 'Days Off', name: 'dayOff', type: 'number' },
            ];
            fields.push({
                label: 'Employee',
                name: 'employeeId',
                type: 'select',
                disabled: true ,
                options: this.employeeData.map((user) => ({
                    label: user.fullName,
                    value: user.id
                })),
            });

            return fields;
        },
        getSalaryFormFieldsCreate(record) {
            const fields = [
                { label: 'Month', name: 'month', type: 'number'},
                { label: 'Year', name: 'year', type: 'number' },
                { label: 'Basic Salary', name: 'basicSalary', type: 'number' },
                { label: 'Bonus', name: 'bonus', type: 'number' },
                { label: 'Days Worked', name: 'dayWorked', type: 'number' },
                { label: 'Days Off', name: 'dayOff', type: 'number' },
            ];
            fields.push({
                label: 'Employee',
                name: 'employeeId',
                type: 'select',
                options: this.employeeData.map((user) => ({
                    label: user.fullName,
                    value: user.id
                })),
            });

            return fields;
        },
        async fetchEmployees() {
            try {
                const response = await getUserByRole('Employee');
                this.employeeData = response || [];
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                this.employeeData = [];
            }
        },
    },
    async mounted() {
        await this.fetchSalaries();
        await this.fetchEmployees();
    }
};
</script>
