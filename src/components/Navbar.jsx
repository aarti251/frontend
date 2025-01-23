// src/Navbar.js

// src/Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink from react-router-dom
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">MySite</div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink  to="/">Home</NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/service" >Services</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tasko" >Task</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
