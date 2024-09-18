import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo, toggleTodo } from '../Store/todoSlice';
import { Modal, Button, Form } from 'react-bootstrap';

function TodoList() {
  const todos = useSelector(state => state.todos.list);  // Get the to-do list from Redux state
  const dispatch = useDispatch();  // Dispatch function to dispatch actions
  const [newTodo, setNewTodo] = useState('');  // State to manage new to-do input
  const [editModal, setEditModal] = useState({ isOpen: false, id: null, content: '' });  // State to manage edit modal
  const [showInfo, setShowInfo] = useState(false);  // State to manage info modal visibility

  // Function to handle adding a new to-do
  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      alert('Please enter a todo.');
      return;
    }
    dispatch(addTodo(newTodo));
    setNewTodo('');  // Clear the input after adding
  };

  // Function to handle opening the edit modal with the selected to-do's content
  const handleEditTodo = (id, content) => {
    setEditModal({ isOpen: true, id, content });
  };

  // Function to handle saving the edited to-do
  const handleSaveEdit = () => {
    dispatch(editTodo({
      id: editModal.id,
      content: editModal.content
    }));
    setEditModal({
      isOpen: false,
      id: null,
      content: ''
    });
  };

  return (
    <div className="todo-list">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button className="mt-2" variant="primary" onClick={handleAddTodo}>Add Todo</Button>
      </Form.Group>
      {todos.map(todo => (
        <div key={todo.id} className={`todo-item card my-2 ${todo.completed ? 'completed' : ''}`}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <span>{todo.content}</span>
            <div>
              <Button variant="warning" className="mx-1" onClick={() => handleEditTodo(todo.id, todo.content)}>Edit</Button>
              <Button variant="danger" className="mx-1" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>
              <Button variant="success" className="mx-1" onClick={() => dispatch(toggleTodo(todo.id))}>
                {todo.completed ? 'Undo' : 'Complete'}
              </Button>
            </div>
          </div>
        </div>
      ))}
      {editModal.isOpen && (
        <Modal show={editModal.isOpen} onHide={() => setEditModal({ isOpen: false, id: null, content: '' })}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              value={editModal.content}
              onChange={(e) => setEditModal({ ...editModal, content: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditModal({ isOpen: false, id: null, content: '' })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Button className="mt-3" variant="info" onClick={() => setShowInfo(true)}>Info</Button>
      {showInfo && (
        <Modal show={showInfo} onHide={() => setShowInfo(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Here are some instructions on how to use the app: Use the input to add a new todo. You can press Enter or click the Add button to add the todo.
               Click the Edit button to edit a todo. You cannot edit a completed todo. Click the Delete button to remove a todo. 
               Click the Completed button to mark a todo as completed, which will fade it out.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInfo(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default TodoList;
