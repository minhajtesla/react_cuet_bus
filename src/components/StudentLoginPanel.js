// src/components/StudentLoginPanel.jsx
import React, { useState } from 'react';
import './StudentLoginPanel.css';

function StudentLoginPanel({ onClose }) {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/students/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, password }),
            });

            if (response.ok) {
                const studentData = await response.json();
                localStorage.setItem('studentData', JSON.stringify(studentData));
                window.location.href = '/student-profile'; // use navigate only if you're using routing
            } else {
                setError("Invalid Student ID or Password");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError("Unable to log in. Please try again later.");
        }
    };

    return (
        <div className="student-login-overlay">
            <div className="student-login-modal">
                <h3>Student Login</h3>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>New Student?</p>
                <button onClick={() => window.location.href = '/student-register'}>Register Here</button>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default StudentLoginPanel;
