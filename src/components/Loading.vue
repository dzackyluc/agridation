<!-- filepath: src/components/LoadingSpinner.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-16">
    <!-- Circle Spinner -->
    <span class="relative flex h-16 w-16">
      <span class="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-t-primary border-b-primary border-x-transparent"></span>
    </span>
    <!-- Waving Loading Text -->
    <div class="mt-6 flex space-x-1">
      <span
        v-for="(char, i) in loadingText"
        :key="i"
        :style="{ animationDelay: `${i * 0.1}s` }"
        class="inline-block animate-wave text-lg font-semibold text-primary"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup>
const loadingText = 'Loading...'.split('');
</script>

<style scoped>
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  20% { transform: translateY(-8px); }
  40% { transform: translateY(0); }
}
.animate-wave {
  animation: wave 1.2s infinite;
}
</style>