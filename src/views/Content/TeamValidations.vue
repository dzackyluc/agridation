<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center">Team Payment Validations</h1>
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <select v-model="selectedStatus" class="select select-bordered">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
    <div>
      <div v-if="store.loading" class="flex justify-center items-center">
        <LoadingSpinner />
      </div>
      <div v-else-if="store.error" class="text-center text-red-500 py-8">
        {{ store.error }}
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        <div
          v-for="item in filteredTransactions"
          :key="item.id"
          class="card bg-base-100 shadow-xl cursor-pointer border-4 transition-all"
          :class="{
            'border-green-500': item.status === 'verified',
            'border-red-500': item.status === 'rejected',
            'border-base-200': item.status === 'pending'
          }"
          @click="showTransactionModal(item)"
        >
          <figure class="h-48 flex items-center justify-center bg-base-200">
            <template v-if="isImage(item.payment_receipt_url)">
              <img :src="item.payment_receipt_url" alt="Payment Receipt" class="object-contain h-full max-w-full" />
            </template>
            <template v-else>
              <div class="flex flex-col items-center">
                <svg class="w-16 h-16 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V6m0 0l-7 7m7-7l7 7" />
                </svg>
                <span class="mt-2 text-sm">PDF Receipt</span>
              </div>
            </template>
          </figure>
          <div class="card-body p-4">
            <h2 class="card-title text-lg">Team ID: {{ item.team_id }}</h2>
            <div class="text-sm text-gray-500">Transaction: {{ item.transaction_Unique_id }}</div>
            <div class="text-sm">Amount: <span class="font-bold text-primary">Rp {{ formatAmount(item.payment_amount) }}</span></div>
            <div class="text-xs mt-2">Status: <span class="capitalize">{{ item.status }}</span></div>
          </div>
        </div>
        <div v-if="filteredTransactions.length === 0" class="col-span-full text-center text-gray-400 py-8">
          No data found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useTeamTransactionStore } from '@/stores/transactions';
import LoadingSpinner from '@/components/Loading.vue';

const store = useTeamTransactionStore();

const selectedStatus = ref('');

onMounted(() => {
  store.fetchTransactions();
});

const filteredTransactions = computed(() => {
  return store.transactions.filter(item =>
    selectedStatus.value ? item.status === selectedStatus.value : true
  );
});

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

function formatAmount(amount) {
  return Number(amount).toLocaleString('id-ID');
}

function showTransactionModal(item) {
  const isImg = isImage(item.payment_receipt_url);
  Swal.fire({
    title: `Team ID: ${item.team_id}`,
    html: `
      <div class="mb-4">
        ${
          isImg
            ? `<img src="${item.payment_receipt_url}" alt="Payment Receipt" class="rounded-xl mx-auto mb-4 w-64 h-64 object-contain" style="max-width:16rem;max-height:16rem;" />`
            : `<a href="${item.payment_receipt_url}" target="_blank" class="btn btn-outline btn-primary mb-4">View PDF Receipt</a>`
        }
      </div>
      <div class="mb-2"><b>Transaction:</b> ${item.transaction_Unique_id}</div>
      <div class="mb-2"><b>Amount:</b> Rp ${formatAmount(item.payment_amount)}</div>
      <div class="mb-2"><b>Payment Method:</b> ${item.payment_method}</div>
      <div class="mb-2"><b>Status:</b> <span style="text-transform:capitalize">${item.status}</span></div>
      ${item.payment_verified_at ? `<div class="mb-2"><b>Verified at:</b> ${item.payment_verified_at}</div>` : ''}
      ${item.payment_rejection_reason ? `<div class="mb-2 text-red-500"><b>Reason:</b> ${item.payment_rejection_reason}</div>` : ''}
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
        await store.updateTransactionStatus(item.id, 'verified');
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
          await store.updateTransactionStatus(item.id, 'rejected', reason);
          Swal.fire('Rejected!', '', 'error');
        }
      }
    }
  });
}
</script>