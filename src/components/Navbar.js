import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists for styling
import ContactUs from './ContactUs';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle feedback click
    const handleFeedbackClick = (e) => {
        e.preventDefault();
        scrollToSection('feedback-section');
    };

    // Function to handle contact us click
    const handleContactUsClick = (e) => {
        e.preventDefault();
        scrollToSection('contact-section');
    };

    // Generic function to scroll to any section
    const scrollToSection = (sectionId) => {
        // If we're already on the homepage, just scroll to the section
        if (location.pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });

                // Add highlight animation
                section.classList.add('highlight-animation');
                setTimeout(() => {
                    section.classList.remove('highlight-animation');
                }, 2000);
            }
        } else {
            // If we're on a different page, navigate to homepage and then scroll
            navigate('/');
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });

                    // Add highlight animation
                    section.classList.add('highlight-animation');
                    setTimeout(() => {
                        section.classList.remove('highlight-animation');
                    }, 2000);
                }
            }, 100); // Small delay to ensure page has loaded
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img
                        src="https://seeklogo.com/images/C/chittagong-university-of-engineering-and-technolog-logo-27727AB3FD-seeklogo.com.png"
                        alt="CUET logo"
                        className="logo"
                    />
                    <div className="header-text">
                        <h1 className="university-name">Chittagong University of Engineering and Technology</h1>
                        <h2 className="app-title">CUET Transport Management App</h2>
                    </div>
                </div>
                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/bus-stopages">Bus Stopages</a></li>
                    <li><a href="/bus-schedule">Bus Schedule</a></li>
                    <li><a href="/bus-seat-booking">Seat Booking</a></li>
                    <li><a href="#" onClick={handleContactUsClick}>Contact Us</a></li>
                    <li><a href="#" onClick={handleFeedbackClick}>Feedback</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;