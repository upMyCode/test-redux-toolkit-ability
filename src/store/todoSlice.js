import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todo',
  initialState:{
    todos: [],
  },
  reducers: {
    addTodo (state, action) {
      console.log(state);
      console.log(action);

      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      })
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(elem => elem.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggleElem = state.todos.find(elem => elem.id === action.payload.id);
      toggleElem.completed = !toggleElem.completed;
    }
  }
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;