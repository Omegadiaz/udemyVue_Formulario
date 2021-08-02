<template>
<h1>Inicio de sesión</h1>
  <form class="form-group" @submit.prevent="ingresoUsuario({email: this.email, password: this.password})">
      <input 
      class="form-control  my-2" 
      placeholder="email" 
      type="email"
      v-model.trim="email"/>

      <input class="form-control  my-2" 
      placeholder="password" 
      type="password"
      v-model.trim="password"/>

      <button 
      type="submit"
      class="btn btn-primary"
      
        >Confirmar</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  data(){
    return{
      email: 'unofalso@gmail.com',
      password: '123456',
    }
  },
    
    methods: {
      ...mapActions(['ingresoUsuario'])
  }
 }
</script>
