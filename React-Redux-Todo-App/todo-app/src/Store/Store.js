import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// Configure and export the Redux store
const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

export default store;
