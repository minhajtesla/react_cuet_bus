import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignDriverToBus = () => {
    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedBus, setSelectedBus] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");
    const [assignments, setAssignments] = useState([]);
    const [activeBuses, setActiveBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrivers();
        fetchInactiveBuses();
        fetchActiveBusesWithDrivers();
    }, []);

    const fetchDrivers = () => {
        axios.get("http://localhost:8080/api/drivers/drivers-without-bus")
            .then(response => setDrivers(response.data))
            .catch(error => console.error("Error fetching drivers:", error));
    };

    const fetchInactiveBuses = () => {
        axios.get("http://localhost:8080/api/buses/inactive")
            .then(response => setBuses(response.data))
            .catch(error => console.error("Error fetching buses:", error));
    };

    const fetchActiveBusesWithDrivers = () => {
        setLoading(true);
        axios.get("http://localhost:8080/api/buses/active")
            .then((response) => {
                setActiveBuses(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching active buses with drivers:", error);
                setError("Failed to fetch active buses. Please try again.");
                setLoading(false);
            });
    };

    const handleAssign = () => {
        if (selectedBus && selectedDriver) {
            setAssignments(prev => [
                ...prev,
                { bus: selectedBus, driver: selectedDriver, status: "ACTIVE" }
            ]);
            setSelectedBus("");
            setSelectedDriver("");
        } else {
            alert("Please select both a bus and a driver.");
        }
    };

    const handleSubmitAssignments = () => {
        const assignmentPromises = assignments.map(assignment => {
            return axios.post(`http://localhost:8080/api/drivers/${assignment.driver}/assign-to-bus/${assignment.bus}`)
                .then(() => {
                    return axios.put(`http://localhost:8080/api/buses/${assignment.bus}/status`, null, {
                        params: { status: assignment.status }
                    });
                });
        });

        Promise.all(assignmentPromises)
            .then(() => {
                alert("All assignments successful!");
                setAssignments([]);
                fetchDrivers();
                fetchInactiveBuses();
                fetchActiveBusesWithDrivers();
            })
            .catch(error => {
                console.error("Error assigning:", error);
                alert("An error occurred during assignment.");
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Assign Driver to Bus</h1>

            <div style={styles.inputSection}>
                <label style={styles.label}>Select Bus: </label>
                <select style={styles.select} value={selectedBus} onChange={e => setSelectedBus(e.target.value)}>
                    <option value="">--Select Bus--</option>
                    {buses.map(bus => (
                        <option key={bus.name} value={bus.name}>{bus.name}</option>
                    ))}
                </select>

                <label style={styles.label}>Select Driver: </label>
                <select style={styles.select} value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)}>
                    <option value="">--Select Driver--</option>
                    {drivers.map(driver => (
                        <option key={driver.driverId} value={driver.driverId}>{driver.name}</option>
                    ))}
                </select>

                <button onClick={handleAssign} style={styles.button}>Add to Assignment List</button>
            </div>

            {assignments.length > 0 && (
                <div style={styles.assignmentList}>
                    <h3>Assignments:</h3>
                    <ul>
                        {assignments.map((a, i) => (
                            <li key={i}>Bus: {a.bus}, Driver: {a.driver}, Status: {a.status}</li>
                        ))}
                    </ul>
                    <button onClick={handleSubmitAssignments} style={styles.confirmButton}>Confirm All Assignments</button>
                </div>
            )}

            <hr style={styles.divider} />

            <h2 style={styles.subheading}>Active Buses with Drivers (Dashboard)</h2>
            <button onClick={fetchActiveBusesWithDrivers} style={styles.refreshButton}>Refresh</button>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                activeBuses.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>Driver Name</th>
                                <th>Driver ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeBuses.map((bus) => (
                                <tr key={bus.name}>
                                    <td>{bus.name}</td>
                                    <td>{bus.driver ? bus.driver.name : "No Driver Assigned"}</td>
                                    <td>{bus.driver ? bus.driver.driverId : "N/A"}</td>
                                    <td>{bus.busStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No active buses found.</p>
                )
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    inputSection: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
    },
    label: {
        fontWeight: "bold",
    },
    select: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#1976D2",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    confirmButton: {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    refreshButton: {
        padding: "6px 14px",
        backgroundColor: "#555",
        color: "white",
        border: "none",
        borderRadius: "4px",
        marginBottom: "10px",
        cursor: "pointer",
    },
    assignmentList: {
        backgroundColor: "#f5f5f5",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    subheading: {
        fontSize: "22px",
        fontWeight: "600",
        marginTop: "30px",
        marginBottom: "10px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
    divider: {
        margin: "30px 0",
    },
};

export default AssignDriverToBus;
