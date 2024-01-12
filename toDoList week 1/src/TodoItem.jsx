export function ToDoItem( {completed, id, title, toggleTodo, deleteTodo}){
    return (
        <li key={id}>
          <label>
            <input type='checkbox' check={completed}
            onChange={e => toggleTodo(id, e.target.checked)}/>
            {title}
          </label>
          <button className='btn btn-danger' onClick={() => deleteTodo(id)}>Delete</button>
        </li>
    )
}