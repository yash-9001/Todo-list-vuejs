<template>
    <div id="main">
        <div class="sub">
            <h1 v-if="showBtn">Edit Tasks</h1>
            <h1 v-else>Add Tasks</h1>
            <label for="taskTitle">Task Title : </label>
            <input type="text" v-model="taskTitle" id="taskTitle" placeholder="Task Name">
            <label for="taskDescription">Task Description : </label>
            <input type="text" v-model="taskDescription" id="taskDescription" placeholder="Task Details">            
            <div id="select">
                <label for="taskStatus">Task Status : </label>
                <!-- <span class="warn">*</span> -->
                <select name="" id="taskStatus" v-model="taskStatus">
                    <!-- <option value='Todo'>Todo</option> -->
                    <option v-for="(option, index) in selectOptions" :key="index">
                    <option :value="option.value" >{{ option.label }}</option>
                    </option>
                </select>
            </div>
            <div v-if="showBtn">
            <button @click="changeData">Save Changes</button>
            </div>
            <div v-else>
            <button @click="sendData">Add Task</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { usetodoStore } from '../store/todoStore'
import { useToast } from "vue-toast-notification";
import { useRouter } from 'vue-router';

const getData = computed(() => {
    return mytodoStore.getEditTask()
})
const router = useRouter();
const toast = useToast()
const mytodoStore = usetodoStore()
const taskTitle = ref('')
const taskDescription = ref(getData.value?.description ? getData.value?.description : '')
const taskStatus = ref('Todo');

const selectOptions = [
    {label: 'Todo', value: 'Todo'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Inprogress', value: 'Inprogress'},
    {label: 'Completed', value: 'Completed'}
]

const showBtn = ref(JSON.parse(localStorage.getItem('editData')))
const sendData = async () => {
    if (taskDescription.value.trim() !== '' && taskStatus.value.trim() !== '' && taskTitle.value.trim() !== '') {
        const mytask = {}
        mytask.title = taskTitle.value
        mytask.description = taskDescription.value
        mytask.status = taskStatus.value
        mytask.taskId = Math.floor(Math.random() * 100000000)
        mytodoStore.addTask(mytask)
        toast.success("Task added Successfully", { position: 'bottom', duration: 500 })
        localStorage.setItem('editData', false)
        taskTitle.value = ''
        taskDescription.value = ''
    }
    else {
        toast.error("Please fill task Details", { position: 'bottom', duration: 1000 })
    }
}

onMounted(async () => {
    await mytodoStore.getData()
    addData()
})
const taskId = ref(0);
const addData = () => {
    taskTitle.value = getData.value?.title ? getData.value.title : ''
    taskStatus.value = getData.value?.status ? getData.value.status : 'Todo'
    taskId.value = getData.value?.taskId ? getData.value.taskId : ''
}
const tempUser = ref()
const changeData = async () => {
    tempUser.value = mytodoStore.getCurrentUser()
    const updateTask = {}
    updateTask.title = taskTitle.value
    updateTask.description = taskDescription.value
    updateTask.status = taskStatus.value
    updateTask.taskId = getData.value.taskId
    let tempArray = []
    tempUser.value.tasks.find((item) => {
        if (item.taskId != updateTask.taskId) {
            tempArray.push({ ...item })

        }
        if (item.taskId == updateTask.taskId) {
            tempArray.push(updateTask)
        }
    })
    mytodoStore.updateTaskdata(tempArray);
    router.push({name: 'manageTask'})
}
</script>
<style scoped>
#main {
    background: #222;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 10%;
}

.sub {
    display: flex;
    flex-direction: column;
    width: 400px;
}

#taskStatus{
    color: black;
    margin-left: 20px;
}

label {
    text-align: left;
}

#select{
    text-align: left;
}

input {
    padding: 5px 5px;
    margin: 2px 0 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>