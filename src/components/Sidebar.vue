<template>
  <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4 gap-4">
    <li>
      <img src="/images/logo/logo.png" alt="Agridation Logo" />
    </li>
    <li v-for="(item, idx) in sidebarStore.items" :key="item" @click="sidebarStore.setActive(idx)">
      <button
        class="btn btn-ghost btn-success"
        :class="{ 'btn-active': sidebarStore.activeIndex === idx }"
      >
        {{ item.label }}
      </button>
    </li>
    <li class="mt-auto">
      <button class="btn btn-ghost btn-error" @click="sidebarStore.logout">
        Logout
      </button>
    </li>
  </ul>
</template>

<script setup>
import { useSidebarStore } from '../stores/sidebar'
const sidebarStore = useSidebarStore()
</script>