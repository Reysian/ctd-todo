import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const StyledButton = styled.button`
  text-align: center;
  margin: 2px;
  border: 1px solid gray;
  border-radius: 3px;
  &:disabled {
    font-style: italic;
  }
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: lightgreen;
  }
`;

function TodoForm({ onAddTodo, isSaving }) {

  const todoTitleInput = useRef(document.querySelector("#todoTitle"));
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("")
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        elementId={"todoTitle"}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        labelText={"Todo"}
      />
      <StyledButton disabled={workingTodoTitle === ""}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </form>
  );
}

export default TodoForm;
