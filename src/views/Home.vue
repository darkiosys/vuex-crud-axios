<template>
  <div>
    <h1>VUE CRUD TEST</h1>
    <section class="app">
      <header class="header">
          <input class="new" placeholder="What needs to be added?" autofocus @keyup.enter="addTodo()" v-model="todo.title">
      </header>
      <section class="main">
        <ul class="list">
          <li v-for="todo in todos" v-bind:key="todo.id">
            <div class="view">
              <label @dblclick="editTodo(todo, $event)">{{ todo.title }}</label>
              <button class="destroy" @click="deleteTodo(todo)"></button>
            </div>
            <input
                class="edit"
                v-model="todo.title"
                @keyup.enter="putTodo(todo, $event)"
              >
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<style>
.app {
  background: #fff;
  margin: 0px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #111111;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

.app input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.app input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.app input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.list li:last-child {
  border-bottom: none;
}

.list li.editing {
  border-bottom: none;
  padding: 0;
}

.list li.editing .edit {
  display: block;
  width: calc(100%);
  padding: 12px 16px;
}

.list li.editing .view {
  display: none;
}

.list li .toggle {
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.list li .toggle {
  opacity: 0;
}

.list li .toggle + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
}

.list li .toggle:checked + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.list li label {
  word-break: break-all;
  padding: 15px 15px 15px 15px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #4d4d4d;
}

.list li.completed label {
  color: #cdcdcd;
  text-decoration: line-through;
}

.list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.list li .destroy:hover {
  color: #af5b5e;
}

.list li .destroy:after {
  content: '×';
}

.list li:hover .destroy {
  display: block;
}

.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.list li.editing {
  border-bottom: none;
  padding: 0;
}

.list li.editing .edit {
  display: block;
  width: calc(100%);
  padding: 12px 16px;
}

.list li.editing .view {
  display: none;
}

.list li .edit {
  display: none;
}

.list li.editing:last-child {
  margin-bottom: -1px;
}
</style>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      todo: {
        title: '',
        body: '',
        userId: 1
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchTodos')
  },
  methods: {
    addTodo () {
      this.$store.dispatch('addTodo', this.todo)
      this.todo = {
        title: '',
        body: '',
        userId: 1
      }
    },
    editTodo (todo, event) {
      const target = event.target.closest('li')
      const input = target.querySelector('.edit')

      target.classList.toggle('editing')
      input.focus()
      input.select()
    },
    putTodo (todo, event) {
      event.target.closest('li').classList.toggle('editing')
      this.$store.dispatch('putTodo', todo)
    },
    deleteTodo (todo) {
      this.$store.dispatch('deleteTodo', todo)
    }
  },
  computed: {
    todos () {
      return this.$store.getters.getTodos
    }
  }
}
</script>
