import { defineStore } from 'pinia';
import axios from 'axios';

export const useTeamTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTransactions() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get('https://api.agridation.com/api/transactions', {
          headers: {
            Authorization: `bearer 7|DHxW4jqRHSPlBsBPYX7PYUaxvYcScn6my3nuCGUp24ff044c`
          }
        });
        this.transactions = res.data.data;
      } catch (err) {
        this.error = err.message || 'Failed to fetch transactions';
      } finally {
        this.loading = false;
      }
    },
    async updateTransactionStatus(id, status, reason = null) {
      try {
        await axios.post(
          `https://api.agridation.com/api/panitia/transactions/${id}/verify`,
          {
            action: status === 'verified' ? 'approved' : 'rejected',
            reason: reason,
          },
          {
            headers: {
              Authorization: `bearer 7|DHxW4jqRHSPlBsBPYX7PYUaxvYcScn6my3nuCGUp24ff044c`
            }
          }
        );
        await this.fetchTransactions();
      } catch (err) {
        this.error = err.message || 'Failed to update status';
        throw err;
      }
    }
  }
});