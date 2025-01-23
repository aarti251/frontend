// src/HomePage.js
import React from 'react';
import './Home.css'; // Import the CSS file for the home page

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Website</h1>
        <p>Your one-stop solution for everything</p>
      </header>
      
      <section className="content">
        <h2>What We Offer</h2>
        <p>We provide high-quality services that cater to your needs. Whether you're looking for web development, mobile apps, or IT consulting, we have you covered.</p>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">Contact Us</button>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
