<template>
  <div>
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Tổng quan</a>
        <a href="" class="text-sm font-semibold leading-6 text-gray-900">
          <router-link to="/createOrder"> Bán hàng</router-link>
        </a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Hóa đơn</a>

        <!-- Quản lý kho -->
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Quản lý kho
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product1" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <!-- doi tac -->
       <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Đối tác
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product2" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Số quỹ</a>
        <!-- báo cáo -->
       <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Báo cáo
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product3" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <!-- Nhân sự -->
       <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Nhân sự
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product4" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <!-- Danh mục -->
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Danh mục
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product5" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <!-- Quản trị -->
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Quản trị
            <span class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': open }">&#x25BC;</span>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              @click="handlePanelClick">
              <div class="p-4">
                <div v-for="item in product6" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                  @click="navigateTo(item.href)">
                  <div class="flex-auto">
                    <a class="block font-semibold text-gray-900 hover:text-gray-600">
                      {{ item.name }}
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>




  </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'

const router = useRouter()
const MenuOpen1 = ref(false)

// Navigation handler
const navigateTo = (route) => {
  if (route) {
    router.push({ path: `/${route}` })
  }
}

// Panel click handler
const handlePanelClick = (event) => {
  // Prevent panel from closing when clicking inside
  event.stopPropagation()
}

// Your existing product arrays remain the same
const product1 = [
  { name: 'Nhập hàng', description: '', href: 'createReceipt' },
  {name: 'Thuốc', description: '', href: 'products'},
]

const product2 = [
  { name: 'Doctor', description: '', href: 'doctors' }
]

const product3 = [
  { name: 'ttt', description: '', href: '#' },

]

const product4 = [
  { name: 'Quản lý người dùng', description: '', href: 'users' },
  {name: 'Quản lý lương', description: '', href: 'salaries'},
]

const product5 = [
  { name: 'Danh mục thuốc', description: '', href: 'categories' }
]
const product6 = [
  { name: 'Quản lý nhà thuốc', description: '', href: 'pharmacies' },
  {name: 'Quản lý lịch trình', description: '', href: 'shifts'},
  {name: 'Đăng ký lịch', description: '', href: 'registerSchedule'},
]


// ... rest of your product arrays remain the same
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>