<template>
  <Navbar />
 <div class="container"> <router-view/></div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import {mapActions} from 'vuex'
export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions(['cargarLocalStorage'])
  },
  created(){
    this.cargarLocalStorage()
  }
}
</script>

<style>

</style>
