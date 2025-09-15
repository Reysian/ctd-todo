import { useEffect } from "react";
import { useState } from "react";

function TodosViewForm({ sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString }) {
  
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    console.log('Local search query string has changed.');
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
      console.log('Setting new search query string...');
    }, 500);
    return () => {
      clearTimeout(debounce);
      console.log('Clear debounce timeout')
    };
  }, [localQueryString, setQueryString]);
  
  const preventRefresh = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={(event) => preventRefresh(event)}>
      <div>
        <label>Search todos:</label>
        <input type="text" value={localQueryString} onChange={(e) => {setLocalQueryString(e.target.value)}}></input>
        <button type="button" onClick={() => setLocalQueryString('')}>Clear</button>
      </div>
      <div>
        <label>Sort by</label>
        <select value={sortField} onChange={(event) => setSortField(event.target.value)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label>Direction</label>
        <select value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}

export default TodosViewForm;
