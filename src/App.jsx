import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  return (
    <div>
      <h1>To-do list</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
