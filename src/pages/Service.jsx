// src/Services.js
import React from 'react';
import './Service.css'; // Import the CSS file for services

function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'We offer professional web development services including responsive design, CMS integration, and custom web solutions.',
      icon: '🌐',
    },
    {
      title: 'Mobile Apps',
      description: 'Our team develops mobile applications for iOS and Android platforms, offering user-friendly interfaces and seamless functionality.',
      icon: '📱',
    },
    {
      title: 'Digital Marketing',
      description: 'Boost your online presence with our digital marketing services, including SEO, social media management, and content marketing.',
      icon: '📈',
    },
  ];

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
