<template>
  <dialog ref="rejectionModalDialog" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Reason for Rejection</h3>
      <textarea
        v-model="reason"
        class="textarea textarea-bordered w-full h-32"
        placeholder="Enter rejection reason..."
      ></textarea>
      <div class="modal-action mt-6 text-right space-x-2">
        <button class="btn btn-sm" @click="handleCancel">Cancel</button>
        <button class="btn btn-sm btn-error" @click="handleSubmitReason">Submit Rejection</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="handleCancel">close</button> <!-- Allow closing by clicking backdrop -->
    </form>
  </dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['submit', 'close']);

const reason = ref('');
const rejectionModalDialog = ref(null);

watch(() => props.visible, (newVal) => {
  if (newVal) {
    reason.value = ''; // Clear reason when modal becomes visible
    rejectionModalDialog.value?.showModal();
  } else {
    rejectionModalDialog.value?.close();
  }
});

const handleSubmitReason = () => {
  if (reason.value.trim()) {
    emit('submit', reason.value.trim());
  } else {
    alert('Please enter a reason for rejection.'); // Simple validation
  }
};

const handleCancel = () => {
  emit('close');
};

const onDialogClose = () => {
    if (props.visible) {
         emit('close');
    }
};

onMounted(() => {
  if (props.visible) {
    rejectionModalDialog.value?.showModal();
  }
  rejectionModalDialog.value?.addEventListener('close', onDialogClose);
});

onBeforeUnmount(() => {
  rejectionModalDialog.value?.removeEventListener('close', onDialogClose);
});

</script>

<style scoped>
/* All custom styles removed as they are handled by Tailwind/DaisyUI or are redundant. */
</style>
