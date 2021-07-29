<template>
  
  <input type="text" placeholder="Ingresar nombre" class="form-control my-2" v-model.trim="tarea.nombre">
    <div class="form-check form-check-inline">
      <input type="checkbox" id="checkbox1" class="form-check-input" v-model="tarea.categorias" value="javascript">
      <label for="checkbox1" class="form-check-label">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="checkbox" id="checkbox1" class="form-check-input" v-model="tarea.categorias" value="node js">
      <label for="checkbox2" class="form-check-label">Node JS</label>      
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" 
        id="checkbox1" 
        class="form-check-input" 
        value="urgente" 
        v-model="tarea.urgente"
        >
      <label for="checkbox1" class="form-check-label" >Urgente</label>    

      <input type="radio" id="checkbox2" 
        class="form-check-input ml-2" 
        value="relax" 
        v-model="tarea.urgente"
        >
      <label for="checkbox2" class="form-check-label" >Relax</label>   
    </div>
    <div class="mt-2">
      <input 
      type="number"
      class="form-control"
      v-model.number="tarea.numero">
    </div>
    <button 
      class="btn btn-dark mt-2 btn-block" 
      type="submit"
      :disabled="bloquear">Procesar</button>

</template>

<script>
export default {
    props: {
        tarea: Object
    },
     computed: {
    bloquear(){
      if(this.tarea.nombre.trim() === "" | " "){
      return true
    }else{
      return false
     }
    }
  }
}
</script>