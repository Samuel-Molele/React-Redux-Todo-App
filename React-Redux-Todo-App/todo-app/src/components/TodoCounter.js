import React from 'react';
import { useSelector } from 'react-redux';


function TodoCounter() {
  const todoCount = useSelector(state => state.todos.list.length);  // Get the number of todos from the Redux state
  
  return (
    <div className="todo-counter badge bg-primary">
      Total Todos: {todoCount}
    </div>
  );
}

export default TodoCounter;
