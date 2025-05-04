import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists for styling
import ContactUs from './ContactUs'; 

const Navbar = () => {
    return (
        <div>ss
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
                {/* <div className='space'></div> */}
                <ul className="navbar-links">
                    {/* <li><Link to="/">Home</Link></li>
<li><Link to={`/bus-stopages`}>Bus Stopages</Link></li> 
<li><Link to="/bus-seat-booking">Seat Booking</Link></li>
<li><Link to="/contact-us">Contact Us</Link></li>
<li><Link to="/feedback">Feedback</Link></li> */}

<li><a href="/">Home</a></li>
<li><a href="/bus-stopages">Bus Stopages</a></li>
<li><a href="/bus-seat-booking">Seat Booking</a></li>
<li><a href="/contact-us">Contact Us</a></li>
<li><a href="/feedback">Feedback</a></li>
                    
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
