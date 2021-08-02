<template>
  <div class="navbar navbar-dark bg-dark text-white">
      <router-link to="/" class="navbar-brand">
          Formularios
        </router-link>
                <div class="flex">
                  <router-link 
                            class="btn btn-dark" 
                            to="/login"
                            v-if="!usuarioAutenticado"
                            >Ingresar
                            </router-link>

                            <router-link 
                            class="btn btn-dark" 
                            to="/registro"
                            v-if="!usuarioAutenticado"
                            >Registro
                            </router-link>

                            <button
                            class="btn btn-dark" 
                            v-if="usuarioAutenticado"
                            @click="cerrarSesion"
                            >Cerrar sesión</button>
                  </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
computed: {
  ...mapGetters(['usuarioAutenticado']),
},
methods: {
  ...mapActions(['cerrarSesion'])
}
}
</script>

