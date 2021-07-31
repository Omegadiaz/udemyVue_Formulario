import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: ''
    },
  },
  mutations: {
    cargar(state, payload){
      state.tareas = payload
    },
    set(state, payload){
      state.tareas.push(payload)
      
    },
    async eliminar(state, payload){
      state.tareas = state.tareas.filter(item => item.id != payload)
      
      
    },
    tarea(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      // devuelve la tarea modificada si el id coincide, si no, devuelve la tarea original
      router.push('/')
    }
  },
  actions: {
    async cargarLocalStorage({ commit }){
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas.json`)
        const dataDB = await res.json()
        const arrayTareas = Object.values(dataDB)
        commit('cargar', arrayTareas)
      } catch (error) {
        console.log(error)
      }
      
    },
    async setTareas({ commit }, tarea){
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    deleteTareas({ commit }, id){
      try {
        fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${payload}.json`, {
          method: 'DELETE'
        })
      }catch (error){
        console.log(error)
      }
      commit('eliminar', id)
    },
    setTarea({ commit }, id){
      commit('tarea', id)
    },
    async updateTarea({ commit }, tarea){
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          }          
        })
      }catch (error){
        console.log(error)
      }
      commit('update', tarea)
    }
  },
  modules: {
  }
})
