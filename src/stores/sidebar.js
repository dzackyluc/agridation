import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        items: [
            { label: 'Dashboard',  link: '/dashboard' },
            { label: 'Submissions',  link: '/submissions' },
            { label: 'Profile',  link: '/profile' }
        ],
        activeIndex: 0
    }),

    actions: {
        setActive(idx) {
            this.activeIndex = idx
        }
    }
})