<template>
  <dialog ref="imageModalDialog" class="modal">
    <div class="modal-box w-11/12 max-w-5xl p-4">
      <img :src="props.imageUrl" alt="Detailed view" class="rounded-lg max-h-[80vh] w-auto mx-auto object-contain">
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="handleClose">close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const imageModalDialog = ref(null);

watch(() => props.visible, (newVal) => {
  if (newVal) {
    imageModalDialog.value?.showModal();
  } else {
    imageModalDialog.value?.close();
  }
});

const handleClose = () => {
  emit('close');
};

// Optional: Listen for 'close' event on the dialog itself if user presses ESC
// This is important because DaisyUI modals can be closed by ESC.
const onDialogClose = () => {
    if (props.visible) { // Only emit if programmatically visible
        emit('close');
    }
};

onMounted(() => {
  if (props.visible) {
    imageModalDialog.value?.showModal();
  }
  imageModalDialog.value?.addEventListener('close', onDialogClose);
});

onBeforeUnmount(() => {
  imageModalDialog.value?.removeEventListener('close', onDialogClose);
});

</script>

<style scoped>
/* All custom styles removed as they are handled by Tailwind/DaisyUI or are redundant. */
</style>
