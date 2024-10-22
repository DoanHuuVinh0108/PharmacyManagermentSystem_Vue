<template>
    <div>
        <div id="app">
            <!-- Search Section -->
            <div class="flex p-2">
                <div class="min-h-screen">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Bán hàng</h2>

                    <!-- find medicine -->
                    <div class="relative h-2/4 w-96 max-w-lg">
                        <form @submit.prevent>
                            <div
                                class="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20">
                                <input type="text" v-model="inputValue" @input="onInputChange"
                                    class="block w-full flex-1 py-2 px-3 focus:outline-none"
                                    placeholder="Tìm kiếm thuốc..." />
                                <span
                                    class="m-1 z-auto inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                                    <svg class="text-white" width="32" height="32" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z" />
                                    </svg>
                                </span>
                            </div>
                        </form>


                        <div class="absolute z-auto mt-2 w-full overflow-hidden rounded-md bg-white">
                            <div v-for="(suggestion, index) in suggestions" :key="index" @click="addToCart(suggestion)"
                                class="cursor-pointer py-2 px-3 hover:bg-slate-100 border-2 border-blue-400">
                                <p class="text-sm font-medium text-gray-600">{{ suggestion.medicineName }}</p>
                                <p class="text-sm text-gray-500"> {{formattedPrice(suggestion.price ) }} </p>
                            </div>
                        </div>
                    </div>
                    <!-- find by user -->
                    <div class="relative h-2/4 w-96 max-w-lg">
                        <form @submit.prevent>
                            <div
                                class="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20">
                                <input type="text" v-model="inputUserValue" @input="onUserInputChange"
                                    class="block w-full flex-1 py-2 px-3 focus:outline-none"
                                    placeholder="Tìm kiếm khách hàng..." />
                                <span
                                    class="m-1 z-10 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                                    <svg class="text-white" width="32" height="32" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z" />
                                    </svg>
                                </span>
                            </div>
                        </form>


                        <div class="absolute z-50 mt-2 w-full overflow-hidden rounded-md bg-white">
                            <div v-for="(suggestion, index) in userSuggestions" :key="index"
                                @click="addToUser(suggestion)"
                                class="cursor-pointer py-2 px-3 hover:bg-slate-100 border-2 border-blue-400">
                                <p class="text-sm font-medium text-gray-600">{{ suggestion.phoneNumber }}</p>
                                <p class="text-sm text-gray-500">Tên: {{ suggestion.fullName }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="bg-white antialiased dark:bg-gray-900 ">
                    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

                        <div>
                            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div class="space-y-6">
                                    <!-- Cart Items -->
                                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Đơn thuốc</h2>

                                    <div v-for="(item, index) in cart.createOrderDetailRequests" :key="index"
                                        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div
                                            class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <p class="text-base font-medium text-gray-900 dark:text-white">
                                                    {{ item.medicineName }}
                                                </p>
                                                <p class="text-base text-gray-500">
                                                    {{ formattedPrice(item.price) }}
                                                </p>

                                                <!-- Batch Number Selection -->
                                                <div>
                                                    <label for="batchNumber"
                                                        class="block text-sm font-medium text-gray-700 dark:text-white">
                                                        Select Batch Number
                                                    </label>
                                                    <select v-model="item.batchNumber"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                                        <option value="">Select Batch Number</option>
                                                        <option v-for="number in batchNumbers[item.categoryId]"
                                                            :key="number" :value="number">
                                                            {{ number }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <!-- Medicine ID Selection -->
                                                <div>
                                                    <label for="medicineId"
                                                        class="block text-sm font-medium text-gray-700 dark:text-white">
                                                        Select Medicine ID
                                                    </label>
                                                    <select v-model="item.medicineId" @change="findQuality(item.batchNumber, item.categoryId, item.medicineId,index)"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                                        <option value="">Select Medicine ID</option>
                                                        <option 
                                                            v-for="id in medicineIds[`${item.categoryId}-${item.batchNumber}`] || []"
                                                            :key="id" :value="id">
                                                            {{ id }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- Quantity Controls -->
                                           
                                            <div  v-if=" item.batchNumber && item.medicineId" class="flex items-center justify-between md:order-3 md:justify-end">
                                                
                                                <div class="flex items-center">
                                                    <button @click="updateQuantity(index, item.quantity - 1)"
                                                        class="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100">
                                                        -
                                                    </button>
                                                    <input type="" v-model.number="item.quantity" disabled
                                                        class="w-10 text-center border-0 bg-transparent" min="1">
                                                    <button @click="updateQuantity(index, item.quantity + 1)" 
                                                     class="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100">
                                                        +
                                                    </button>
                                                </div>
                                                <div class="text-end md:w-32">
                                                    <p class="text-base font-bold text-gray-900 dark:text-white">
                                                        {{ formattedPrice(item.price * item.quantity) }}
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- Remove Button -->
                                            <button @click="removeItem(index)"
                                                class="text-red-600 hover:underline inline-flex items-center text-sm font-medium">
                                                <svg class="me-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"
                                                        d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Summary -->
                            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">

                            </div>
                        </div>
                    </div>
                </section>
                <div class="mx-auto max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div
                        class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <p class="text-xl font-semibold text-gray-900 dark:text-white">Tổng đơn</p>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tên khách hàng
                                    </dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">{{ cart.customerName
                                        }}</dd>
                                </dl>
                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tổng tiền hàng
                                    </dt>
                                    <dd class="text-base font-medium text-gray-900 dark:text-white">{{
                                        formattedPrice(total()) }}</dd>
                                </dl>

                                <dl class="flex items-center justify-between gap-4">
                                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Khách thanh toán
                                    </dt>
                                    <a-input style="text-align:right;" class="text-base font-medium text-gray-900 dark:text-white flex-auto" id="inputNumber" addonAfter v-model:value="customerMoney">                                   
                                    </a-input>
                            
                            </dl>




                            <dl class="flex items-center justify-between gap-4">
                                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tiền thừa trả
                                    khách</dt>
                                <dd class="text-base font-medium text-gray-900 dark:text-white">{{ formattedPrice(saveMoney()) }}</dd>
                            </dl>


                        </div>

                        
                    </div>


                    <div class="flex items-center justify-center ">
                        <div class="relative group">
                            <button @click="addOrder" type="button"
                                class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                <span
                                    class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                                <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div class="relative z-10 flex items-center space-x-2">
                                        <span class="transition-all duration-500 group-hover:translate-x-1">Thanh
                                            toán</span>
                                        <svg class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path clip-rule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fill-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    </div>
    </div>
</template>

<script>


import { findByNameCategory } from '../services/categoryService';
import { getByCategory, getBatchNumberAndCategory,getQuality } from '../services/medicineService';
import { findByPhoneNumber } from '../services/userService';
import { createOrder } from "../services/orderService";


export default {
    name: 'CreateOrderPage',
    data() {
        return {
            inputValue: '',
            suggestions: [],
            debounceTimeout: null,
            cart: {
                pharmacyId: 1,
                customerId: null,
                customerName: null,
                employeeId: "f22f1fb9-d5b8-420f-90f4-0bc0ee5362c8",
                prescriptionId: null,
                status: "Completed",
                createOrderDetailRequests: [
                ],
            },
            batchNumbers: {},
            medicineIds: {},
            userSuggestions: [],
            userDebounceTimeout: null,
            inputUserValue: '',
            user: '',
            customerMoney: 0

        };
    },
    methods: {
        async onInputChange() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            this.debounceTimeout = setTimeout(async () => {
                if (this.inputValue.trim()) {
                    await this.fetchSuggestions(this.inputValue);
                } else {
                    this.suggestions = [];
                }
            }, 300);
        },
        async onUserInputChange() {
            if (this.userDebounceTimeout) {
                clearTimeout(this.userDebounceTimeout);
            }

            this.userDebounceTimeout = setTimeout(async () => {
                if (this.inputUserValue.trim()) {
                    await this.fetchUserSuggestions(this.inputUserValue);
                } else {
                    this.userSuggestions = [];
                }
            }, 300);
        },
        async addToUser(suggestion) {
            this.cart.customerId = suggestion.id;
            this.cart.customerName = suggestion.fullName;
            this.inputUserValue = '';
            this.userSuggestions = [];
        },
        async fetchSuggestions(query) {
            try {
                const response = await findByNameCategory(query);
                this.suggestions = response;
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                this.suggestions = [];
            }
        },
        async fetchUserSuggestions(query) {
            try {
                const response = await findByPhoneNumber(query);
                this.userSuggestions = response;
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                this.userSuggestions = [];
            }
        },
        async addToCart(suggestion) {
            // Add item to cart
            this.cart.createOrderDetailRequests.push({
                medicineId: null,
                quantity: 1,
                price: suggestion.price,
                categoryId: suggestion.id,
                batchNumber: null,
                medicineName: suggestion.medicineName,
                maxQuantity: 1
            });

            // Fetch batch numbers for the newly added item
            await this.fetchBatchNumber(suggestion.id);
            this.inputValue = '';
            this.suggestions = [];
        },

        updateQuantity(index, newQuantity) {
            console.log("Updating quantity:",  this.cart.createOrderDetailRequests[index].maxQuantity);
            if (newQuantity > 0 && newQuantity <= this.cart.createOrderDetailRequests[index].maxQuantity) {
                this.cart.createOrderDetailRequests[index].quantity = newQuantity;
            }
        },
        removeItem(index) {
            this.cart.createOrderDetailRequests.splice(index, 1);
        },
        getCartTotal() {
            return this.cart.createOrderDetailRequests.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },
        async fetchBatchNumber(categoryId) {
            try {
                const response = await getByCategory(categoryId);
                // Direct assignment works in Vue 3
                this.batchNumbers[categoryId] = response;
            } catch (error) {
                console.error("Error fetching medicine data:", error);
            }
        },
        async fetchMedicineId(batchNumber, categoryId) {
            if (!batchNumber || !categoryId) return;

            try {
                const response = await getBatchNumberAndCategory(batchNumber, categoryId);
                const key = `${categoryId}-${batchNumber}`;
                this.medicineIds = { ...this.medicineIds, [key]: response }; // Force reactivity update
                return response;
            } catch (error) {
                console.error("Error fetching medicine data:", error);
                return [];
            }
        },
        async onBatchNumberChange(item) {
            item.medicineId = null; // Reset medicineId when batch number changes
            if (item.batchNumber && item.categoryId) {
                await this.fetchMedicineId(item.batchNumber, item.categoryId);
            }
        },
        async addOrder() {
            try {
                console.log("Creating order:", this.cart);
                const response = await createOrder(this.cart);
                this.cart.createOrderDetailRequests = [];
                console.log("Order created successfully:", response);
            } catch (error) {
                console.error("Error creating order:", error);
            }
        },
        formattedPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        total() {
            return this.cart.createOrderDetailRequests.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },
        saveMoney() {
            return this.customerMoney - this.total();
        },
        async findQuality(batchNumber, categoryId, medicineId,index) {
           try {
                const response =await getQuality(batchNumber, categoryId, medicineId);
                this.cart.createOrderDetailRequests[index].maxQuantity = response;
            } catch (error) {
                console.error("Error fetching quality:", error);
            }
        }
    },
    watch: {
        'cart.createOrderDetailRequests': {
            immediate: true,
            handler(newItems) {
                // Fetch batch numbers for all items in cart
                newItems.forEach(item => {
                    if (item.categoryId && !this.batchNumbers[item.categoryId]) {
                        this.fetchBatchNumber(item.categoryId);
                    }
                });
            }
        },
        'cart.createOrderDetailRequests': {
            deep: true,
            handler(items) {
                items.forEach(async (item) => {
                    if (item.batchNumber && item.categoryId) {
                        await this.fetchMedicineId(item.batchNumber, item.categoryId);
                    }
                });
            }
        },
        'cart.createOrderDetailRequests': {
            deep: true,
            handler(items) {
                items.forEach(async (item) => {
                    if (item.batchNumber && item.categoryId) {
                        // Reset medicineId when batch number changes
                        item.medicineId = null;
                        await this.fetchMedicineId(item.batchNumber, item.categoryId);
                    }
                });
            }
        },
        'cart.createOrderDetailRequests': {
            deep: true,
            handler(items) {
                items.forEach(item => {
                    if (item.batchNumber && item.categoryId) {
                        this.fetchMedicineId(item.batchNumber, item.categoryId);
                    }
                });
            }
        }
    }
};
</script>
