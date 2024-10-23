<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between lg:pr-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-20 w-auto" src="/src/assets/HV.png" alt="" />
        </a>
      </div>
      <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">{{ fullName }}</a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <span class="h-6 w-6">&#9776;</span>
        </button>
      </div> -->
      <div class="flex flex-row items-center justify-between ">
        <!-- Full Name Section -->
        <div class="flex-1 text-center mr-10 ml-10">
          {{ fullName }}
        </div>

        <!-- Button Section -->
        <button @click="handleLogout" 
          class="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
          <div
            class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
              </path>
            </svg>
          </div>
          <div
            class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </div>

    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      fullName: ''
    }
  },
  methods: {
    getFullName() {
      this.fullName = this.$store.state.fullName;
    },
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getFullName();
  },

};

</script>
<style scoped>
header {
  background-color: #f8f9fa;
  text-align: center;
  border-top: 1px solid #e7e7e7;
  margin: 0;
}

header .container {
  max-width: 960px;
  margin: 0;
}

header p {
  margin: 0;
  color: #6c757d;
}
</style>
