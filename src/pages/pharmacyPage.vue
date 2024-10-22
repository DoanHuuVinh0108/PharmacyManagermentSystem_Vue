<template>
    <a-flex :align="start" style="margin-bottom: 20px">
      <!-- Use the CreateModal component to create a new pharmacy -->
      <CreateModal objectName="Pharmacy" :formFields="pharmacyFormFieldsCreate" :formState="pharmacyFormState"
        :rules="pharmacyFormRules" :createObject="createPharmacy" @PharmacyCreated="refresh" />
      <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>
  
    <a-table :columns="columns" :data-source="pharmacyData" :scroll="{ x: 1500 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'operation'">
          <div class="justify-center text-center">
            <div class="inline-block p-2">
              <UpdateModal objectName="Pharmacy" :formFields="pharmacyFormFieldsUpdate" :formState="record"
              :rules="pharmacyFormRules" :updateObject="updatePharmacy" @PharmacyUpdated="refresh" />
            </div>
            <div class="inline-block">
              <DeleteModal :id="{id:record.id}" @deleted="deletePharmacy" />
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
  import { getPharmacies, createPharmacy, updatePharmacy, deletePharmacy } from '@/services/pharmacyService';
  import CreateModal from '../components/modal/createModal.vue';
  import UpdateModal from '../components/modal/updateModal.vue';
  import DeleteModal from '../components/modal/deleteModal.vue';
  
  export default {
    name: 'PharmacyPage',
    components: {
      CreateModal,
      UpdateModal,
      DeleteModal
    },
    data() {
      return {
        pharmacyFormState: {
          name: '',
          address: '',
          phoneNumber: '',
          email: ''
        },
        pharmacyFormFieldsCreate: [
          { label: 'Name', name: 'name', type: 'string' },
          { label: 'Address', name: 'address', type: 'string' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
          { label: 'Email', name: 'email', type: 'string' }
        ],
        pharmacyFormFieldsUpdate: [
          { label: 'Name', name: 'name', type: 'string' },
          { label: 'Address', name: 'address', type: 'string' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'string' },
          { label: 'Email', name: 'email', type: 'string' }
        ],
        pharmacyFormRules: {
          name: [{ required: true, message: 'Please input the name!', trigger: 'blur' }],
          address: [{ required: true, message: 'Please input the address!', trigger: 'blur' }],
          phoneNumber: [{ required: true, message: 'Please input the phone number!', trigger: 'blur' }],
          email: [{ required: true, message: 'Please input the email!', trigger: 'blur' }]
        },
        columns: [
          { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
          { title: 'Address', dataIndex: 'address', key: 'address', width: 200 },
          { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 150 },
          { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
          { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
        ],
        pharmacyData: [] // Pharmacy data is initialized as an empty array
      };
    },
    methods: {
      async createPharmacy(formState) {
        try {
          await createPharmacy(formState); // Call the API to create a pharmacy
          await this.fetchPharmacies(); // Refresh pharmacy list
        } catch (error) {
          console.error('Failed to create pharmacy:', error);
        }
      },
      async updatePharmacy(formState) {
        try {
          await updatePharmacy(formState); // Call the API to update the pharmacy
          await this.fetchPharmacies(); // Refresh pharmacy list after updating
        } catch (error) {
          console.error('Failed to update pharmacy:', error);
        }
      },
      async fetchPharmacies() {
        try {
          const pharmacies = await getPharmacies();
          this.pharmacyData = Array.isArray(pharmacies) ? pharmacies : [];
        } catch (error) {
          console.error('Failed to fetch pharmacies:', error);
          this.pharmacyData = [];
        }
      },
      async deletePharmacy(id) {
        try {
          await deletePharmacy(id); // Call the API to delete the pharmacy
          await this.fetchPharmacies(); // Refresh pharmacy list after deleting
        } catch (error) {
          console.error('Failed to delete pharmacy:', error);
        }
      },
      refresh() {
        this.fetchPharmacies(); // Refresh the pharmacy list
      }
    },
    async mounted() {
      await this.fetchPharmacies(); // Fetch pharmacies when the component is mounted
    }
  };
  </script>
  