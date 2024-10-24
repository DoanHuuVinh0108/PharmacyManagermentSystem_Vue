<template>
    <a-flex :align="start" style="margin-bottom: 20px">
        <!-- Use the CreateModal component to create a new category -->
        <CreateModal objectName="Category" :formFields="categoryFormFieldsCreate" :formState="categoryFormStateCreate"
            :rules="categoryFormRulesCreate" :createObject="createCategory" @CategoryCreated="refresh" />
        <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
    </a-flex>

    <a-table :columns="columns" :data-source="categoryData" :scroll="{ x: 1500 }" :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalItems,
        onChange: handlePageChange,
    }">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'operation'">
                <div class="justify-center text-center">
                    <div class="inline-block p-2">
                        <UpdateModal objectName="Category" :formFields="categoryFormFieldsUpdate" :formState="record"
                            :rules="categoryFormRulesUpdate" :updateObject="updateCategory"
                            @CategoryUpdated="refresh" />
                    </div>
                    <div class="inline-block">
                        <DeleteModal :id="{ id: record.id }" @deleted="deleteCategory" />
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
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService';
import CreateModal from '../components/modal/createModal.vue';
import UpdateModal from '../components/modal/updateModal.vue';
import DeleteModal from '../components/modal/deleteModal.vue';


export default {
    name: 'CategoryPage',
    components: {
        CreateModal,
        UpdateModal,
        DeleteModal
    },
    data() {
        return {
            categoryFormStateCreate: {
                id: '',  // Match backend variable
                tenThuoc: '',  // Match backend variable
                gia: 0,  // Match backend variable
                hoatChat: '',  // Match backend variable
                phanLoai: '',  // Match backend variable
                nongDo: '',  // Match backend variable
                dongGoi: '',  // Match backend variable
                taDuoc: '',  // Match backend variable
                tuoiTho: '',  // Match backend variable
                congTySx: '',  // Match backend variable
                nuocSx: '',  // Match backend variable
                imageCategories: []
            },
            categoryFormFieldsCreate: [
                { label: 'ID', name: 'id', type: 'string' },
                { label: 'Tên Thuốc', name: 'tenThuoc', type: 'string' },
                { label: 'Giá', name: 'gia', type: 'number' },
                { label: 'Hoạt Chất', name: 'hoatChat', type: 'string' },
                { label: 'Phân Loại', name: 'phanLoai', type: 'string' },
                { label: 'Nồng Độ', name: 'nongDo', type: 'string' },
                { label: 'Đóng Gói', name: 'dongGoi', type: 'string' },
                { label: 'Tá Dược', name: 'taDuoc', type: 'string' },
                { label: 'Tuổi Thọ', name: 'tuoiTho', type: 'string' },
                { label: 'Công Ty Sản Xuất', name: 'congTySx', type: 'string' },
                { label: 'Nước Sản Xuất', name: 'nuocSx', type: 'string' }
            ],
            categoryFormRulesCreate: {
                id: [{ required: true, message: 'Please input the ID!', trigger: 'blur' }],
                tenThuoc: [{ required: true, message: 'Please input the medicine name!', trigger: 'blur' }],
                gia: [{ required: true, message: 'Please input the price!', trigger: 'blur' }],
                hoatChat: [{ required: true, message: 'Please input the active ingredient!', trigger: 'blur' }],
                phanLoai: [{ required: true, message: 'Please input the classification!', trigger: 'blur' }],
                nongDo: [{ required: true, message: 'Please input the concentration!', trigger: 'blur' }],
                dongGoi: [{ required: true, message: 'Please input the packaging!', trigger: 'blur' }],
                taDuoc: [{ required: true, message: 'Please input the assistant herb!', trigger: 'blur' }],
                tuoiTho: [{ required: true, message: 'Please input the shelf life!', trigger: 'blur' }],
                congTySx: [{ required: true, message: 'Please input the manufacturer!', trigger: 'blur' }],
                nuocSx: [{ required: true, message: 'Please input the country of manufacture!', trigger: 'blur' }]
            },
            categoryFormFieldsUpdate: [
                { label: 'ID', name: 'id', type: 'string' },
                { label: 'Medicine Name', name: 'medicineName', type: 'string' },
                { label: 'Price', name: 'price', type: 'number' },
                { label: 'Active Ingredient', name: 'activeIngredient', type: 'string' },
                { label: 'Classification', name: 'classification', type: 'string' },
                { label: 'Concentration', name: 'concentration', type: 'string' },
                { label: 'Packaging', name: 'packaging', type: 'string' },
                { label: 'Assistant Herb', name: 'assistantherb', type: 'string' },
                { label: 'Shelf Life', name: 'shelfLife', type: 'string' },
                { label: 'Manufacturer', name: 'manufacturer', type: 'string' },
                { label: 'Country of Manufacture', name: 'countryOfManufacture', type: 'string' }
            ],
            categoryFormRulesUpdate: {
                id: [{ required: true, message: 'Please input the ID!', trigger: 'blur' }],
                medicineName: [{ required: true, message: 'Please input the medicine name!', trigger: 'blur' }],
                price: [{ required: true, message: 'Please input the price!', trigger: 'blur' }],
                activeIngredient: [{ required: true, message: 'Please input the active ingredient!', trigger: 'blur' }],
                classification: [{ required: true, message: 'Please input the classification!', trigger: 'blur' }],
                concentration: [{ required: true, message: 'Please input the concentration!', trigger: 'blur' }],
                packaging: [{ required: true, message: 'Please input the packaging!', trigger: 'blur' }],
                assistantherb: [{ required: true, message: 'Please input the assistant herb!', trigger: 'blur' }],
                shelfLife: [{ required: true, message: 'Please input the shelf life!', trigger: 'blur' }],
                manufacturer: [{ required: true, message: 'Please input the manufacturer!', trigger: 'blur' }],
                countryOfManufacture: [{ required: true, message: 'Please input the country of manufacture!', trigger: 'blur' }]
            },
            columns: [
                { title: 'ID', dataIndex: 'id', key: 'id', width: 150 },
                { title: 'Tên thuốc', dataIndex: 'medicineName', key: 'medicineName', width: 200 },
                { title: 'Giá', dataIndex: 'price', key: 'price', width: 100 },
                { title: 'Hoạt chất', dataIndex: 'activeIngredient', key: 'activeIngredient', width: 150 },
                { title: 'Phân loại', dataIndex: 'classification', key: 'classification', width: 150 },
                { title: 'Nồng độ', dataIndex: 'concentration', key: 'concentration', width: 150 },
                { title: 'Đóng gói', dataIndex: 'packaging', key: 'packaging', width: 150 },
                { title: 'Tá dược', dataIndex: 'assistantherb', key: 'assistantherb', width: 150 },
                { title: 'Tuổi thọ', dataIndex: 'shelfLife', key: 'shelfLife', width: 150 },
                { title: 'Công ty sản xuất', dataIndex: 'manufacturer', key: 'manufacturer', width: 150 },
                { title: 'Nước sản xuất', dataIndex: 'countryOfManufacture', key: 'countryOfManufacture', width: 150 },
                { title: 'Action', key: 'operation', fixed: 'right', width: 150 }
            ],
            categoryData: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0
        };
    },
    methods: {
        async createCategory(formState) {
            try {
                await createCategory(formState); // Call the API to create a category
                await this.fetchCategories(); // Refresh category list
            } catch (error) {
                console.error('Failed to create category:', error);
            }
        },
        async updateCategory(formState) {
            try {
                await updateCategory(formState); // Call the API to update the category
                await this.fetchCategories(); // Refresh category list after updating
            } catch (error) {
                console.error('Failed to update category:', error);
            }
        },
        async fetchCategories() {
            try {
                const response = await getCategories({
                    page: this.currentPage,
                    pageSize: this.pageSize,
                });
                this.categoryData = Array.isArray(response.items) ? response.items : [];
                this.totalItems = response.totalItems;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                this.categoryData = [];
            }
        },
        async deleteCategory(id) {
            try {
                await deleteCategory(id); // Call the API to delete the category
                await this.fetchCategories(); // Refresh category list after deleting
            } catch (error) {
                console.error('Failed to delete category:', error);
            }
        },
        refresh() {
            this.fetchCategories(); // Refresh the category list
        },
        async handlePageChange(page) {
            this.currentPage = page;  // Update the current page
            await this.fetchCategories();  // Fetch the new page of data
        },
    },
    async mounted() {
        await this.fetchCategories(); // Fetch categories when the component is mounted
    }
};
</script>