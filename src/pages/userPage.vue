<template>
    <a-flex :align="'start'" style="margin-bottom: 20px">
        <!-- Use the CreateModal component to create a new user -->
        <CreateModal objectName="User" :formFields="userFormFieldsCreate" :formState="userFormState"
            :rules="userFormRules" :createObject="createUser" @objectCreated="refresh" />
        <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>

    <a-table :columns="columns" :data-source="userData" :scroll="{ x: 1500 }">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
                <div class="justify-center text-center">
                    <div class="inline-block p-2">
                        <UpdateModal objectName="User" :formFields="userFormFieldsUpdate" :formState="record"
                            :rules="userFormRules" :updateObject="updateUser" @objectUpdated="refresh" />
                    </div>
                    <div class="inline-block">
                        <DeleteModal :id="{id:record.id}" @deleted="deleteUser" />
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
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';

export default {
    name: 'UserTable',
    components: {
        CreateModal,
        UpdateModal,
        DeleteModal,
    },
    data() {
        return {
            userFormState: {
                id: '',
                fullName: '',
                email: '',
                password: '',
                phoneNumber: '',
            },
            userFormFieldsCreate: [
                { label: 'Full Name', name: 'fullName', type: 'string' },
                { label: 'Email', name: 'email', type: 'string' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
            ],
            userFormFieldsUpdate: [
                { label: 'ID', name: 'id', type: 'string', disabled: true },
                { label: 'Full Name', name: 'fullName', type: 'string' },
                { label: 'Email', name: 'email', type: 'string' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
            ],
            userFormRules: {
                id: [{ required: true, message: 'Please input the ID!', trigger: 'blur' }],
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
            },
            columns: [
                { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
                { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', width: 100 },
                { title: 'Email', dataIndex: 'email', key: 'email', width: 100 },
                { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 100 },
                { title: 'Roles', dataIndex: 'roles', key: 'roles', width: 100 },
                { title: 'Action', key: 'operation', fixed: 'right', width: 100 },
            ],
            userData: [],
        };
    },
    methods: {
        async createUser(formState) {
            try {
                await createUser(formState);
                await this.fetchUsers();
            } catch (error) {
                console.error('Failed to create user:', error);
            }
        },
        async updateUser(formState) {
            try {
                await updateUser(formState);
                await this.fetchUsers();
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        },
        async fetchUsers() {
            try {
                const response = await getUsers(); // Assuming this returns the object with `listUsers`

                // Check if `listUsers` exists in the response and is an array
                if (response && Array.isArray(response.listUsers)) {
                    this.userData = response.listUsers; // Save the users to userData
                } else {
                    console.error("Unexpected API response:", response);
                    this.userData = []; // Fallback in case of unexpected data format
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                this.userData = []; // Handle errors and fallback
            }
        }
        ,
        async deleteUser(id) {
            try {
                await deleteUser(id);
                await this.fetchUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        },
        refresh() {
            this.fetchUsers();
        },
    },
    async mounted() {
        await this.fetchUsers();
    },
};
</script>