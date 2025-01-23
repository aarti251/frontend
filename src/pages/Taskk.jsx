import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Taskk() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImage, setTaskImage] = useState(null);

  // Fetch tasks from the server
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tasks')
  
      .then((response) => setTasks(response.data)
      
    )
     
      .catch((error) => console.log(error));
  }, []);

  // Handle image file change
  const handleImageChange = (e) => {
    setTaskImage(e.target.files[0]); // Save the first image from the file input
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    const formData = new FormData();
    formData.append('name', taskName);
    formData.append('description', taskDescription);
    formData.append('image', taskImage);

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTasks([...tasks, response.data]);
      setTaskName('');
      setTaskDescription('');
      setTaskImage(null);
      alert('Task created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating task');
    }
  };

  // Handle task status change (drag-and-drop functionality)
  const handleDrop = (taskId, newStatus) => {
    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus })
      .then((response) => {
        setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
      })
      .catch((error) => console.log(error));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/tasks/${taskId}`)
        .then(() => {
          setTasks(tasks.filter((task) => task._id !== taskId));
        })
        .catch((error) => console.log(error));
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
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-columns">
        {/* Pending Tasks Column */}
        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Pending')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Pending</h3>
          {tasks
            .filter((task) => task.status === 'Pending')
            .map((task) => (
              <div
                key={task._id}
                className="task"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
              >
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                {task.imageUrl && <img src={task.imageUrl} alt="Task" />}
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            ))}
        </div>

        {/* Completed Tasks Column */}
        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Completed')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Completed</h3>
          {tasks
            .filter((task) => task.status === 'Completed')
            .map((task) => (
              <div
                key={task._id}
                className="task"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
              >
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                {task.imageUrl && <img src={task.imageUrl} alt="Task" />}
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            ))}
        </div>

        {/* Done Tasks Column */}
        <div
          className="column"
          onDrop={(e) => handleDrop(e.dataTransfer.getData('taskId'), 'Done')}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Done</h3>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div
                key={task._id}
                className="task"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
              >
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                {task.imageUrl && <img src={task.imageUrl} alt="Task" />}
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Taskk;
