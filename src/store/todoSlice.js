import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodos =  createAsyncThunk(
    'todos/fetchTodos',
    async function(_,{rejectWithValue}) {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

        if (!response.ok) {
          throw new Error('Server error!');
        }

        const data = await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(error.message)
      }

    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectedWithValue, dispatch}) {
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Can\'t delete todo');
        }

        dispatch(removeTodo({id}));

      } catch (e) {
        return rejectedWithValue(e.message)
      }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id, {rejectedWithValue, dispatch, getState}) {
      const todo = getState().todos.todos.find(todo => todo.id === id);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed
          })
        })

        if (!response.ok) {
          throw new Error('Can\'t delete todo');
        }

        dispatch(toggleTodoComplete({id}));

      } catch (e) {
          rejectedWithValue(e.message);
      }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectedWithValue, dispatch}) {
      try {
        const todo = {
          title: text,
          userId: 1,
          complete: false,
        }
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify(todo)
          })

          if (!response.ok) {
            throw new Error('Can\'t add todo');
          }

          const data = await response.json();

          dispatch(addTodo(data))

          console.log(data);
      } catch (e) {
        rejectedWithValue(e.message);
      }
    }
)

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const todoSlice = createSlice({
  name: 'todo',
  initialState:{
    todos: [],
    status: null,
    error: null
  },
  reducers: {
    addTodo (state, action) {
      console.log(state);
      console.log(action);

      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(elem => elem.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggleElem = state.todos.find(elem => elem.id === action.payload.id);
      toggleElem.completed = !toggleElem.completed;
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
    [addNewTodo.rejected]: setError,
  }
})

const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;