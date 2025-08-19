import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, isCompleted: false };
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => (
      todo.id === id ? {...todo, isCompleted: true} : todo
    ));
    setTodoList(updatedTodos);
  }

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => (
      todo.id === editedTodo.id ? {...editedTodo} : todo
    ));
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>To-do list</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  );
}

export default App;
