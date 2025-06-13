import { createRouter, createWebHistory } from 'vue-router'

// Example route components (replace with your actual components)
const Login = () => import('@/views/Auth/SignIn.vue')
// const SignUp = () => import('@/views/Auth/SignUp.vue')
const NotFound = () => import('@/views/Content/404NotFound.vue')
const Dashboard = () => import('@/views/Layout/Dashboard.vue')
const Home = () => import('@/views/Content/Home.vue')
const PersonalValidations = () => import('@/views/Content/PersonalValidations.vue')
const TeamValidations = () => import('@/views/Content/TeamValidations.vue')

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // {
    //     path: '/signup',
    //     name: 'SignUp',
    //     component: SignUp
    // },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: '/personal-validations',
                name: 'PersonalValidations',
                component: PersonalValidations
            },
            {
                path: '/team-validations',
                name: 'TeamValidations',
                component: TeamValidations
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard to lock dashboard before login
router.beforeEach((to, from, next) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!jwtToken) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router