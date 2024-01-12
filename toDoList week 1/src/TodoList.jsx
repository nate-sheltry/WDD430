import { ToDoItem } from "./TodoItem"


export function ToDoList({ todos, toggleTodo, deleteTodo}){

    function createListItem(todo){
        return (
          <ToDoItem 
          {...todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          />
        )
    }

    return (
        <ul className='list'>
        {todos.map(todo => (createListItem(todo)))}
        </ul>
    )
}