<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between lg:pr-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-20 w-auto"
            src="/src/assets/HV.png"
            alt=""
          />
        </a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></a
        >
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <span class="h-6 w-6">&#9776;</span>
          <!-- Replaced Bars3Icon with a basic hamburger menu icon -->
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup></script>
<style scoped>
header{
    background-color: #f8f9fa;
    text-align: center;
    border-top: 1px solid #e7e7e7;
    margin: 0;
}
header .container {
    max-width: 960px;
    margin: 0 ;
}
header p {
    margin: 0;
    color: #6c757d;
}
</style>
