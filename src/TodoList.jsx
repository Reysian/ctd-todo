function TodoList() {
  const todos = [
    { id: 1, title: 'Make breakfast' },
    { id: 2, title: 'Do laundry' },
    { id: 3, title: 'Clean floors' },
  ];
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
