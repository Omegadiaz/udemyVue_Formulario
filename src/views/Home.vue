<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
    <hr>
  </form>
  
  <ListaTareas />
</template>

<script>
// @ is an alias to /src

import Input from '../components/Input.vue';
import { mapActions } from 'vuex';
import ListaTareas from '../components/ListaTareas.vue'
const shortid = require('shortid');

export default {
    name: 'Home',
    components: {
    Input,
    ListaTareas
  },
  data(){
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: ''
      },
      
    }
  },
  methods : {
    ...mapActions(['setTareas']),
    procesarFormulario(){      
      if(this.tarea.nombre.trim() === "" | " "){
        console.log('Datos incompletos');
      }else{
        console.log(this.tarea);        
      }
      ///generar ID ///
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);

      //Se envian los datos
      this.setTareas(this.tarea)

      //set defaults
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: ''
      }
    }
  },
 }
</script>
