<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
    <hr>
  </form>
  <p>{{ tarea }}</p>
</template>

<script>
// @ is an alias to /src

import Input from '../components/Input.vue';

export default {
    name: 'Home',
    components: {
    Input
  },
  data(){
    return {
      tarea: {
        nombre: '',
        categorias: [],
        urgente: '',
        numero: ''
      },
      
    }
  },
  methods : {
    procesarFormulario(){      
      if(this.tarea.nombre.trim() === "" | " "){
        console.log('Datos incompletos');
      }else{
        console.log(this.tarea);        
      }
      this.tarea = {
        nombre: '',
        categorias: [],
        urgente: '',
        numero: ''
      }
    }
  },
 }
</script>
