import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminProfilePage.css";



function AdminProfilePage() {
    const location = useLocation();
    const adminData = location.state?.admin || {};

    return (
        <div className="admin-profile-page">
            
            <h3>Admin Profile</h3>
            <div className="profile-container">
                <div className="profile-details">
                    <p>
                        <strong>Admin ID:</strong> {adminData.adminId}
                    </p>
                    <p>
                        <strong>Name:</strong> {adminData.name}
                    </p>
                    <p>
                        <strong>Contact No:</strong> {adminData.contactNo}
                    </p>
                    <p>
                        <strong>Email:</strong> {adminData.email}
                    </p>
                    {/* <button>
                        <Link to="/">← Back to Home</Link>
                    </button> */}
                    {/* <button className="adminbutton">
                            <Link to="/admin">MANAGE BUS</Link>
                        </button> */}
                         <button className="adminbutton">
                            <Link to="/assign-driver-to-bus">MANAGE BUS</Link>
                        </button>
                </div>
            </div>
        </div>
    );
}
export default AdminProfilePage;