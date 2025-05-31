<template>
    <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <Navbar />
            <!-- Page content here -->
            <router-view />
        </div>
        <div class="lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <Sidebar />
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { useBreadcrumbsStore } from '@/stores/breadcrumbs';
import Navbar from '@/components/Navbar.vue';

const breadcrumbsStore = useBreadcrumbsStore();
</script>