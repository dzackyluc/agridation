<template>
  <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4 gap-4">
    <li class="mb-4">
      <img src="/images/logo/logo.png" alt="Agridation Logo" class="w-40 mx-auto" />
    </li>
    <li v-for="(item) in sidebarStore" :key="item.label">
      <router-link
        :to="item.link"
        class="btn btn-ghost justify-start w-full btn-success text-base font-medium"
        active-class="btn-active"
        exact-active-class="btn-active"
      >
        {{ item.label }}
      </router-link>
    </li>
    <li class="mt-auto">
      <button class="btn btn-ghost btn-error justify-start w-full text-base font-medium" @click="handleLogout">
        Logout
      </button>
    </li>
  </ul>
</template>

<script setup>
const sidebarStore = [
            { label: 'Dashboard',  link: '/dashboard' },
            { label: 'Personal Validations',  link: '/personal-validations' },
            { label: 'Profile',  link: '/profile' }
        ]; // Use the store directly if it's a simple static list
</script>