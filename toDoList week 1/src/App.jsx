import './style.css'
import {useEffect, useState} from 'react'
import {NewTodoForm} from './NewTodoForm'
import { ToDoList } from './TodoList';

function addItem(listElemId, ItemElem){
  e.preventDefault();
  const listElem = document.querySelector(listElemId)
  listElem.append(ItemElem);
}

export default function App() {
  const [todos, setTodos] = useState(()=>{
    const value = localStorage.getItem('ITEMS')
    if(value == null) return []
    return JSON.parse(value)
  })

  useEffect(()=>{
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addTodo(newItem){
    setTodos(currentTodos => {
        return [
          ...currentTodos,
          {id: crypto.randomUUID(), title: newItem, completed: false},
        ]
      })
  }
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return <>
  <NewTodoForm onSubmit={addTodo} />
  <h1>To do List</h1>
  <ToDoList
    todos={todos}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
  />
  </>
}
