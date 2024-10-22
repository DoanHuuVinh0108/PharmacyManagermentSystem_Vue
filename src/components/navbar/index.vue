<template>
    <div>
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Tổng quan</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Bán hàng</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Hóa đơn</a>
          <!-- quan ly kho -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Quản lý kho
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product1" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
             <!-- doi tac -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Đối tác
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product2" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Số quỹ</a>
          <!-- báo cáo -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Báo cáo
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product3" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- Nhân sự -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Nhân sự
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product4" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- Danh mục -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
             Danh mục
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -right-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product5" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- Quản trị -->
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Quản trị
              <span class="h-5 w-5 text-gray-400">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
            </PopoverButton>
  
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute -right-8 top-full z-10 mt-3 w-screen max-w-36 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in product6" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
       
      </nav>
      <Dialog class="lg:hidden" @close="MenuOpen1 = false" :open="MenuOpen1">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="MenuOpen1 = false">
              <span class="sr-only">Close menu</span>
              <span class="h-6 w-6">&times;</span> <!-- Replaced XMarkIcon with a simple 'X' -->
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                  <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Tổng quan
                    <span :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']">&#x25BC;</span> <!-- Replaced ChevronDownIcon with a down arrow symbol -->
                  </DisclosureButton>
                </Disclosure>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>   
  
    </div>
</template>

<script setup>
import { ref } from 'vue'
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

const product1 = [
  { name: 'Analytics', description: '', href: '#' },
  { name: 'Engagement', description: '', href: '#' },
  { name: 'Security', description: '', href: '#' },
  { name: 'Integrations', description: '', href: '#' },
  { name: 'Automations', description: '', href: '#' },
]

const product2 = [
  { name: 'aaaaa', description: '', href: '#' },
  { name: 'bbbbb', description: '', href: '#' },
  { name: 'ccccc', description: '', href: '#' },
  { name: 'dddd', description: '', href: '#' },
  { name: 'eeeee', description: '', href: '#' },
]

const product3 = [
  { name: 'ttt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
]

const product4 = [
  { name: 'ttt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
]

const product5 = [
  { name: 'Hàng hóa', description: '', href: '#' },
  { name: 'Bảng giá', description: '', href: '#' },
  { name: 'Đơn thuốc', description: '', href: '#' },
  { name: 'Phiếu nhập', description: '', href: '#' },
  { name: 'Danh mục', description: '', href: '#' },
]
const product6 = [
  { name: 'ttt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
  { name: 'tt', description: '', href: '#' },
]

const MenuOpen1 = ref(false)

</script>

