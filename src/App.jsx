import React, { useEffect, useState } from 'react'
import './App.css'
import { todoRepo } from './todoList'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setnewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (todoRepo.length > 0) {
      setTodoList(todoRepo);
    }
  }, []);

  function handleTodoToggle(todoChanged) {
    setTodoList(todoList.map(todo => todo.id === todoChanged.id? {...todo, completed: !todo.completed} : todo));
  }

  const handleTodoDelete = (todo) => {
    const updatedTodoList = todoList.filter(t => t.id !== todo.id)
    setTodoList(updatedTodoList);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo !== ''){
      setTodoList([...todoList, {id: Math.floor(Math.random() * 1000), name: newTodo, completed: false}]);
      setnewTodo('');
    }
  }

  const handleTodoEdit = (todo) => {
    setEditingTodo(todo);
  }

  const handleTodoUpdate = () => {
    if (editingTodo !== '') {
      setTodoList(todoList.map(t => t.id === editingTodo.id? editingTodo : t));
      setEditingTodo('');
    }
  }

  return (
    <>
     <h2>Todo App</h2>
     <ul>
      {todoList.map(todo =>
        <li key={todo.id}>
          <input type='checkbox' checked={todo.completed} onChange={() => handleTodoToggle(todo)}/>
          {editingTodo && editingTodo.id === todo.id? 
            <>
              <input type='text' value={editingTodo.name} onChange={(e) => setEditingTodo({...editingTodo, name: e.target.value})}/>
              <button onClick={handleTodoUpdate}>Update</button>
            </> 
          : 
            <>
              <span className={todo.completed? 'todo-item-completed' : ''}>{todo.name}</span>
              <button onClick={() => handleTodoEdit(todo)}>Edit</button>
            </>}
          <button onClick={() => handleTodoDelete(todo)}>Delete</button>
        </li>
      )}
     </ul>
     <form onSubmit={(e) => handleSubmit(e)}>
      <input type='text' value={newTodo} onChange={(e) => setnewTodo(e.target.value)}/>
      <button type='submit'>Add New</button>
     </form>
    </>
  )
}

export default App;