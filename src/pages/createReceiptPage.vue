<template>
    <div class="flex min-h-screen bg-gray-50 p-6">
        <div class="container mx-auto flex space-x-6">
            <!-- Left Section - Input Form -->
            <div class="w-3/5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 class="mb-6 text-xl font-semibold text-gray-800">Nhập kho</h2>

                <!-- Search Section -->
                <div class="mb-6 w-full max-w-lg">
                    <form @submit.prevent>
                        <div class="flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                            <input type="text" :value="searchQuery" @input="handleSearchInput"
                                class="w-full flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Tìm kiếm danh mục..." />
                            <button
                                class="flex items-center bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
                                <svg class="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    <!-- Search Suggestions -->
                    <div v-if="searchSuggestions.length > 0"
                        class="absolute z-50 mt-2 w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                        <div v-for="suggestion in searchSuggestions" :key="suggestion.id"
                            @click="addCategory(suggestion)"
                            class="cursor-pointer border-b border-gray-100 p-3 hover:bg-gray-50">
                            <p class="text-sm font-medium text-gray-800">{{ suggestion.medicineName }}</p>
                            <p class="text-sm text-gray-600">{{ formatPrice(suggestion.price) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Inventory Items -->
                <div class="space-y-6">
                    <div v-for="(category, index) in inventoryItems" :key="category.id || index"
                        class="rounded-lg border border-gray-200 p-4">
                        <!-- Category Fields -->
                        <div class="space-y-4">
                            <div>
                                <label class="mb-1 block text-sm font-medium text-gray-700">Tên thuốc:</label>
                                <input :value="category.medicineName" type="text"
                                    class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    readonly />
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-gray-700">Số lượng:</label>
                                <input :value="category.quantity"
                                    @input="updateCategoryField(index, 'quantity', $event.target.value)" type="number"
                                    class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập số lượng" />
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-gray-700">Đơn vị tính:</label>
                                <input :value="category.status"
                                    @input="updateCategoryField(index, 'status', $event.target.value)" type="text"
                                    class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập đơn vị tính" />
                            </div>

                            <div>
                                <label class="mb-1 block text-sm font-medium text-gray-700">Giá:</label>
                                <input :value="category.price"
                                    @input="updateCategoryField(index, 'price', $event.target.value)" type="number"
                                    class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Nhập giá" />
                            </div>

                            <!-- Lots Section -->
                            <div class="space-y-4">
                                <div v-for="(lot, lotIndex) in category.lots" :key="lot.tempId || lotIndex"
                                    class="ml-4 rounded-lg bg-gray-50 p-4">
                                    <label class="mb-1 block text-sm font-medium text-gray-700">Số lô:</label>
                                    <input :value="lot.id"
                                        @input="updateLotField(index, lotIndex, 'id', $event.target.value)" type="text"
                                        class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Nhập số lô" />

                                    <!-- Manufacturing Date Field -->
                                    <div class="mt-3">
                                        <label class="mb-1 block text-sm font-medium text-gray-700">Ngày sản xuất:</label>
                                        <input :value="lot.manufacturingDate"
                                            @input="updateLotField(index, lotIndex, 'manufacturingDate', $event.target.value)"
                                            type="date"
                                            class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                                    </div>

                                    <!-- Expiry Date Field -->
                                    <div class="mt-3">
                                        <label class="mb-1 block text-sm font-medium text-gray-700">Hạn sử dụng:</label>
                                        <input :value="lot.expiryDate"
                                            @input="updateLotField(index, lotIndex, 'expiryDate', $event.target.value)"
                                            type="date"
                                            class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                                    </div>

                                    <!-- Products -->
                                    <div v-for="(product, prodIndex) in lot.products" :key="product.tempId || prodIndex"
                                        class="mt-3 ml-4">
                                        <label class="mb-1 block text-sm font-medium text-gray-700">Product ID:</label>
                                        <input :value="product.id"
                                            @input="updateProductField(index, lotIndex, prodIndex, 'id', $event.target.value)"
                                            type="text"
                                            class="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            placeholder="Nhập Product ID" />
                                    </div>

                                    <button @click="addProduct(index, lotIndex)"
                                        class="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        + Thêm sản phẩm
                                    </button>
                                </div>

                                <div class="flex space-x-4">
                                    <button @click="addLot(index)"
                                        class="text-sm font-medium text-green-600 hover:text-green-500">
                                        + Thêm lô
                                    </button>
                                    <button @click="removeCategory(index)"
                                        class="text-sm font-medium text-red-600 hover:text-red-500">
                                        Xóa danh mục
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="sendData"
                    class="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Nhập dữ liệu
                </button>
            </div>

            <!-- Right Section (unchanged) -->
            <div class="w-2/5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 class="mb-6 text-xl font-semibold text-gray-800"></h2>
                <div class="space-y-4">
                    <div class="flex justify-between border-b border-gray-100 pb-3">
                        Người nhập: {{ data.fullName }}
                    </div>
                    <div class="w-full">
                        <form class="max-w-sm mx-auto">
                            <label for="pharmacy" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Chọn nhà thuốc
                            </label>
                            <select v-model="data.pharmacyId" id="pharmacy"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>Choose a pharmacy</option>
                                <option v-for="item in pharmacyData" :key="item.id" :value="item.id">{{ item.name }}
                                </option>
                            </select>
                        </form>
                    </div>
                    <div class="w-full">
                        <form class="max-w-sm mx-auto">
                            <label for="supplier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Chọn nhà cung cấp
                            </label>
                            <select v-model="data.supplierId" id="supplier"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>Choose a supplier</option>
                                <option v-for="item in supplierData" :key="item.id" :value="item.id">{{ item.name }}
                                </option>
                            </select>
                        </form>
                    </div>
                    <h2 class="mb-6 text-xl font-semibold text-gray-800">Tổng giá từng danh mục</h2>
                    <div v-for="category in inventoryItems" :key="category.id"
                        class="flex justify-between border-b border-gray-100 pb-3">
                        <span class="font-medium text-gray-700">{{ category.medicineName }}</span>
                        <span class="text-gray-900">{{ formatPrice(calculateCategoryTotal(category)) }}</span>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { findByNameCategory } from '../services/categoryService';
import { useStore } from 'vuex';
import { getAll } from '../services/pharmacyService';
import { getAll as getSupplier } from '../services/supplierService';
import { addReceipt } from '../services/receiptService';

export default {
    setup() {
        const searchQuery = ref('');
        const store = useStore();
        const searchSuggestions = ref([]);
        const inventoryItems = ref([]);
        const pharmacyData = ref([]);
        const supplierData = ref([]);
        const data = ref({
            pharmacyId: store.state.pharmacyId,
            supplierId: '',
            employeeId: store.state.userId,
            fullName: store.state.fullName,
        });

        // Initialize both pharmacy and supplier data
        const initData = async () => {
            try {
                const [pharmacyResponse, supplierResponse] = await Promise.all([
                    getAll(),
                    getSupplier()
                ]);
                pharmacyData.value = pharmacyResponse;
                supplierData.value = supplierResponse;
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.message.includes('pharmacy')) {
                    pharmacyData.value = [];
                }
                if (error.message.includes('supplier')) {
                    supplierData.value = [];
                }
            }
        };

        onMounted(() => {
            initData();
        });

        let debounceTimeout = null;

        const handleSearchInput = (event) => {
            searchQuery.value = event.target.value;
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            debounceTimeout = setTimeout(async () => {
                if (searchQuery.value.trim()) {
                    await fetchSuggestions(searchQuery.value);
                } else {
                    searchSuggestions.value = [];
                }
            }, 300);
        };

        const fetchSuggestions = async (query) => {
            try {
                const response = await findByNameCategory(query);
                searchSuggestions.value = response;
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                searchSuggestions.value = [];
            }
        };

        const addCategory = (suggestion) => {
            inventoryItems.value.push({
                id: suggestion.id,
                medicineName: suggestion.medicineName,
                status: '',
                quantity: '',
                price: suggestion.price,
                lots: [
                    {
                        id: '',
                        tempId: Date.now(),
                        manufacturingDate: '',
                        expiryDate: '',
                        products: [{ id: '', tempId: Date.now() }],
                    },
                ],
            });
            searchQuery.value = '';
            searchSuggestions.value = [];
        };

        const removeCategory = (index) => {
            inventoryItems.value.splice(index, 1);
        };

        const addLot = (categoryIndex) => {
            inventoryItems.value[categoryIndex].lots.push({
                id: '',
                tempId: Date.now(),
                manufacturingDate: '',
                expiryDate: '',
                products: [{ id: '', tempId: Date.now() }],
            });
        };

        const addProduct = (categoryIndex, lotIndex) => {
            inventoryItems.value[categoryIndex].lots[lotIndex].products.push({
                id: '',
                tempId: Date.now(),
            });
        };

        const updateCategoryField = (categoryIndex, field, value) => {
            inventoryItems.value[categoryIndex][field] = value;
        };

       const updateLotField = (categoryIndex, lotIndex, field, value) => {
            inventoryItems.value[categoryIndex].lots[lotIndex][field] = value;
        };

        const updateProductField = (categoryIndex, lotIndex, productIndex, field, value) => {
            inventoryItems.value[categoryIndex].lots[lotIndex].products[productIndex][field] = value;
        };

        const calculateCategoryTotal = (category) => {
            return (category.quantity * category.price) || 0;
        };

        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        };

        const sendData = async () => {
            // Validate required fields
            if (!data.value.pharmacyId) {
                alert('Vui lòng chọn nhà thuốc');
                return;
            }
            if (!data.value.supplierId) {
                alert('Vui lòng chọn nhà cung cấp');
                return;
            }
            if (inventoryItems.value.length === 0) {
                alert('Vui lòng thêm ít nhất một danh mục');
                return;
            }

            // Validate each category
            const invalidCategories = inventoryItems.value.filter(category => 
                !category.quantity || !category.status || !category.price ||
                category.lots.some(lot => 
                    !lot.id || lot.products.some(product => !product.id)
                )
            );

            if (invalidCategories.length > 0) {
                alert('Vui lòng điền đầy đủ thông tin cho tất cả các danh mục');
                return;
            }

            const formattedData = {
                ...data.value,
                categories: inventoryItems.value.map(category => ({
                    id: category.id,
                    medicineName: category.medicineName,
                    status: category.status,
                    quantity: parseFloat(category.quantity),
                    price: parseFloat(category.price),
                    lots: category.lots.map(lot => ({
                        id: lot.id,
                        manufacturingDate: lot.manufacturingDate,
                        expiryDate: lot.expiryDate,
                        products: lot.products.map(product => ({
                            id: product.id
                        }))
                    }))
                }))
            };

            try {
                // Here you would add your API call to save the data
                console.log('Sending formatted data:', formattedData);
                // await yourApiService.saveInventory(formattedData);
                alert('Dữ liệu đã được lưu thành công');
                await addReceipt(formattedData);
                // Reset form after successful save
                inventoryItems.value = [];
                data.value.supplierId = '';
            } catch (error) {
                console.error('Error saving data:', error);
                alert('Có lỗi xảy ra khi lưu dữ liệu');
            }
        };

        return {
            searchQuery,
            searchSuggestions,
            inventoryItems,
            handleSearchInput,
            addCategory,
            removeCategory,
            addLot,
            addProduct,
            updateCategoryField,
            updateLotField,
            updateProductField,
            calculateCategoryTotal,
            formatPrice,
            sendData,
            data,
            pharmacyData,
            supplierData
        };
    },
};
</script>