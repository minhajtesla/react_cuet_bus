// import React, { useState } from 'react';
// import './StudentRegisterPage.css';
// import { useNavigate } from 'react-router-dom';

// function DriverRegistrationPanel({ onClose }) 
//     {
//     const navigate = useNavigate();
//     const [driver, setDriver] = useState({
//         driverId: '',
//         name: '',
//         contactNo: '',
//         email: '',
//         password: '',
//     })
//     const [isHuman, setIsHuman] = useState(false); // State for checkbox

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setDriver({...driver,
//             [name]: value,
//         });
//     };

//     const handleCheckboxChange = () => {
//         setIsHuman(!isHuman); // Toggle
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!isHuman) {
//             alert("Please confirm that you are not a robot.");
//             return;
//         }

//         const driverData = {
//             driverId: driver.driverId,
//             name: driver.name,
//             contactNo: driver.contactNo,
//             email: driver.email,
//             password: driver.password,
//         };

//         console.log("Registering driver:", driverData); // Log data to console

//         try {
//             const response = await fetch("http://localhost:8080/api/drivers/register", {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(driverData),
//             });

//             if (response.ok) {
//                 alert("Driver registered successfully!");
//                 navigate('/driver-login'); // Redirect to login page
//             } else {
//                 alert("Registration failed. Please try again.");
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             alert("An error occurred. Please try again later.");
//         }
//     };

//     return (