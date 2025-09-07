function TodosViewForm({ sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString }) {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={(event) => preventRefresh(event)}>
      <div>
        <label>Search todos:</label>
        <input type="text" value={queryString} onChange={(e) => {setQueryString(e.target.value)}}></input>
        <button type="button" onClick={() => setQueryString('')}>Clear</button>
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
