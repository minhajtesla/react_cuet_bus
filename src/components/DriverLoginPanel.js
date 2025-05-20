import React, {useState} from 'react';
import './StudentLoginPanel.css';
import { useNavigate } from 'react-router-dom';

function DriverLoginPanel({ onClose, onRegisterClick }) {

    const navigate = useNavigate();
    const [driverId,setdriverId]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/api/drivers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ driverId, password }),
        });

        if (response.ok) {
            const driverData = await response.json();
            localStorage.setItem('driverData', JSON.stringify(driverData));
            window.location.href = '/driver-profile'; // use navigate only if you're using routing
            navigate('/driver-profile');
        } else {
            setError("Invalid Driver ID or Password");
        }
    } catch (error) {
        console.error('Login error:', error);
        setError("Unable to log in. Please try again later.");
    }
};

return (
    <div className="login-overlay">
        <div className='login-modal'>
            <h3>driver login</h3>
            <form onSubmit={handleLogin}>
                <input type="text"
                placeholder="Driver Id"
                value={driverId}
                onChange={(e)=> setdriverId(e.target.value)}
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
           
<button onClick={onRegisterClick}>Register Here</button>

                <button className="close-button" onClick={onClose}>Close</button>
        </div>
    </div>
);


}

export default DriverLoginPanel;