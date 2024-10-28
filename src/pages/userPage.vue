<template>
    <a-flex :align="'start'" style="margin-bottom: 20px">
        <CreateModal objectName="User" :formFields="userFormFieldsCreate" :formState="userFormState"
            :rules="userFormRules" :createObject="createUser" @objectCreated="refresh" />
        <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>

    <a-table :columns="columns" :data-source="normalizedUserData" :scroll="{ x: 1500 }" :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
        onChange: handlePageChange,
    }">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
                <div class="justify-center text-center">
                    <div class="inline-block p-2">
                        <UpdateModal objectName="User" :formFields="getUserFormFieldsUpdate(record)"
                            :formState="getUpdateFormState(record)" :rules="getUpdateRules" :updateObject="updateUser"
                            @objectUpdated="refresh" />
                    </div>
                    <div class="inline-block">
                        <DeleteModal :id="{ id: record.id }" @deleted="deleteUser" />
                    </div>
                </div>
            </template>
            <template v-else-if="column.key === 'roles'">
                {{ formatRoles(text) }}
            </template>
            <template v-else>
                {{ text }}
            </template>
        </template>
    </a-table>
</template>

<script>
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';
import { getRoles } from '../services/roleService';

export default {
    name: 'UserTable',
    components: {
        CreateModal,
        UpdateModal,
        DeleteModal,
    },
    data() {
        return {
            roles: [],
            userFormState: {
                fullName: '',
                email: '',
                password: '',
                phoneNumber: '',
                roles: [],
            },
            userFormFieldsCreate: [
                { label: 'Full Name', name: 'fullName', type: 'string' },
                { label: 'Email', name: 'email', type: 'string' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
            ],
            columns: [
                { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
                { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', width: 150 },
                { title: 'Email', dataIndex: 'email', key: 'email', width: 150 },
                { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 150 },
                { title: 'Pharmacy ID', dataIndex: 'pharmacyId', key: 'pharmacyId', width: 150 },
                { title: 'Roles', dataIndex: 'roles', key: 'roles', width: 150 },
                { title: 'Action', key: 'operation', fixed: 'right', width: 150 },
            ],
            userData: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
        };
    },
    computed: {
        isAdmin() {
            return this.$store.state.roles?.includes('Admin');
        },
        normalizedUserData() {
            return this.userData.map(user => ({
                ...user,
                roles: this.normalizeRoles(user.roles)
            }));
        },
        userFormRules() {
            const rules = {
                fullName: [
                    { required: true, message: 'Please input the full name!', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Full name must be between 3 and 50 characters!', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Please input the email!', trigger: 'blur' },
                    { type: 'email', message: 'Please enter a valid email address!', trigger: ['blur', 'change'] },
                ],
                password: [
                    { required: true, message: 'Please input the password!', trigger: 'blur' },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                        message: 'Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character!',
                        trigger: 'blur',
                    },
                ],
                phoneNumber: [
                    { required: true, message: 'Please input the phone number!', trigger: 'blur' },
                    { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!', trigger: 'blur' },
                ],
                roles: [
                    { required: this.isAdmin, message: 'Please select at least one role!', trigger: 'change' }
                ],
            };
            return rules;
        },
        getUpdateRules() {
            const rules = { ...this.userFormRules };
            delete rules.password; // Remove password validation for updates
            return rules;
        }
    },
    methods: {
        normalizeRoles(roles) {
            if (!roles) return [];
            if (typeof roles === 'string') return [roles];
            return Array.isArray(roles) ? roles : [roles];
        },
        formatRoles(roles) {
            const normalizedRoles = this.normalizeRoles(roles);
            return normalizedRoles.join(', ');
        },
        async createUser(formState) {
            try {
                const userData = {
                    ...formState,
                    roles: this.normalizeRoles(formState.roles)
                };
                await createUser(userData);
                this.$message.success('User created successfully');
                await this.refresh();
            } catch (error) {
                this.$message.error(error.message || 'Failed to create user');
                console.error('Failed to create user:', error);
            }
        },
        async updateUser(formState) {
            try {
                const userData = {
                    ...formState,
                    roles: this.normalizeRoles(formState.roles)
                };
                await updateUser(userData);
                this.$message.success('User updated successfully');
                await this.refresh();
            } catch (error) {
                this.$message.error(error.message || 'Failed to update user');
                console.error('Failed to update user:', error);
            }
        },
        getUpdateFormState(record) {
            return {
                id: record.id,
                fullName: record.fullName,
                email: record.email,
                phoneNumber: record.phoneNumber,
                roles: this.normalizeRoles(record.roles)
            };
        },
        getUserFormFieldsUpdate(record) {
            const fields = [
                { label: 'ID', name: 'id', type: 'string', disabled: true },
                { label: 'Full Name', name: 'fullName', type: 'string' },
                { label: 'Email', name: 'email', type: 'string' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
                { label: "pharmacyId", name: "pharmacyId", type: "int"}
            ];

            if (this.isAdmin) {
                fields.push({
                    label: 'Roles',
                    name: 'roles',
                    type: 'radio',
                    mode: 'multiple',
                    options: this.roles.map((role) => ({
                        label: role.name,
                        value: role.name
                    })),
                });
            }
            return fields;
        },
        async fetchUsers() {
            try {
                const response = await getUsers({
                    page: this.currentPage,
                    pageSize: this.pageSize,
                });
                this.userData = Array.isArray(response.items) ? response.items : [];
                this.totalItems = response.totalItems;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                this.userData = [];
            }
        },
        async deleteUser(id) {
            try {
                await deleteUser(id);
                this.$message.success('User deleted successfully');
                await this.refresh();
            } catch (error) {
                this.$message.error(error.message || 'Failed to delete user');
                console.error('Failed to delete user:', error);
            }
        },
        async getListRoles() {
            try {
                const response = await getRoles();
                this.roles = response || [];
            } catch (error) {
                console.error("Failed to fetch roles:", error);
                this.roles = [];
            }
        },
        refresh() {
            return this.fetchUsers();
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.fetchUsers();
        },
    },
    async mounted() {
        await this.getListRoles();
        await this.fetchUsers();
    },
};
</script>