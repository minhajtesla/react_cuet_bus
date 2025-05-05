import React, {useState} from 'react';
import './DriverLoginPanel.css';

function DriverLoginPanel({close})
{
    const [driverId,setdriverId]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
    <div className="driver-login-overlay">
        <div className='driver-login-modal'>
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
            <p>New Student?</p>
                <button onClick={() => window.location.href = '/student-register'}>Register Here</button>
                <button className="close-button" onClick={onClose}>Close</button>
        </div>
    </div>
);


}

export default 