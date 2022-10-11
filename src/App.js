import './App.css';
import {useState, useEffect} from 'react';
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import {useDispatch, useSelector} from 'react-redux';
import {addNewTodo, addTodo, fetchTodos} from './store/todoSlice'

function App() {
  const [text, setText] = useState('');
  const {status, error} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  } , [dispatch])

  const addTask = () => {
    if (text.trim() !== '') {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask}/>
      {status === 'loading' && <h2>loading...</h2>}
      {error && <h2>An error occerd: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
