<template>
    <div>
        <h1>Hello {{ user.name }}</h1>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { usetodoStore } from '../store/todoStore'
const mytodoStore = usetodoStore()
const user = ref('')
onMounted(async () => {
    await mytodoStore.getData()
        user.value = mytodoStore.getCurrentUser()

    })
</script>