import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
// jsonplaceholder is having issue regards post, put, patch & delete method
// https://github.com/typicode/jsonplaceholder/issues/104
Vue.axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
export default new Vuex.Store({
  state: {
    todos: [] as string[]
  },
  getters: {
    getTodos: state => {
      return state.todos
    }
  },
  mutations: {
    fetchTodos (state, todos) {
      state.todos = todos
    },
    addTodo (state, todo) {
      state.todos.unshift(todo)
    },
    putTodo (state, todo) {
      state.todos.splice(
        state.todos.indexOf(todo),
        1,
        todo
      )
    },
    deleteTodo (state, todo) {
      state.todos.splice(
        state.todos.indexOf(todo),
        1
      )
    }
  },
  actions: {
    fetchTodos (state) {
      axios.get('/posts')
        .then(response => {
          state.commit('fetchTodos', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    addTodo (state, todo) {
      state.commit('addTodo', todo)
      // axios.post('/posts', todo)
      //   .then(() => {
      //     state.dispatch('fetchTodos')
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    putTodo (state, todo) {
      // axios.put('/posts/' + todo.id, todo)
      //   .then(() => {
      //     state.dispatch('fetchTodos')
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
      state.commit('putTodo', todo)
    },
    deleteTodo (state, todo) {
      // axios.delete('/posts/' + todo.id)
      //   .then(() => {
      //     state.dispatch('fetchTodos')
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
      state.commit('deleteTodo', todo)
    }
  }
})
