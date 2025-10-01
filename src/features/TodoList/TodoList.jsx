import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const pageOfTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage > totalPages || currentPage < 1) {
        navigate('/');
        console.log("beep");
      }
    }
  }, [currentPage, totalPages, navigate])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams(searchParams.set('page', currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams(searchParams.set('page', currentPage + 1));
    }
  };

  return (
    <>
      <ul className={styles.list}>
        {isLoading ? (
          <p>Todo List Loading...</p>
        ) : pageOfTodos.length === 0 ? (
          <p>Add a todo above to get started</p>
        ) : (
          pageOfTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))
        )}
      </ul>
      <div className='paginationControls'>
        <button disabled={currentPage === 1} onClick={() => handlePreviousPage()}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handleNextPage()}>Next</button>
      </div>
    </>
  );
}

export default TodoList;
