import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

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

  const StyledButton = styled.button`
    text-align: center;
    margin: 2px;
    border: 1px solid gray;
    border-radius: 3px;
    &:hover {
      background-color: lightblue;
    }
    &:active {
      background-color: lightgreen;
    }
  `;

  const StyledInput = styled.input`
    margin: 2px;
    border: 1px solid gray;
    border-radius: 3px;
  `;

  const StyledSelect = styled.select`
    margin: 4px;
    border: 1px solid gray;
    border-radius: 3px;
  `;

  return (
    <form onSubmit={(event) => preventRefresh(event)}>
      <div>
        <label>Search todos:</label>
        <StyledInput type="text" value={localQueryString} onChange={(e) => {setLocalQueryString(e.target.value)}}></StyledInput>
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>Clear</StyledButton>
      </div>
      <div>
        <label>Sort by</label>
        <StyledSelect value={sortField} onChange={(event) => setSortField(event.target.value)}>
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
        <label>Direction</label>
        <StyledSelect value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </div>
    </form>
  );
}

export default TodosViewForm;
