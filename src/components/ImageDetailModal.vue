<template>
  <dialog ref="imageModalDialog" class="modal">
    <div class="modal-box w-11/12 max-w-5xl p-4">
      <template v-if="props.fileUrl">
        <img
          v-if="props.fileType === 'image'"
          :src="props.fileUrl"
          alt="Detailed view"
          class="rounded-lg max-h-[80vh] w-auto mx-auto object-contain"
        >
        <embed
          v-else-if="props.fileType === 'pdf'"
          :src="props.fileUrl"
          type="application/pdf"
          class="w-full h-[80vh] rounded-lg"
        >
        <div v-else class="text-center p-8">
          <p class="font-semibold">Unsupported file type</p>
          <p class="text-sm text-gray-600">Cannot display this file: {{ props.fileUrl }}</p>
        </div>
      </template>
      <div v-else class="text-center p-8">
        <p class="font-semibold">No file specified</p>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="handleClose">close</button> <!-- This button is part of DaisyUI's modal closing mechanism -->
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
  fileUrl: { // Renamed from imageUrl
    type: String,
    required: true
  },
  fileType: { // Added new prop
    type: String,
    required: true // Assuming fileType is always provided when visible
  }
});

const emit = defineEmits(['close']);

const imageModalDialog = ref(null); // Keep name generic as it now handles more than images

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

const onDialogClose = () => {
    if (props.visible) {
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