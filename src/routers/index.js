// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../components/layout/index.vue';
import ProductPage from '../pages/productPage.vue';
import UserPage from '../pages/userPage.vue';
import DoctorPage from '../pages/doctorPage.vue';
import PharmacyPage from '../pages/pharmacyPage.vue';
import CategoryPage from '../pages/categoryPage.vue';
import CreateOrderPage from '../pages/createOrderPage.vue';
import LoginPage from '../pages/loginPage.vue';
import SalaryPage from '../pages/salaryPage.vue';
const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: 'products',
                component: ProductPage
            },
            {
                path: 'users',
                component: UserPage
            },
            {
                path: 'doctors',
                component: DoctorPage
            },
            {
                path: 'pharmacies',
                component: PharmacyPage
            },
            {
                path: 'categories',
                component: CategoryPage
            },
            {
                path: 'createOrder',
                component: CreateOrderPage
            },
            {
                path: 'salaries',
                component: SalaryPage
            }

        ]
    },
    {
        path: '/login',
        component: LoginPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
