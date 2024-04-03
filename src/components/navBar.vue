<template>
    <div class="main">
    <router-link :to="{name: 'home'}" class="nav">Home</router-link>
    <router-link :to="{name: 'todo'}" class="nav">To-Do List</router-link>
    <router-link :to="{name: 'manageTask'}" class="nav">Manage Task</router-link>
    <router-link :to="{name: 'userDetails'}" class="nav">User Details</router-link>
    <button @click="logoutUser" class="nav">LogOut</button>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import {usetodoStore} from '../store/todoStore'
const mytodoStore = usetodoStore()
import { useToast } from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
const toast = useToast()
const router = useRouter()
    const logoutUser = () => {        
        localStorage.setItem('isRegistered', true)
        localStorage.setItem('isLoggedIn', false)
        router.push({name: 'login'})
        let getCurrentUser = computed(() => mytodoStore.getCurrentUser())
        toast.success(`Logged Out ${getCurrentUser.value.name}`,{position:'bottom'})
        mytodoStore.currentUser({})
        mytodoStore.currentUserId('')
        mytodoStore.removeDetails()
    }
</script>
<style scoped>
    .main{
        text-align: center;
        margin: 10px 0;
        font-size: 1.2rem;
        padding: 15px 0;
    }
    .nav{
        margin: 0px 10px;
    }
</style>