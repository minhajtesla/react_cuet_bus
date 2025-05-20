import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './StudentProfilePage.css';

function DriverProfilePage() {
    const { driverId: urlDriverId } = useParams(); // Get the driverId from URL if present
    const navigate = useNavigate();
    const [driverData, setDriverData] = useState(null);
    const [busData, setBusData] = useState(null);
    const [busStops, setBusStops] = useState([]);
    const [selectedStopage, setSelectedStopage] = useState("");
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    // Load driver data from localStorage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('driverData');
        if (storedData) {
            setDriverData(JSON.parse(storedData));
        } else {
            navigate('/'); // Redirect to home if no data is found
        }
    }, [navigate]);

    // Fetch assigned bus for the driver once driverData is loaded
    useEffect(() => {
        const fetchAssignedBus = async () => {
            if (!driverData || !driverData.driverId) return;
            
            try {
                const response = await axios.get(`http://localhost:8080/api/drivers/${driverData.driverId}/assigned-bus`);
                setBusData(response.data);
                setError(null);
            } catch (err) {
                setBusData(null);
                setError("Bus not assigned or not found");
            }
        };

        fetchAssignedBus();
    }, [driverData]);

    // Fetch list of bus stopages
    useEffect(() => {
        const fetchBusStops = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/busstopages");
                setBusStops(response.data);
            } catch (err) {
                console.error("Error fetching bus stops:", err);
            }
        };
        
        fetchBusStops();
    }, []);

    const handleUpdateStopage = async () => {
        if (!selectedStopage) {
            alert("Please select a valid stopage");
            return;
        }

        if (!busData || !busData.name) {
            setError("Bus information not available");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/buses/${busData.name}/updateStopage?stopageName=${selectedStopage}`
            );
            setUpdateSuccess("Stopage updated successfully");
            setError(null);
            
            // Optional: Refresh bus data after update
            const response = await axios.get(`http://localhost:8080/api/drivers/${driverData.driverId}/assigned-bus`);
            setBusData(response.data);
        } catch (err) {
            setUpdateSuccess(null);
            setError("Failed to update stopage");
        }
    };

    // If driver data is not loaded yet, show loading state
    if (!driverData) {
        return (
            <p style={{ textAlign: 'center', color: 'white' }}>
                Loading driver profile data...
            </p>
        );
    }

    return (
        <div className="driver-profile-page">
            <p
                style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '60px',
                    color: 'white',
                }}
            >
                Driver Profile
            </p>
            <div className="profile-container">
                <div className="profile-details">
                    <p>
                        <strong>Driver ID:</strong> {driverData.driverId}
                    </p>
                    <p>
                        <strong>Name:</strong> {driverData.name}
                    </p>
                    <p>
                        <strong>Contact No:</strong> {driverData.contactNo}
                    </p>
                    <p>
                        <strong>License No:</strong> {driverData.licenseNo}
                    </p>
                    <p>
                        <strong>Route ID:</strong> {driverData.routeId}
                    </p>
                    <p>
                        <strong>Assigned Bus:</strong> {busData ? busData.name : (error || "Loading...")}
                    </p>
                    
                    {busData && (
                        <div className="update-stopage-section">
                            <h3>Update Current Location</h3>
                            <div className="select-container">
                                <select
                                    value={selectedStopage}
                                    onChange={(e) => setSelectedStopage(e.target.value)}
                                    className="stopage-select"
                                >
                                    <option value="" disabled>
                                        Select current location
                                    </option>
                                    {busStops.map((stop) => (
                                        <option key={stop.stopageName} value={stop.stopageName}>
                                            {stop.stopageName}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleUpdateStopage} className="update-button">
                                    Update Location
                                </button>
                            </div>
                            {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    )}
                </div>
                <div className="profile-actions">
                    <Link to="/" className="button back-home-button">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DriverProfilePage;