import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo, isSaving, setIsSaving }) {

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
      <button disabled={workingTodoTitle === ""}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
