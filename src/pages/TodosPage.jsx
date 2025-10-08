import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

function TodosPage({
  onAddTodo,
  isSaving,
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <>
      <TodoForm
        onAddTodo={onAddTodo}
        isSaving={isSaving}
      />
      <TodoList
        todoList={todoList}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        isLoading={isLoading}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default TodosPage;
