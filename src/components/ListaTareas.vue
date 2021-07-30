<template>
  <table class="table mt-5" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Categorias</th>
      <th scope="col">Estado</th>
      <th scope="col">Numero</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="tarea in tareas" :key="tarea.id">
      <th scope="row">{{tarea.id}}</th>
      <td>{{tarea.nombre}}</td>
      <td>
         {{tarea.categorias.join(', ')}}
              
      </td>
      <td>{{tarea.estado}}</td>
      <td>{{tarea.numero}}</td>
      <td>
          <button class="btn btn-danger btn-sm btn-block" @click="deleteTareas(tarea.id)">Eliminar</button>
          <router-link 
          class="btn btn-warning btn-sm btn-block"
          :to="{
              name: 'Editar',
              params: {
                  
                  id: tarea.id
                }
              }"
            >Editar
              </router-link>
      </td>
    </tr>
    
  </tbody>
</table>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    computed: {
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTareas'])
    }
}
</script>