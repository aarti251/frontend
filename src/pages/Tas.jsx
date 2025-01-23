import React, { useState } from 'react';
import axios from 'axios';

function Tas() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImage, setTaskImage] = useState(null);

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
      await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Task created successfully');
      setTaskName('');
      setTaskDescription('');
      setTaskImage(null);
    } catch (error) {
      console.error(error);
      alert('Error creating task');
    }
  };

  return (
    <div>
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
      <input
        type="file"
        onChange={handleImageChange}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Tas;
