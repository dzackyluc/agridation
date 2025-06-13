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
        const token = localStorage.getItem('jwtToken');
        const res = await axios.get('https://api.agridation.com/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`
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
        const token = localStorage.getItem('jwtToken');
        await axios.put(
          `https://api.agridation.com/api/transactions/verif/${id}`,
          {
            action: status,
            rejection_reason: reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
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