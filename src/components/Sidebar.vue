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
import { useSidebarStore } from '../stores/sidebar';
// import { useRouter } from 'vue-router'; // Uncomment if router.push is needed for logout

const sidebarStore = [
            { label: 'Dashboard',  link: '/dashboard' },
            { label: 'Submissions',  link: '/submissions' },
            { label: 'Profile',  link: '/profile' }
        ]; // Use the store directly if it's a simple static list

  // Option 2: Programmatic navigation if logout doesn't handle it
  // router.push('/login');
  // Make sure to handle cases where router might not be available during logout (e.g., if store is outside Vue context fully)
  // A common pattern is for the store action to simply clear state, and a watcher in App.vue or a navigation guard handles redirect.
//};
</script>