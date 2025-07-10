import './App.css'

function App() {

  const todos = [{id: 1, title: "Make breakfast"}, {id: 2, title: "Do laundry"}, {id: 3, title: "Clean floors"}]

  return (
    <div>
      <h1>To-do list</h1>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
