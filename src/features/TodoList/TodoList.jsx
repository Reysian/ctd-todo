import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => (todo.isCompleted !== true));

  return (

    <ul>
      {isLoading ? (
        <p>Todo List Loading...</p>
      ) : (
        filteredTodoList.length === 0 ? (
        <p>Add a todo above to get started</p>
      ) : filteredTodoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>
      ))
      )}
    </ul>
  );
}

export default TodoList;
