import { useState } from 'react';
import {BrowserRouter, Route, Routes,Navigate}from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';


import Tasko from './pages/Tasko';
import { useAuth } from '../src/AuthProvider';
function App() {
  const[authUser,setAuthUser]=useAuth()

  return (
    <>
   
     <BrowserRouter>
     <Navbar/>
     <Routes>
    
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/service" element={<Service/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     
      <Route path="/tasko" element={authUser ?<Tasko/>:<Navigate to="/login"/>}/>
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
