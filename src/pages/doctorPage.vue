<template>
    <a-flex :align="start" style="margin-bottom: 20px">
      <CreateModal objectName="Doctor" :formFields="doctorFormFieldsCreate" :formState="doctorFormState"
        :rules="doctorFormRules" :createObject="createDoctor" @DoctorCreated="refresh" />
      <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>
  
    <a-table :columns="columns" :data-source="doctorData" :scroll="{ x: 1500 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'operation'">
          <div class="justify-center text-center">
            <div class="inline-block p-2">
              <UpdateModal objectName="Doctor" :formFields="doctorFormFieldsUpdate" :formState="record"
              :rules="doctorFormRules" :updateObject="updateDoctor" @DoctorUpdated="refresh" />
            </div>
            <div class="inline-block">
              <DeleteModal :id="{id:record.id}" @deleted="deleteDoctor" />
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
  import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '@/services/doctorService';
  import CreateModal from '../components/modal/createModal.vue';
  import UpdateModal from '../components/modal/updateModal.vue';
  import DeleteModal from '../components/modal/deleteModal.vue';
  
  export default {
    name: 'DoctorPage',
    components: {
      CreateModal,
      UpdateModal,
      DeleteModal
    },
    data() {
      return {
        doctorFormState: {
          id: '',
          name: '',
          phoneNumber: '',
          email: '',
          address: ''
        },
        doctorFormFieldsCreate: [
          { label: 'Name', name: 'name', type: 'string' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
          { label: 'Email', name: 'email', type: 'string' },
          { label: 'Address', name: 'address', type: 'string' }
        ],
        doctorFormFieldsUpdate: [
          { label: 'ID', name: 'id', type: 'int', disabled: true },
          { label: 'Name', name: 'name', type: 'string' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
          { label: 'Email', name: 'email', type: 'string' },
          { label: 'Address', name: 'address', type: 'string' }
        ],
        doctorFormRules: {
          name: [{ required: true, message: 'Please input the name!', trigger: 'blur' }],
          phoneNumber: [
                    { required: true, message: 'Please input the phone number!', trigger: 'blur' },
                    { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!', trigger: 'blur' },
                ],
          email: [
                    { required: true, message: 'Please input the email!', trigger: 'blur' },
                    { type: 'email', message: 'Please enter a valid email address!', trigger: ['blur', 'change'] },
                ],
          address: [{ required: true, message: 'Please input the address!', trigger: 'blur' }]
        },
        columns: [
          { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
          { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 150 },
          { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
          { title: 'Address', dataIndex: 'address', key: 'address', width: 250 },
          { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
        ],
        doctorData: [] // Doctor data is initialized as an empty array
      };
    },
    methods: {
      async createDoctor(formState) {
        try {
          await createDoctor(formState); // Call the API to create a doctor
          await this.fetchDoctors(); // Refresh doctor list
        } catch (error) {
          console.error('Failed to create doctor:', error);
        }
      },
      async updateDoctor(formState) {
        try {
          await updateDoctor(formState); // Call the API to update the doctor
          await this.fetchDoctors(); // Refresh doctor list after updating
        } catch (error) {
          console.error('Failed to update doctor:', error);
        }
      },
      async fetchDoctors() {
        try {
          const doctors = await getDoctors();
          this.doctorData = Array.isArray(doctors) ? doctors : [];
        } catch (error) {
          console.error('Failed to fetch doctors:', error);
          this.doctorData = [];
        }
      },
      async deleteDoctor(id) {
        try {
          await deleteDoctor(id); // Call the API to delete the doctor
          await this.fetchDoctors(); // Refresh doctor list after deleting
        } catch (error) {
          console.error('Failed to delete doctor:', error);
        }
      },
      refresh() {
        this.fetchDoctors(); // Refresh the doctor list
      }
    },
    async mounted() {
      await this.fetchDoctors(); // Fetch doctors when the component is mounted
    }
  };
  </script>
  