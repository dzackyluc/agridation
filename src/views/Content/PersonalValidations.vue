<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center">Personal Validations</h1>
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <select v-model="selectedStatus" class="select select-bordered">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="rejected">Rejected</option>
      </select>
      <select v-model="selectedRequirement" class="select select-bordered">
        <option value="">All Requirements</option>
        <option value="ktm">KTM</option>
        <option value="twibbon">Twibbon</option>
        <option value="instagram">Instagram</option>
      </select>
    </div>
    <div>
      <div v-if="store.loading" class="flex justify-center items-center">
        <LoadingSpinner />
      </div>
      <div v-else-if="store.error" class="text-center text-red-500 py-8">
        {{ store.error.message || store.error }}
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div
          v-for="item in filteredRequirements"
          :key="item.id"
          class="cursor-pointer"
          @click="showImageModal(item)"
        >
          <img
            :src="item.proof_url"
            :alt="`${item.user_name} - ${item.requirement_id}`"
            :class="[
              'rounded-xl border-4 hover:scale-105 transition-transform shadow-md',
              item.status === 'verified'
                ? 'border-green-500'
                : item.status === 'rejected'
                  ? 'border-red-500'
                  : 'border-base-200'
            ]"
          />
          <div class="mt-2 text-center text-sm font-medium">
            {{ item.user_name }}<br>
            <span class="text-xs text-gray-500">{{ item.requirement_id }}</span>
          </div>
        </div>
        <div v-if="filteredRequirements.length === 0" class="col-span-full text-center text-gray-400 py-8">
          No data found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import LoadingSpinner from '@/components/Loading.vue';
import { onMounted, ref, computed } from 'vue';
import { useRequirementStore } from '@/stores/requirements';

const store = useRequirementStore();

const selectedStatus = ref('');
const selectedRequirement = ref('');

onMounted(() => {
  store.fetchRequirements();
});

const filteredRequirements = computed(() => {
  return store.requirements.filter(item => {
    const statusMatch = selectedStatus.value ? item.status === selectedStatus.value : true;
    const reqMatch = selectedRequirement.value ? item.requirement_id === selectedRequirement.value : true;
    return statusMatch && reqMatch;
  });
});

function showImageModal(item) {
  Swal.fire({
    title: `${item.user_name} - ${item.requirement_id.toUpperCase()}`,
    html: `
      <img src="${item.proof_url}" alt="${item.user_name}" class="rounded-xl mx-auto mb-4 w-48 h-48 object-cover" style="margin-bottom:1rem;max-width:12rem;max-height:12rem;" />
      <div class="mb-2"><b>Email:</b> ${item.user_email}</div>
      <div class="mb-2"><b>Status:</b> <span style="text-transform:capitalize">${item.status}</span></div>
      ${item.verified_by ? `<div class="mb-2"><b>Verified by:</b> ${item.verified_by}</div>` : ''}
      ${item.verified_at ? `<div class="mb-2"><b>Verified at:</b> ${item.verified_at}</div>` : ''}
      ${item.rejection_reason ? `<div class="mb-2 text-red-500"><b>Reason:</b> ${item.rejection_reason}</div>` : ''}
    `,
    showCancelButton: item.status === 'pending',
    confirmButtonText: item.status === 'pending' ? 'Approve' : 'OK',
    cancelButtonText: item.status === 'pending' ? 'Reject' : undefined,
    reverseButtons: true,
    customClass: {
      confirmButton: item.status === 'pending' ? 'btn btn-success mx-2' : 'btn btn-primary mx-2',
      cancelButton: 'btn btn-error mx-2'
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (item.status === 'pending') {
      if (result.isConfirmed) {
        await store.updateRequirementAction(item.user_id, item.requirement_id, 'approved');
        Swal.fire('Approved!', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Prompt for rejection reason
        const { value: reason } = await Swal.fire({
          title: 'Reject Reason',
          input: 'textarea',
          inputLabel: 'Please provide a reason for rejection',
          inputPlaceholder: 'Type your reason here...',
          inputAttributes: {
            'aria-label': 'Rejection reason'
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write a reason!';
            }
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          customClass: {
            confirmButton: 'btn btn-error mx-2',
            cancelButton: 'btn btn-ghost mx-2'
          },
          buttonsStyling: false,
        });
        if (reason) {
          await store.updateRequirementAction(item.user_id, item.requirement_id, 'rejected', reason);
          Swal.fire('Rejected!', '', 'error');
        }
      }
    }
  });
}
</script>
