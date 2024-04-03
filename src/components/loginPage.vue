<template>
    <div class="main">
        <form>
            <h1>Login</h1>
            <label for="email">Email : </label>
            <input type="text" id="email" v-model="email" placeholder="Enter your Email">
            <label for="password">Password : </label>
            <input type="text" id="password" v-model="password" placeholder="Enter your Password">
            <p v-if="showMsg" class="warn">Invalid Credentials</p>
            <button @click="loginUser">Login</button>
            <span>
                New User?
                <router-link :to="{ name: 'register' }" @click="registerUser">Register</router-link>
            </span>

        </form>
    </div>
</template>


<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';

import { usetodoStore } from '../store/todoStore'
const mytodoStore = usetodoStore()

import { useToast } from "vue-toast-notification";

const toast = useToast()

const showMsg = ref(false)



// const router = useRouter()


const email = ref('')
const password = ref('')
let loginDetails = {};
const getData = []

onMounted(async () => {

    await axios.get('http://localhost:3000/user')
        .then((response) => {
            formatData(response.data);
        })


    // await axios.get('http://localhost:3000/loginDetails')
    // .then((response) => {
    //     loginDetails = response.data
    // })
})

// let getLoginDetails = {};
// const checkLoginDetails = () => {
//     axios.get('http://localhost:3000/loginDetails')
//     .then((response) => {
//         getLoginDetails = response.data
//     })
// }


const formatData = (data) => {
    data.forEach((element) => {
        getData.push(element)
    })
}

const loginUser = () => {
    // checkLoginDetails()
    getData.find((item) => {
        if (item.email === email.value) {
            if (item.password === password.value) {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('isRegistered', true)
                console.log("Valid Credentials");

                mytodoStore.currentUserId(item.id)
                mytodoStore.currentUser(item)
                let getCurrentUser = computed(() => mytodoStore.getCurrentUser())
                // let getCurrentUserId = computed(() => mytodoStore.getCurrentUserId())

                toast.success(`Logged In to ${(getCurrentUser.value.name).toUpperCase()}`, { position: 'bottom' })
            }
        }
        else {
            showMsg.value = true
            // toast.error(`Invalid Credentials`, { position: 'bottom', pauseOnHover: true, queue: true, duration: 500 })
        }
    })
}

const registerUser = async () => {
    console.log("loginDetails", loginDetails);
    localStorage.setItem('isLoggedIn', false)
    localStorage.setItem('isRegistered', false)
    await axios.put('http://localhost:3000/loginDetails', loginDetails)
        .then((res) => {
            console.log(res);
        })
}


</script>


<style scoped>
.main {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 13%;
}

form {
    display: flex;
    flex-direction: column;
    width: 500px;
    /* border: 1px solid red; */
}


input {
    padding: 5px 5px;
    margin: 2px 0 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}

button {
    padding: 7px 0;
    border-radius: 5px;
    border: none;
    background: rgb(31, 167, 31);
    color: white;
}

span {
    margin-top: 10px;
    text-align: center;
}
p{
    margin: 0 0 7px 0;
}
</style>