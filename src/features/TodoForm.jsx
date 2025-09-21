import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

function TodoForm({ onAddTodo, isSaving, setIsSaving }) {

  const todoTitleInput = useRef(document.querySelector("#todoTitle"));
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("")
    todoTitleInput.current.focus();
  }

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
