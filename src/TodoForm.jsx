import { useRef } from "react";
import { useState } from "react";

function TodoForm({ onAddTodo }) {

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
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" name="title" onChange={(event) => setWorkingTodoTitle(event.target.value)} ref={todoTitleInput} value={workingTodoTitle}></input>
      <button disabled={workingTodoTitle === ""}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
