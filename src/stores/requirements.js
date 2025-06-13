import { defineStore } from 'pinia';
import axios from 'axios';

export const useRequirementStore = defineStore('requirement', {
  state: () => ({
    requirements: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRequirements() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('jwtToken');
        const res = await axios.get(
          'https://api.agridation.com/api/panitia/users/getFileRequirements',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.requirements = res.data.data.requirements;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async updateRequirementAction(user_id, requirement_id, action, reason = null) {
      const req = this.requirements.find(r => r.user_id === user_id);
      if (!req) return;

      try {
        const token = localStorage.getItem('jwtToken');
        await axios.post(
          `https://api.agridation.com/api/panitia/users/${user_id}/verify/${requirement_id}`,
          {
            "action": action,
            "reason": reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ).then((response) => {
          this.fetchRequirements();
        });
      } catch (err) {
        this.error = err;
        console.error(`Error updating requirement ${user_id}:`, err);
      }
    }
  }
});