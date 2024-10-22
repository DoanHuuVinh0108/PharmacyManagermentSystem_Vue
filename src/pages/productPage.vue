<template>
  <a-flex :align="start" style="margin-bottom: 20px">
    <!-- Use the CreateModal component to create a new product -->
    <CreateModal objectName="Product" :formFields="productFormFieldsCreate" :formState="productFormState"
      :rules="productFormRules" :createObject="createProduct" @ProductCreated="refresh" />
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="productData" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <div class="justify-center  text-center">
          <div class="inline-block p-2" >
            <UpdateModal objectName="Product" :formFields="productFormFieldsUpdate" :formState="record"
            :rules="productFormRules" :updateObject="updateProduct" @ProductUpdated="refresh" />
          </div>
          <div class="inline-block">
            <DeleteModal :id="{
            id: record.id,
            batchNumber: record.batchNumber,
            categoryId: record.categoryId
          }" @deleted="deleteProduct" />
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
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/productService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';
export default {
  name: 'ProductTable',
  components: {
    CreateModal,
    UpdateModal,
    DeleteModal
  },
  data() {
    return {
      productFormState: {
        id: '', // Include the id field for both creating and updating products
        batchNumber: '',
        manufacturingDate: '',
        expiryDate: '',
        quantity: 0,
        status: '',
        categoryId: '',
        pharmacyId: ''
      },
      productFormFieldsCreate: [
        { label: 'ID', name: 'id', type: 'string'}, // ID field is disabled for new products
        { label: 'Batch Number', name: 'batchNumber', type: 'string' },
        { label: 'Manufacturing Date', name: 'manufacturingDate', type: 'date' },
        { label: 'Expiry Date', name: 'expiryDate', type: 'date' },
        { label: 'Quantity', name: 'quantity', type: 'int' },
        { label: 'Đơn vị tính', name: 'status', type: 'string' },
        { label: 'Category ID', name: 'categoryId', type: 'string' },
        { label: 'Pharmacy ID', name: 'pharmacyId', type: 'int' }
      ],
      productFormFieldsUpdate: [
        { label: 'ID', name: 'id', type: 'string', disabled: true }, // ID field is disabled for new products
        { label: 'Batch Number', name: 'batchNumber', type: 'string', disabled: true },
        { label: 'Manufacturing Date', name: 'manufacturingDate', type: 'date' },
        { label: 'Expiry Date', name: 'expiryDate', type: 'date' },
        { label: 'Quantity', name: 'quantity', type: 'int' },
        { label: 'Đơn vị tính', name: 'status', type: 'string' },
        { label: 'Category ID', name: 'categoryId', type: 'string', disabled: true },
        { label: 'Pharmacy ID', name: 'pharmacyId', type: 'int' }
      ],
      productFormRules: {
        id: [{ required: true, message: 'Please input the ID!', trigger: 'blur' }],
        batchNumber: [{ required: true, message: 'Please input the batch number!', trigger: 'blur' }],
        manufacturingDate: [{ required: true, message: 'Please input the manufacturing date!', trigger: 'blur' }],
        expiryDate: [{ required: true, message: 'Please input the expiry date!', trigger: 'blur' }],
        quantity: [{ required: true, message: 'Please input the quantity!', trigger: 'blur' }],
        status: [{ required: true, message: 'Please input the unit!', trigger: 'blur' }],
        categoryId: [{ required: true, message: 'Please input the category ID!', trigger: 'blur' }],
        pharmacyId: [{ required: true, message: 'Please input the pharmacy ID!', trigger: 'blur' }]
      },
      columns: [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
        { title: 'Batch Number', dataIndex: 'batchNumber', key: 'batchNumber', width: 150 },
        { title: 'Manufacturing Date', dataIndex: 'manufacturingDate', key: 'manufacturingDate', width: 150 },
        { title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate', width: 150 },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: 100 },
        { title: 'Đơn vị tính', dataIndex: 'status', key: 'status', width: 100 },
        { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId', width: 150 },
        { title: 'Pharmacy ID', dataIndex: 'pharmacyId', key: 'pharmacyId', width: 150 },
        { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
      ],
      productData: [] // Product data is initialized as an empty array
    };
  },
  methods: {
    async createProduct(formState) {
      try {
        await createProduct(formState); // Call the API to create a product
        await this.fetchProducts(); // Refresh product list
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    },
    async updateProduct(formState) {
      try {
        await updateProduct(formState); // Call the API to update the product
        await this.fetchProducts(); // Refresh product list after updating
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    },
    async fetchProducts() {
      try {
        const products = await getProducts();
        this.productData = Array.isArray(products) ? products : [];
      } catch (error) {
        console.error('Failed to fetch products:', error);
        this.productData = [];
      }
    },
    async deleteProduct(id) {
      try {
        console.log("day la delete", id);
        await deleteProduct(id); // Call the API to delete the product
        await this.fetchProducts(); // Refresh product list after deleting
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    },
    refresh() {
      this.fetchProducts(); // Refresh the product list
    }
  },
  async mounted() {
    await this.fetchProducts(); // Fetch products when the component is mounted
  }
};
</script>
