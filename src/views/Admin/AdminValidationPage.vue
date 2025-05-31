<template>
  <div class="admin-validation-page p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center">Submission Validation</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
      <SubmissionCard
        v-for="submission in submissions"
        :key="submission.id"
        :submission="submission"
        @view-details="openImageModal"
        @reject-submission="openRejectionModal"
        @approve-submission="handleApproveSubmission"
      />
    </div>
    <ImageDetailModal
      :visible="showImageModal"
      :image-url="selectedImageUrl"
      @close="closeImageModal"
    />
    <RejectionReasonModal
      :visible="showRejectionModal"
      @close="closeRejectionModal"
      @submit="handleRejectionSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import SubmissionCard from '@/components/SubmissionCard.vue';
import ImageDetailModal from '@/components/ImageDetailModal.vue';
import RejectionReasonModal from '@/components/RejectionReasonModal.vue';

const submissions = reactive([
  {
    id: 1, teamName: 'Team Innovate', status: null, rejectionReason: null,
    members: [
      {
        id: 101, name: 'Alice Wonderland',
        images: [
          { type: 'twibbon', url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Alice_Twibbon' },
          { type: 'instagram', url: 'https://via.placeholder.com/150/FFFF00/000000?Text=Alice_Insta' }
        ]
      },
      {
        id: 102, name: 'Bob The Builder',
        images: [
          { type: 'twibbon', url: 'https://via.placeholder.com/150/00FF00/FFFFFF?Text=Bob_Twibbon' },
          { type: 'instagram', url: 'https://via.placeholder.com/150/00FFFF/000000?Text=Bob_Insta' }
        ]
      }
    ]
  },
  {
    id: 2, teamName: 'Code Wizards', status: null, rejectionReason: null,
    members: [
      {
        id: 201, name: 'Charlie Brown',
        images: [
          { type: 'twibbon', url: 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=Charlie_Twibbon' },
          { type: 'instagram', url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Charlie_Insta' }
        ]
      }
    ]
  },
  {
    id: 3, teamName: 'Design Dynamos', status: null, rejectionReason: null,
    members: [
      {
        id: 301, name: 'Diana Prince',
        images: [
          { type: 'twibbon', url: 'https://via.placeholder.com/150/800080/FFFFFF?Text=Diana_Twibbon' },
          { type: 'instagram', url: 'https://via.placeholder.com/150/FFA500/000000?Text=Diana_Insta' }
        ]
      },
      {
        id: 302, name: 'Edward Nygma',
        images: [
          { type: 'twibbon', url: 'https://via.placeholder.com/150/008000/FFFFFF?Text=Edward_Twibbon' },
          { type: 'instagram', url: 'https://via.placeholder.com/150/A52A2A/FFFFFF?Text=Edward_Insta' }
        ]
      }
    ]
  }
]);

const showImageModal = ref(false);
const selectedImageUrl = ref('');
const showRejectionModal = ref(false);
const currentSubmissionForRejection = ref(null);

const openImageModal = (imageUrl) => {
  selectedImageUrl.value = imageUrl;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  selectedImageUrl.value = ''; // Optional: clear URL when closing
};

const openRejectionModal = (submission) => {
  currentSubmissionForRejection.value = submission;
  showRejectionModal.value = true;
};

const closeRejectionModal = () => {
  showRejectionModal.value = false;
  currentSubmissionForRejection.value = null;
};

const handleRejectionSubmit = (reason) => {
  if (currentSubmissionForRejection.value) {
    const submission = submissions.find(s => s.id === currentSubmissionForRejection.value.id);
    if (submission) {
      submission.status = 'rejected';
      submission.rejectionReason = reason;
      alert(`Team '${submission.teamName}' rejected. Reason: ${reason}`);
      console.log(`Submission ID: ${submission.id} marked as rejected. Reason: ${reason}`);
    }
  }
  closeRejectionModal();
};

const handleApproveSubmission = (submissionData) => {
  const submission = submissions.find(s => s.id === submissionData.id);
  if (submission) {
    submission.status = 'approved';
    alert(`Team '${submission.teamName}' approved successfully!`);
    console.log(`Submission ID: ${submission.id} marked as approved.`);
  }
};
</script>

<style scoped>
/* All custom styles removed as they are handled by Tailwind or are redundant. */
</style>
