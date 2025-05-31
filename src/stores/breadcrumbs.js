import { defineStore } from "pinia";

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
    state: () => ({
        items: [
            { label: 'Dashboard', link: '/dashboard' }
        ],
        activeIndex: 0
    }),

    actions: {
        setActive(idx) {
            this.activeIndex = idx;
        },
        addBreadcrumb(label, link) {
            this.items.push({ label, link });
        },
        clearBreadcrumbs() {
            this.items = [];
        },
        removeBreadcrumb(index) {
            if (index >= 0 && index < this.items.length) {
                this.items.splice(index, 1);
            }
        }
    }
});