// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  // Create a new task
  const handleAddTask = () => {
    const newTask = { name: taskName, description: taskDescription };
    axios.post('http://localhost:5000/api/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setTaskName('');
        setTaskDescription('');
      })
      .catch(error => console.log(error));
  };

  // Handle task status change (drag-and-drop functionality)
  const handleDrop = (taskId, newStatus) => {
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus })
      .then(response => {
        setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
      })
      .catch(error => console.log(error));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
        .then(() => {
          setTasks(tasks.filter(task => task._id !== taskId));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Task Manager</h1>

        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-columns">
        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Pending')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Pending</h3>
          {tasks.filter(task => task.status === 'Pending').map((task) => (
            <div
              key={task._id}
              className="task"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
            >
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          ))}
        </div>

        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Completed')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Completed</h3>
          {tasks.filter(task => task.status === 'Completed').map((task) => (
            <div
              key={task._id}
              className="task"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
            >
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          ))}
        </div>

        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Done')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Done</h3>
          {tasks.filter(task => task.status === 'Done').map((task) => (
            <div
              key={task._id}
              className="task"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
            >
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;
