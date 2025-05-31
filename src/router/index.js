import { createRouter, createWebHistory } from 'vue-router'

// Example route components (replace with your actual components)
// const Home = () => import('@/views/Home.vue')
// const About = () => import('@/views/About.vue')
const Login = () => import('@/views/Auth/SignIn.vue')
const SignUp = () => import('@/views/Auth/SignUp.vue')
const NotFound = () => import('@/views/Content/404NotFound.vue')
const Dashboard = () => import('@/views/Layout/Dashboard.vue')
const Home = () => import('@/views/Content/Home.vue')
const Submissions = () => import('@/views/Content/Submissions.vue')

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
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
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
                path: '/submissions',
                name: 'Submissions',
                component: Submissions
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

export default router