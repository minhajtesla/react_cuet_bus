import React, { useState } from 'react';
import './StudentRegisterPage.css';
import { useNavigate } from 'react-router-dom';

function DriverRegistrationPanel({ onClose}) 
    {
    const navigate = useNavigate();
    const [driver, setDriver] = useState({
        driverId: '',
        name: '',
        contactNo: '',
        email: '',
        password: '',
    })
    const [isHuman, setIsHuman] = useState(false); // State for checkbox

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDriver({...driver,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setIsHuman(!isHuman); // Toggle
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isHuman) {
            alert("Please confirm that you are not a robot.");
            return;
        }

        const driverData = {
            driverId: driver.driverId,
            name: driver.name,
            contactNo: driver.contactNo,
            email: driver.email,
            password: driver.password,
        };

        console.log("Registering driver:", driverData); // Log data to console

        try {

            const response = await fetch("http://localhost:8080/api/drivers/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(driverData),
            });

            if (response.ok) {
                alert("Driver registered successfully!");
                navigate('/driver-login'); // Redirect to login page
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="register-page">

        <form className="register-form">
            <h3 style={{ color:'white'}}>Driver Registration</h3>
            <input type="text" name="driverId" placeholder="Driver ID" value={driver.driverId} onChange={handleInputChange} required />
            <input type="text" name="name" placeholder="Name" value={driver.name} onChange={handleInputChange} required />
            <input type="text" name="contactNo" placeholder="Contact No" value={driver.contactNo} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={driver.email} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={driver.password} onChange={handleInputChange} required />
            <div className="checkbox-container">
                <input type="checkbox" id="humanCheck" checked={isHuman} onChange={
                    handleCheckboxChange} />
                <label htmlFor="humanCheck">I am not a robot</label>
            </div>
            <button type="submit">Register</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
        </div>
    );
}
export default DriverRegistrationPanel;