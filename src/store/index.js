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
    user: null
  },
  mutations: {
    async setUser(state, payload){
      state.user = payload
      router.push('/')
      return
    },
    async cargar(state, payload){
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
    async ingresoUsuario({ commit }, usuario){
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA90aiO0JEaSYB4zQuIWyzs1lAz0TNuhGw`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          console.log(userDB.error)
          return
        }
        commit('setUser', userDB)
        localStorage.setItem('usuario', JSON.stringify(userDB))
        
      } catch (error) {
        console.log(error)
      }
    },
    cerrarSesion({commit}){
      commit('setUser', null)
      localStorage.removeItem('usuario')
      router.push('/login')
    },
    async registrarUsuario({ commit }, usuario){      
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA90aiO0JEaSYB4zQuIWyzs1lAz0TNuhGw`, {
          method: 'POST',
          body: 
            JSON.stringify({
              email: usuario.email,
              password: usuario.password,
              returnSecureToken: true
            })          
        })
        const userDB = await res.json()
        
        if(userDB.error){
          console.log(error)
          return
        }
        commit('setUser', userDB)
        localStorage.setItem('usuario', JSON.stringify(userDB))
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    async cargarLocalStorage({ commit, state }){
      if(localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
        router.push('/')        
      }else{
        console.log('digo que no hay por que soy gilipollas')
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        let arrayTareas = null
        if(dataDB){
          arrayTareas = Object.values(dataDB) 
          commit('cargar', arrayTareas)
          return
        }else{
          arrayTareas = []
        }
        
       
        
      } catch (error) {
        console.log(error)
      }
      
    },
    async setTareas({ commit, state }, tarea){
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit, state }, id){
      try {
        fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
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
    async updateTarea({ commit, state }, tarea){
      try {
        const res = await fetch(`https://udemy-vue-4d53f-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
  getters: {
    usuarioAutenticado(state){
      return !!state.user 
    }
  }
})
