<template>
  <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4 gap-4">
    <li class="mb-4">
      <img src="/images/logo/logo.png" alt="Agridation Logo" class="w-40 mx-auto" />
    </li>
    <li v-for="(item, idx) in sidebarStore.items" :key="item.label">
      <router-link
        :to="item.link"
        @click="sidebarStore.setActive(idx)"
        class="btn btn-ghost justify-start w-full text-base font-medium"
        active-class="btn-active btn-success"
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

const sidebarStore = useSidebarStore();
// const router = useRouter(); // Uncomment if router.push is needed for logout

const handleLogout = () => {
  // Assuming sidebarStore.logout() handles the actual logout logic
  // For example, clearing auth tokens from localStorage or a Pinia auth store
  // And then redirecting to login:
  // Option 1: If sidebarStore.logout handles redirection or emits an event handled by App.vue
  sidebarStore.logout();

  // Option 2: Programmatic navigation if logout doesn't handle it
  // router.push('/login');
  // Make sure to handle cases where router might not be available during logout (e.g., if store is outside Vue context fully)
  // A common pattern is for the store action to simply clear state, and a watcher in App.vue or a navigation guard handles redirect.
};
</script>