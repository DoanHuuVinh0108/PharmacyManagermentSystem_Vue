<template>
    <div>
        <div class="p-4 block">
            <div v-if="$store.state.roles[0] == 'Admin'" class="w-full">
                <form class="max-w-sm mx-auto">
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Chọn nhà thuốc
                    </label>
                    <select v-model="pharmacyId" id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Choose a pharmacy</option>
                        <option v-for="item in pharmacyData" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                </form>
            </div>
            <h2 class="text-base font-semibold leading-6 text-gray-900">Danh sách nhân viên đăng kí ca nhà thuốc: {{
                pharmacyName }}</h2>
            <div class="lg:grid lg:grid-cols-12 lg:gap-x-16 h-screen">

                <!-- Left side content -->
                <div class="lg:col-span-8">
                    <ol class="mt-4 divide-y divide-cyan-600 text-sm leading-6">

                        <li class="relative flex flex-col lg:flex-row lg:items-center lg:space-x-6 py-6 border-b border-gray-300 last:border-none"
                            v-for="item in listUserShift" :key="item.id">
                            <div class="flex-auto">
                                <h3 class="font-semibold text-lg">Họ và tên: {{ item.fullName }}</h3>
                                <dl class="mt-2 flex items-center space-x-6">
                                    <div class="flex items-center space-x-2">
                                        <dt class="text-gray-600">Email:</dt>
                                        <dt>{{ item.email }}</dt>
                                    </div>
                                    <div class="flex items-center space-x-2 border-l border-gray-300 pl-4">
                                        <dt class="text-gray-600">Số điện thoại:</dt>
                                        <dt>{{ item.phoneNumber }}</dt>
                                    </div>
                                    <button v-if="$store.state.roles[0] == 'Admin' || item.employeeId == $store.state.userId"  @click="handleDelete(item.employeeId, item.date)"
                                        class="flex items-center justify-center w-8 h-8 ml-4 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 duration-200"
                                        aria-label="Delete">
                                        <svg viewBox="0 0 24 24" class="w-5 h-5" stroke="currentColor"
                                            stroke-width="1.5" fill="none">
                                            <path
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                stroke-linejoin="round" stroke-linecap="round"></path>
                                        </svg>
                                    </button>
                                </dl>
                            </div>
                        </li>

                    </ol>
                </div>

                <!-- Right side calendar component -->
                <div class="lg:col-span-4">
                    <v-date-picker v-model="selectedDate" />
                    <button v-if="$store.state.roles[0] !== 'Admin'" type="button"
                        class="mt-4 w-2/4 size-10 rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="addEvent">
                        Add Event
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import { createUserShift, getUserShiftByDate,deleteUserShift } from '../services/userShiftService';
import { getAll } from '../services/pharmacyService';
import { DeleteOutlined } from '@ant-design/icons-vue';
export default {
    components: {
        'v-date-picker': DatePicker,
        DeleteOutlined,
    },
    data() {
        return {
            selectedDate: null,
            pharmacyId: 0,
            pharmacyName: '',
            listUserShift: [],
            pharmacyData: [],
        };
    },
    methods: {
        async addEvent() {
            try {
                if (!this.selectedDate) {
                    throw new Error("No date selected.");
                }

                const year = this.selectedDate.getFullYear();
                const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(this.selectedDate.getDate()).padStart(2, '0');
                const dateData = `${year}-${month}-${day}`;

                const response = await createUserShift({
                    date: dateData,
                    pharmacyId: this.pharmacyId,
                    employeeId: this.$store.state.userId,
                });
                await this.getEvent();
                console.log("Response:", response);
            } catch (error) {
                console.log("Error:", error.message);
            }
        },
        async getEvent() {
            try {
                if (!this.selectedDate) {
                    throw new Error("No date selected.");
                }

                const year = this.selectedDate.getFullYear();
                const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(this.selectedDate.getDate()).padStart(2, '0');
                const dateData = `${year}-${month}-${day}`;

                const response = await getUserShiftByDate(dateData, this.pharmacyId);
                this.listUserShift = response || [];
            } catch (error) {
                console.log("Error:", error.message);
            }
        },
        async getAllPharmacies() {
            try {
                const response = await getAll();
                this.pharmacyData = Array.isArray(response) ? response : [];
            } catch (error) {
                console.error('Failed to fetch pharmacies:', error);
                this.pharmacyData = [];
            }
        },
        async handleDelete(employeeId, date) {
            try {
                await deleteUserShift(employeeId, date, this.pharmacyId);
                await this.getEvent();
            } catch (error) {
                console.error('Failed to delete user shift:', error);
            }
        },
    },
    watch: {
        selectedDate: {
            handler: function () {
                this.getEvent();
            },
            deep: true,
        },
        pharmacyId: {
            handler: function () {
                this.getEvent();
                this.pharmacyName = this.pharmacyData.find(pharmacy => pharmacy.id == this.pharmacyId)?.name || '';
            },
            deep: true,
        },
    },
    async mounted() {
        await this.getAllPharmacies();

        if (this.$store.state.roles[0] == 'Admin') {
            this.pharmacyId = this.pharmacyData[0]?.id || '';
        } else {
            this.pharmacyId = this.$store.state.pharmacyId;
        }

        this.pharmacyName = this.pharmacyData.find(pharmacy => pharmacy.id == this.pharmacyId)?.name || '';
    },
};
</script>

<style scoped>
/* Additional styles can be added here if necessary */
</style>
