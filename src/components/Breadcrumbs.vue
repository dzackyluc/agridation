<template>
    <div class="breadcrumbs text-sm">
        <ul>
            <li v-for="(crumb, index) in crumbs" :key="index">
                <template v-if="crumb.link && index !== crumbs.length - 1">
                    <router-link :to="crumb.link">{{ crumb.label }}</router-link>
                </template>
                <template v-else>
                    {{ crumb.label }}
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        crumbs: {
            type: Array,
            required: true,
            // Example: [{ label: 'Home', link: '/' }, { label: 'Documents', link: '/documents' }, { label: 'Add Document' }]
        }
    }
}
</script>