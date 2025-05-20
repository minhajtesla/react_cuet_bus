import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentProfilePage.css';

function StudentProfilePage() {
    const [studentData, setStudentData] = useState(null);
    const navigate = useNavigate();



    
    useEffect(() => {
        const storedData = localStorage.getItem('studentData');
        if (storedData) {
            setStudentData(JSON.parse(storedData));
        } else {
            navigate('/'); // Redirect to home or login if no data is found
        }
    }, [navigate]);

    if (!studentData) {
        return (
            <p style={{ textAlign: 'center', color: 'white' }}>
                No profile data available. Please log in.
            </p>
        );
    }

    return (
        <div className="student-profile-page">
            <p
                style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '60px',
                    color: 'white',
                }}
            >
                Student Profile
            </p>
            <div className="profile-container">
                <div className="profile-detailss">
                    <p>
                        <strong>Student ID:</strong> {studentData.studentId}
                    </p>
                    <p>
                        <strong>Name:</strong> {studentData.name}
                    </p>
                    <p>
                        <strong>Department:</strong> {studentData.department}
                    </p>
                    <p>
                        <strong>Batch:</strong> {studentData.batch}
                    </p>
                    <p>
                        <strong>Gender:</strong> {studentData.gender}
                    </p>
                    <p>
                        <strong>Contact No:</strong> {studentData.contactNo}
                    </p>
                    <p>
                        <strong>Email:</strong> {studentData.email}
                    </p>
                </div>
                <div className="profile-actions">
                    <Link to="/bus-schedule" className="button seat-booking-button">
                        Go to Seat Booking
                    </Link>
                    <Link to="/" className="button back-home-button">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default StudentProfilePage;
