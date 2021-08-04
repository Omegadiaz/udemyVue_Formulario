<template>
  <Navbar />
 <div class="container"> <router-view/></div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import {mapActions} from 'vuex'
import store from './store'
export default {
  components: {
    Navbar
  },
  methods:{
    ...mapActions(['cargarLocalStorage'])
  },
  created(){
    this.cargarLocalStorage,
    console.log(store.state.user)
  }
}
</script>
<style>

</style>
