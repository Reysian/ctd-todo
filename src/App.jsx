import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    let searchQuery = "";
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`)
  }, [sortField, sortDirection, queryString])

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const todosData = await resp.json();

        //To be moved to reducer under loadTodos
        dispatch({ type: todoActions.loadTodos, records: todosData.records});
        //End of loadTodos
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error: error});
      } finally {
        console.log('fetch complete');
      }
    };
    console.log('useEffect has run');
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const addTodo = async (title) => {
    const newTodo = { id: Date.now(), title, isCompleted: false };
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      
      dispatch({ type: todoActions.addTodo, records: records });
      
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    dispatch({ type: todoActions.completeTodo, id: id });

    const payload = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActions.setLoadError, error: error });
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }

  };

  const updateTodo = async (editedTodo) => {

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    dispatch({ type: todoActions.updateTodo, editedTodo: editedTodo });
    
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActions.setLoadError, error: error });
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.appBody}>
      <h1 className={styles.header}>To-do list</h1>
      <TodoForm
        onAddTodo={todoState.addTodo}
        isSaving={todoState.isSaving}
        setIsSaving={todoState.isSaving}
      />
      <TodoList
        todoList={todoList}
        onCompleteTodo={todoState.completeTodo}
        onUpdateTodo={todoState.updateTodo}
        isLoading={todoState.isLoading}
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
      {errorMessage && (
        <div className={styles.error}>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={dispatch({ type: actions.clearError })}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
