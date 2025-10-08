import './App.css';
import TodosPage from './pages/TodosPage';
import Header from './shared/Header';
import About from './pages/About';
import NotFound from './pages/NotFound';
import styles from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useReducer } from 'react';
import { Routes, Route, useLocation} from 'react-router';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);


  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

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

        dispatch({ type: todoActions.loadTodos, records: todosData.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error: error });
      } finally {
        console.log('fetch complete');
      }
    };
    console.log('useEffect has run');
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setHeaderTitle('Todo List');
        break;
      case '/about':
        setHeaderTitle('About');
        break;
      default:
        setHeaderTitle('Not Found');
    }
  }, [location, setHeaderTitle]);

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
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);

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
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

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
      <Header title={headerTitle} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              onAddTodo={addTodo}
              isSaving={todoState.isSaving}
              todoList={todoState.todoList}
              onCompleteTodo={completeTodo}
              onUpdateTodo={updateTodo}
              isLoading={todoState.isLoading}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortField={sortField}
              setSortField={setSortField}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          }
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/*"
          element={<NotFound />}
        />
      </Routes>
      {todoState.errorMessage && (
        <div className={styles.error}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={dispatch({ type: actions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
