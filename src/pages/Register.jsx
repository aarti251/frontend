// src/RegistrationForm.js
import React, { useState } from 'react';
import './Register.css'; // Import the CSS file
import axios from 'axios';
import { useAuth } from "../AuthProvider"
import { Link } from "react-router-dom";
function register() {
  const[authUser,setAuthUser]=useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();


try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/register`, formData);
    //console.log(response.data);  // Handle success
   // Check the status code for success (HTTP 200 or similar)
   if (response.status === 201) {
    alert('Registration successful');
    console.log(response.data);
    setAuthUser(response.data);
    //localStorage.setItem("user", JSON.stringify(response.data.result[0]));
    localStorage.setItem("user", JSON.stringify(response.data));
    // Optionally reset form data after successful registration
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: ''
    });
  } else{
alert("wrong")
  };
    
  




} catch (error) {
  console.log("err",error);
 alert(error.response.data.msg)
}

    
    //console.log('Form Submitted:', formData);
  };

  return (
    <div className="form-container1">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      
          
     <span>Already have an account? </span> <Link to="/login">Login</Link>
    </div>
  );
}

export default register;
