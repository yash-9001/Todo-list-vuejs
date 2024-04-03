<template>
    <div class="main">
        <div v-if="!editUser">
            <h1>User Details</h1>
            <table v-if="userData">
                <thead>
                    <tr>
                        <th> Details : </th>
                        <th> Value : </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name : </td>
                        <td>
                            <input type="text" v-model="userData.name" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td>
                            <input type="text" v-model="userData.email" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td>Password : </td>
                        <td>
                            <input type="password" v-model="userData.password" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td>Contact : </td>
                        <td>
                            <input type="text" v-model="userData.contact" disabled>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h1>Edit User Data</h1>
            <table v-if="userData">
                <thead>
                    <tr>
                        <th> Details : </th>
                        <th> Value : </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name : </td>
                        <td>
                            <input type="text" v-model="userData.name">
                        </td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td>
                            <input type="text" v-model="userData.email" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td>Password : </td>
                        <td>
                            <input type="password" v-model="userData.password">
                        </td>
                    </tr>
                    <tr>
                        <td>Contact : </td>
                        <td>
                            <input type="text" v-model="userData.contact">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="warnuser warn">
    </div>
    <div class="btn" v-if="editUser">
        <button @click="saveChanges">Save Changes</button>
    </div>
    <div v-else class="btn">
        <button @click="editUserData">Edit Data</button>
    </div>
</template>
<script setup>
import { usetodoStore } from "@/store/todoStore";
import { onMounted, ref, watch } from "vue";
const mytodoStore = usetodoStore();
const userData = ref();
const userName = ref('')
const editUser = ref(false)
onMounted(async () => {
    await mytodoStore.getData()
    userData.value = mytodoStore.getCurrentUser()
    userName.value = userData.value.name
})
watch(userData?.value?.email, () => {
    console.log(userData.value.email);
})
const saveChanges = () => {
    const allUsers = mytodoStore.getAllUsers()
    console.log(allUsers);
    const updatedUser = {}
    updatedUser.id = userData.value.id
    updatedUser.name = userData.value.name
    updatedUser.email = userData.value.email
    updatedUser.password = userData.value.password
    updatedUser.contact = userData.value.contact
    updatedUser.tasks = userData.value.tasks
    if(updatedUser.id && updatedUser.name?.trim() && updatedUser.email?.trim() && updatedUser.password?.trim() && updatedUser.contact?.trim()){
        mytodoStore.updateUser(updatedUser)
        localStorage.setItem('editUser', false)
        editUser.value = JSON.parse(localStorage.getItem('editUser'))
    }
}
const editUserData = () => {
    localStorage.setItem('editUser', true)
    editUser.value = JSON.parse(localStorage.getItem('editUser'))
}
</script>
<style scoped>
table {
    font-size: 1.5rem;
}

th,
td {
    text-align: left;
    padding: 10px 30px;
}

input {
    font-size: 1.5rem;
    border: none;
    /* margin-left: -3px; */
}

.warnuser{
    text-align: center;
}

.main {
    display: flex;
    justify-content: center;
    text-align: center;
}

:disabled{
    color: white;
}

.btn {
    text-align: center;
}
</style>