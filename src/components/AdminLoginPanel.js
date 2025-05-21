import React, { useState } from 'react';
import './StudentLoginPanel.css';
import { useNavigate } from 'react-router-dom';

function AdminLoginPanel({ onClose }) {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/admins/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId, password }),
            });

            if (response.ok) {
                const adminData = await response.json();
                localStorage.setItem('adminData', JSON.stringify(adminData));
                window.location.href = '/admin-profile'; // use navigate only if you're using routing
                navigate('/admin-profile', { state: { admin: adminData } });
            } else {
                setError("Invalid Admin ID or Password");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError("Unable to log in. Please try again later.");
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <h3>Admin Login</h3>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
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
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
    export default AdminLoginPanel;
