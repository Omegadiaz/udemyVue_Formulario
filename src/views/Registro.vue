<template>
  <h1>Registrar nuevo usuario:</h1>
  <form class="form-group" 
        @submit.prevent="procesarFormulario">
      <input 
      class="form-control  my-2" 
      placeholder="email" 
      type="email"
      v-model.trim="email"/>

      <input class="form-control  my-2" 
      placeholder="password" 
      type="password"
      v-model.trim="password1"/>

      <input class="form-control my-3" 
      placeholder="password" 
      type="password"
      v-model.trim="password2"/>

      <button 
      type="submit"
      class="btn btn-primary"
      :disabled="bloquear"
        >Confirmar</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return{
      email: '',
      password1: '',
      password2: ''
    }
  },
  computed: {
    bloquear(){
      if(!this.email.includes('@')){
        return true
      }
      if(this.password1 === this.password2 && this.password1.length > 5){
        return false
      }      
      return true
    }
    
    },
    methods: {
      ...mapActions(['registrarUsuario']),
      procesarFormulario(){
        this.registrarUsuario({
          email: this.email,
          password: this.password1
          })
          this.email = ''
          this.password1 = ''
          this.password2 = ''
      }      
  }
}
</script>
