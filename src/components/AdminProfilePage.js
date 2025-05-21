import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminProfilePage() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        // state-এ admin না থাকলে localStorage থেকে পড়ে নেবে
        const stateData = location.state?.admin;
        if (stateData) {
            setAdminData(stateData);
        } else {
            const stored = localStorage.getItem('adminData');
            if (stored) setAdminData(JSON.parse(stored));
            else navigate('/');        // লগইন ছাড়া প্রবেশ নিষিদ্ধ
        }
        }, [location.state, navigate]);

    if (!adminData) return null;

    return (
        <div className="admin-profile-page">
            <h3>Admin Profile</h3>
            <div className="profile-container">
                <div className="profile-details">
                    <p><strong>Admin ID:</strong> {adminData.adminId}</p>
                    <p><strong>Name:</strong> {adminData.name}</p>
                    <p><strong>Contact No:</strong> {adminData.contactNo}</p>
                    <p><strong>Email:</strong> {adminData.email}</p>
                    <button
                      className="adminbutton"
                      onClick={() => navigate('/assign-driver-to-bus')}
                    >
                      MANAGE BUS
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AdminProfilePage;