<template>
    <div class="main">
        <form>
            <h1>Registration</h1>
            <div>
                <label for="name">Name : </label>
                <span class="required">*</span>
            </div>
            <input type="text" id="name" v-model="name" placeholder="Enter your Name">
            <p id="namewarn" class="warn" v-if="isName">{{ namewarn }}</p>

            <div>
                <label for="email">Email : </label>
                <span class="required">*</span>
            </div>
            <input type="text" id="email" v-model="email" placeholder="Enter your Email">
            <p id="emailwarn" class="warn" v-if="isEmail">{{ emailwarn }}</p>

            <div>
                <label for="password">Password : </label>
                <span class="required">*</span>
            </div>
            <input type="text" id="password" v-model="password" placeholder="Enter your Password">
            <p id="passwordwarn" class="warn" v-if="isPassword">{{ passwordwarn }}</p>

            <div>
                <label for="contact">Contact : </label>
                <span class="required">*</span>
            </div>
            <input type="text" id="contact" v-model="contact" placeholder="Enter your Contact">
            <p id="contactwarn" class="warn" v-if="isContact">{{ contactwarn }}</p>

            <button @click="registerUser">Register</button>
            <span id="backPage">
                <router-link :to="{ name: 'login' }" @click="backtoLogin">Back to Login</router-link>
            </span>
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
const toast = useToast()
const router = useRouter()

let formDetails = {};
const name = ref('')
const isName = ref(false)
const namewarn = ref('');

const email = ref('')
const isEmail = ref(false)
const emailwarn = ref('')

const password = ref('')
const isPassword = ref(false)
const passwordwarn = ref('')

const contact = ref('')
const isContact = ref(false)
const contactwarn = ref('')

watch(name, () => {
    if (name.value) {
        isName.value = false
    }
})

watch(email, () => {
    if (email.value) {
        isEmail.value = false
    }
    validateEmail()
})

watch(password, () => {
    if (password.value) {
        isPassword.value = false
    }
    validatePassword()
})

watch(contact, () => {
    if (String(contact.value).length === 10) {
        isContact.value = false;
    }
    validateContact()
})

const getData = [];
onMounted(async () => {
    axios.get('http://localhost:3000/user')
        .then((response) => {
            formatData(response.data)
        })
})

const formatData = (data) => {
    data.forEach((item) => {
        getData.push(item);
    })
}

const validateName = () => {
    if (name.value.trim() === '') {
        isName.value = true
        namewarn.value = "Please enter your name"
    } else {
        formDetails.name = name.value
        isName.value = false
        return true
    }
}

const validateEmail = async () => {
    let checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.value == '') {
        isEmail.value = true
        emailwarn.value = 'Please Enter your Email'
    } else if (email.value.match(checkEmail)) {
        getData.forEach((data) => {
            if (email.value != data.email) {
                console.log("Valid Email");
                formDetails.email = email.value;
                return true
            } else {
                isEmail.value = true
                emailwarn.value = 'Email already Exist'
                return false
            }
        })
    } else {
        isEmail.value = true
        emailwarn.value = 'Invalid Email'
        return false
    }
}

const validatePassword = () => {
    let checkPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (password.value == '') {
        isPassword.value = true;
        passwordwarn.value = 'Please Enter your Password'
    } else if (password.value.match(checkPass)) {
        formDetails.password = password.value
        return true
    } else {
        isPassword.value = true;
        passwordwarn.value = 'Invalid Password'
    }
}

const validateContact = () => {
    if (String(contact.value).length === 0) {
        isContact.value = true
        contactwarn.value = 'Please Enter your Contact Number'
    } else if (String(contact.value).length === 10) {
        isContact.value = false
        formDetails.contact = contact.value
        return true;
    } else {
        isContact.value = true
        contactwarn.value = 'Contact number must be 10 digits';
    }
}

const registerUser = async () => {
    validateName()
    validateEmail()
    validatePassword()
    validateContact()
    if (validateName() && validateEmail() && validatePassword() && validateContact()) {
        console.log(email.value);
        formDetails.tasks = []
        console.log(formDetails);
        console.log(formDetails.email);
        await axios.post('http://localhost:3000/user', formDetails)
            .then((response) => {
                console.log(response);
            })
            localStorage.setItem('isLoggedIn', false)
            localStorage.setItem('isRegistered', true)
            toast.success("User Registered Successfully",{position:'bottom'})
            router.push({ name: 'login' })
    }
}

const backtoLogin = async () => {
    localStorage.setItem('isLoggedIn', false)
    localStorage.setItem('isRegistered', true)
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    margin-top: 10%;
}

form {
    width: 600px;
    display: flex;
    flex-direction: column;
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

#backPage {
    margin-top: 10px;
    text-align: center;
}

.required {
    color: red;
}
</style>