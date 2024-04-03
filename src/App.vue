<template>
  <div v-if=showNav>
    <navBar />
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import navBar from './components/navBar.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const showNav = ref(false)
router.beforeEach((to) => {
  isLoggedIn.value = JSON.parse(localStorage.getItem('isLoggedIn'));
  if (to.name == 'notfound' && isLoggedIn.value) {
    showNav.value = false
  } else if (to.name != 'notfound' && isLoggedIn.value) {
    showNav.value = true
  } else if ((to.name == 'login' || to.name == 'register') && !isLoggedIn.value) {
    showNav.value = false
  }
})
</script>