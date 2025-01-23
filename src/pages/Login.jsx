// src/Register.js
// src/LoginForm.js
import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider"
function LoginForm() {
   const[authUser,setAuthUser]=useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log('Login Form Submitted:', formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/login`, formData);
    //console.log(response.data);  // Handle success
   // Check the status code for success (HTTP 200 or similar)
   if (response.status === 201) {
    alert('Login successful');
    
    console.log(response);
    setAuthUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    // Optionally reset form data after successful registration
    setFormData({
     
      email: '',
      password: '',
    
    });
  } else{
alert("wrong")
  };
    
  




} catch (error) {
  console.log("err",error);
 alert(error.response.data.msg)
}






  };

  return (
    <div className="form-container1">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-btn">Login</button>
       
      </form>
      
      <span>Already have an account? </span> <Link to="/register">Register</Link>
    </div>
    
  );
}

export default LoginForm;
