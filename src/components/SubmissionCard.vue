<template>
  <div :class="['card w-96 bg-base-100 shadow-xl transition-transform duration-200 ease-in-out hover:translate-y-[-5px]', {
    'border-l-4 border-green-500 bg-green-50': submission.status === 'approved',
    'border-l-4 border-red-500 bg-red-50': submission.status === 'rejected'
  }]">
    <div class="card-body p-6">
      <h2 class="card-title text-xl font-bold justify-center mb-4 pb-2 border-b border-base-300">{{ submission.teamName }}</h2>

      <div v-if="submission.status" class="text-center mb-4">
        <span :class="['badge badge-lg', {
          'badge-success': submission.status === 'approved',
          'badge-error': submission.status === 'rejected'
        }]">
          Status: {{ submission.status.charAt(0).toUpperCase() + submission.status.slice(1) }}
        </span>
        <p v-if="submission.status === 'rejected' && submission.rejectionReason"
           class="text-sm text-error mt-2 p-2 bg-red-100 border border-dashed border-red-400 rounded">
          Reason: {{ submission.rejectionReason }}
        </p>
      </div>

      <div v-if="submission.members && submission.members.length" class="space-y-4">
        <div v-for="member in submission.members" :key="member.id" class="bg-base-200 p-4 rounded-lg">
          <h3 class="text-md font-semibold mb-2">{{ member.name }}</h3>
          <div v-if="member.images && member.images.length" class="flex flex-wrap gap-2">
            <div v-for="image in member.images" :key="image.url" class="relative group">
              <img
                :src="image.url"
                :alt="`${member.name} - ${image.type}`"
                class="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent group-hover:border-primary transition-all"
                @click="emitViewDetails(image.url)"
              >
              <span class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white text-xs py-0.5 rounded-b-md group-hover:bg-opacity-75">
                {{ image.type }}
              </span>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500 italic">No images submitted for this member.</p>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500 italic text-center">No members listed for this team.</p>
    </div>

    <div class="card-actions justify-around p-4 border-t border-base-300 mt-auto" v-if="!submission.status">
      <button class="btn btn-success btn-sm" @click="handleApprove" :disabled="isProcessing || !!submission.status">Approve Team</button>
      <button class="btn btn-error btn-sm" @click="handleReject" :disabled="isProcessing || !!submission.status">Reject Team</button>
    </div>
    <div v-else class="p-4 text-center text-sm text-gray-500 border-t border-base-300 mt-auto">
      <p>Action already taken for this submission.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['view-details', 'approve-submission', 'reject-submission']);

const isProcessing = ref(false);

const handleApprove = async () => {
  if (isProcessing.value || props.submission.status) return;
  isProcessing.value = true;
  emit('approve-submission', props.submission);
};

const handleReject = async () => {
  if (isProcessing.value || props.submission.status) return;
  isProcessing.value = true;
  emit('reject-submission', props.submission);
};

const emitViewDetails = (imageUrl) => {
  if (isProcessing.value) return;
  emit('view-details', imageUrl);
};

watch(() => props.submission.status, (newStatus) => {
  if (newStatus) {
    isProcessing.value = false;
  }
});
</script>

<style scoped>
/* All custom styles removed as they are handled by Tailwind/DaisyUI or are redundant. */
</style>
