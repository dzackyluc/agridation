import { defineStore } from "pinia";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        currentUser: null,
        isAuthenticated: false,
        jwtToken: localStorage.getItem('jwtToken') || null
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
                localStorage.setItem('jwtToken', token);
                console.log('JWT Token set:', token);
            }
        },
        setJwtToken(token) {
            this.jwtToken = token;
            if (token) {
                localStorage.setItem('jwtToken', token);
            } else {
                localStorage.removeItem('jwtToken');
            }
        },
        logout() {
            this.currentUser = null;
            this.isAuthenticated = false;
            this.jwtToken = null;
            localStorage.removeItem('jwtToken');
        }
    }
});