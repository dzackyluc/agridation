import { defineStore } from "pinia";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        currentUser: null,
        isAuthenticated: false,
        jwtToken: null
    }),

    actions: {
        setUsers(users) {
            this.users = users;
        },
        setCurrentUser(user, token = null) {
            this.currentUser = user;
            this.isAuthenticated = !!user;
            if (token) {
                this.jwtToken = token;
            }
        },
        setJwtToken(token) {
            this.jwtToken = token;
        },
        logout() {
            this.currentUser = null;
            this.isAuthenticated = false;
            this.jwtToken = null;
        }
    }
});