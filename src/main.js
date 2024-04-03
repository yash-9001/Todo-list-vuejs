import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import loginPage from './components/loginPage.vue'
import registerPage from './components/registerPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from './components/homePage.vue'
import TodoList from './components/todoList.vue'
import notFound from './components/notFound.vue'
import {createPinia} from 'pinia'
import ManageTask from './components/manageTask.vue'
import 'vue-toast-notification/dist/theme-sugar.css';
import UserDetails from './components/userDetails.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: loginPage,
        meta:{
            isAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: registerPage,
        meta:{
            isAuth: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: homePage,
        meta:{
            isAuth: true
        }
    },
    {
        path: '/todo',
        name: 'todo',
        component: TodoList,
        meta:{
            isAuth: true
        }
    },
    {
        path: '/manageTask',
        name: 'manageTask',
        component: ManageTask,
        meta:{
            isAuth: true
        }
    },
    {
        path: '/userDetails',
        name: 'userDetails',
        component: UserDetails,
        meta:{
            isAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const pinia = createPinia();
const app = createApp(App);
app.use(pinia)
app.use(router);
app.mount('#app');

router.beforeEach((to, from) => {
    
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    let isRegistered = localStorage.getItem('isRegistered')
    
    if(isLoggedIn == "false" && isRegistered == "true"){
        if(to.name != 'login'){
            // alert("lisfgsifg")
            // alert(to.name)
            return{name: 'login'}
        }
    }
    
    if(isLoggedIn == "false" && isRegistered == "false"){
        if(to.name != 'register'){
            return{name: 'register'}
        }
    }
    
    if(isLoggedIn == "true" && isRegistered == "true"){
        if(to.name == 'login' || to.name == 'register'){
            // alert("lisfgsifg")
            return{name: 'home'}
        }
    }

    if(from.name == 'todo'){
        localStorage.setItem('editData', false)
    }

    if(to.name == 'notfound'){
        localStorage.setItem('hideNavbar', false)
    }
    if(from.name == 'notfound'){
        localStorage.setItem('hideNavbar', true)
    }
})