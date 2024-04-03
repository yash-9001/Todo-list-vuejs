<template>
    <h1>Manage Tasks</h1>
    <div id="filter">
        <div id="select">
            <label for="taskStatus">Filter Task : </label>
            <select name="" id="taskStatus" v-model="taskStatus">
                <option value=""> All Data</option>
                <option v-for="(option, index) in selectOptions" :key="index">
                <option :value="option.value">{{ option.label }}</option>
                </option>
            </select>
        </div>

    </div>
    <div id="table">
        <table v-if="paginatedTasks">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in paginatedTasks" :key="data">
                    <!-- {{ data }} -->
                    <td>
                        {{ data.title }}
                    </td>
                    <td>
                        {{ data.description }}
                    </td>
                    <td>
                        {{ data.status }} 
                    </td>
                    <td>
                        <p @click="editData(data)" id="editBtn">Edit</p>
                    </td>
                    <td>
                        <p @click="deleteData(data.taskId)" id="deletebtn">Delete</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>No Data Found</div>
    </div>
    <div class="pagination">
    <button @click="previousPage">Previous</button>
    {{ currentPage }} of {{ totalPages }}
    <button @click="nextPage">Next</button>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { usetodoStore } from '../store/todoStore'
import { useToast } from "vue-toast-notification";
const toast = useToast()
const mytodoStore = usetodoStore()
const router = useRouter();
const taskStatus = ref('')
const selectOptions = [
    { label: 'Todo', value: 'Todo' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Inprogress', value: 'Inprogress' },
    { label: 'Completed', value: 'Completed' }
]

let currentUser = ref()
onMounted(async () => {
    await mytodoStore.getData()
    currentUser.value =
        mytodoStore.getTask()
        abc(xyz.value)
})

const paginatedTasks = ref();
const currentPage = ref(1);
const previousPage = () => {
    if(currentPage.value > 1 && currentPage.value <= totalPages.value){
        currentPage.value--
    }
}
const nextPage = () => {
    if(currentPage.value > 0 && currentPage.value < totalPages.value){
        currentPage.value++
    }
}
watch(currentPage, () => {
    if (taskStatus.value) {
        console.log(fData.value);
        abc(fData.value)
    } else {
            abc(xyz.value)
    }
})
const pageSize = 5;
const startIndex = computed(() => {
    return (currentPage.value -  1) * pageSize;
}) 
const endIndex = computed(() => {
    return startIndex.value + pageSize;
}) 

const taskData = ref()
const totalPages = computed(() => {
    return Math.ceil(taskData.value?.length / pageSize)
})
const abc = (mainData) => {
    taskData.value = mainData
    paginatedTasks.value = taskData.value.slice(startIndex.value, endIndex.value)
}

const fData = computed(() => {
    return mytodoStore.filterTask(taskStatus.value)
})
watch(taskStatus, () => {
    if (taskStatus.value) {
        abc(fData.value)
    } else {
        currentUser.value =
            abc(xyz.value)
    }
})

const editData = (data) => {
    mytodoStore.editTask(data)
    localStorage.setItem('editData', true)
    router.push({ name: 'todo' })
}

const xyz = computed(() => {
    return mytodoStore.getTask()
})

const deleteData = (data) => {
    let task = []
    let user = mytodoStore.getCurrentUser()
    user.tasks.find((item) => {
        if (item.taskId !== data) {
            task.push({ ...item })
        }
    })
    mytodoStore.updateTaskdata(task)
    if(xyz.value.length % pageSize == 0 && currentPage.value > 1){
        alert(true)
        currentPage.value--
    }
    toast.success('task deleted successfully', { position: 'bottom', duration: 500 })
    abc(task)
}
</script>

<style scoped>
h1{
    margin: 50px 0;
}
th{
    text-align: center;
    padding: 10px;
    border-bottom: 3px solid rgba(255, 255, 255, 0.5);
}

td {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

#table {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

#deletebtn {
    color: rgb(197, 26, 26);
    cursor: pointer;
}

#editBtn {
    color: #04AA6D;
    cursor: pointer;
}

tr:hover td {
    background-color: rgba(#04AA6D, 0.5);
    background-origin: border-box;
    border-radius: 5px;
}

tr:hover td #editBtn {
    color: blue;
}

#filter {
    text-align: center;
    margin: 50px 0;
}
.pagination{
    text-align: center;
}
</style>