import { createSlice } from '@reduxjs/toolkit';

// Initial state for the to-do list
const initialTodoState = {
  list: [
    { id: 1, content: "Content1", completed: false },
    { id: 2, content: "Content2", completed: false },
  ]
};

// Create a slice for to-do related actions and state
const todoSlice = createSlice({
  name: 'todos',
  initialState: initialTodoState,
  reducers: {
    // Action to add a new to-do
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),  // Unique ID based on the current timestamp
        content: action.payload,
        completed: false
      };
      state.list.push(newTodo);  // Add the new to-do to the list
    },
    // Action to delete a to-do by its ID
    deleteTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
    // Action to edit a to-do's content
    editTodo: (state, action) => {
      const { id, content } = action.payload;
      const todo = state.list.find(todo => todo.id === id);
      if (todo) {
        todo.content = content;
      }
    },
    // Action to toggle the completed status of a to-do
    toggleTodo: (state, action) => {
      const todo = state.list.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// Export actions and reducer
export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
