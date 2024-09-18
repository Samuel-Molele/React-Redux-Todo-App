import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/Store';
import TodoList from './components/TodoList';
import TodoCounter from './components/TodoCounter';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App container">
        <header className="my-4">
          <h1 className="text-center">My To-Do App</h1>
          <TodoCounter /> {/* To-do counter component */}
        </header>
        <TodoList /> {/* To-do list component */}
      </div>
    </Provider>
  );
}

export default App;
