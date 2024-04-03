import axios from 'axios'
import { defineStore } from "pinia";
import { ref } from "vue";
export const usetodoStore = defineStore('todoList', () => {
    const updateTask = ref()
    const tasks = ref([]);
    const userId = ref('');
    const user = ref({});
    const allUser = ref()
    const addTask = (task) => {
        let userID = localStorage.getItem('tempId');
        tasks.value.push(task);
        user.value.tasks = tasks.value
        axios.put(`http://localhost:3000/user/${userID}`, user.value)
        .then((res) => {
            console.log("res", res);
        })
    }

    const updateUser = (data) => {
        let userID = localStorage.getItem('tempId');
        axios.put(`http://localhost:3000/user/${userID}`, data)
        .then((res) => {
            console.log("res", res);
        })
    }

    const updateTaskdata = (task) => {
        let userID = localStorage.getItem('tempId');
        tasks.value = task
        user.value.tasks = tasks.value
        axios.put(`http://localhost:3000/user/${userID}`, user.value)
        .then((res) => {
            console.log("res", res);
            getData()
        })
    }

    const getTask = () => {
        return tasks.value;
    }

    const currentUserId = (temp) => {
        userId.value = temp
        localStorage.setItem('tempId', userId.value)
    }

    const editTask = (task) => {
        updateTask.value = task
    }

    const getEditTask = () => {
        return updateTask.value
    }
    
    const getCurrentUserId = () => {
        return userId.value
    }
    
    const currentUser = (temp) => {
        user.value = temp;
    }
    
    const getCurrentUser = () => {
        return user.value
    }

    const removeDetails = () => {
        userId.value = ''
        user.value = {}
        tasks.value = []
    }

    const getAllUsers = () => {
        return allUser.value
    }

    const filterTask = (value) => {
        return tasks.value.filter(x => x.status === value)
    }
    
    const getData = async() => {
        let userID = localStorage.getItem('tempId')
        await axios.get('http://localhost:3000/user')
        .then((response) => {
            user.value = (response.data).find((x) => x.id == userID)
            tasks.value = user.value.tasks
            currentUser(user.value)
            allUser.value = response.data
        })
    }
    return{
        addTask,
        getTask,
        currentUser,
        currentUserId,
        getCurrentUser,
        getCurrentUserId,
        getData,
        removeDetails,
        editTask,
        getEditTask,
        updateTaskdata,
        filterTask,
        updateUser,
        getAllUsers
    }
})