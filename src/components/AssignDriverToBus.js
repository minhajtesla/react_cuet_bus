import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignDriverToBus = () => {
    const [buses, setBuses] = useState([]);             // inactive buses for assignment dropdown
    const [drivers, setDrivers] = useState([]);         // drivers without bus
    const [selectedBus, setSelectedBus] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");
    const [selectedDirection, setSelectedDirection] = useState("");
    const [assignments, setAssignments] = useState([]); // pending assignments
    const [activeBuses, setActiveBuses] = useState([]); // for dashboard
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch active buses for dashboard
    const fetchActiveBuses = () => {
        setLoading(true);
        axios.get("http://localhost:8080/api/buses/active")
            .then((response) => {
                setActiveBuses(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching active buses:", err);
                setError("Failed to fetch active buses. Please try again.");
                setLoading(false);
            });
    };

    // Fetch drivers without a bus
    const fetchDrivers = () => {
        axios.get("http://localhost:8080/api/drivers/drivers-without-bus")
            .then(response => setDrivers(response.data))
            .catch(err => console.error("Error fetching drivers:", err));
    };

    // Fetch inactive buses for assignment dropdown
    const fetchInactiveBuses = () => {
        axios.get("http://localhost:8080/api/buses/inactive")
            .then(response => setBuses(response.data))
            .catch(err => console.error("Error fetching inactive buses:", err));
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchDrivers();
        fetchInactiveBuses();
        fetchActiveBuses();
    }, []);

    // Handle adding one assignment to pending list
    const handleAssign = () => {
        if (selectedBus && selectedDriver && selectedDirection) {
            setAssignments(prev => [
                ...prev,
                {
                    bus: selectedBus,
                    driver: selectedDriver,
                    direction: selectedDirection,
                    status: "ACTIVE"
                }
            ]);
            setSelectedBus("");
            setSelectedDriver("");
            setSelectedDirection("");
        } else {
            alert("Please select bus, driver, and direction.");
        }
    };

    // Submit all pending assignments
    const handleSubmitAssignments = async () => {
        if (!assignments.length) return;
        try {
            // For each assignment: assign driver, set direction, set status
            const promises = assignments.map(assignment => {
                return axios.post(
                    `http://localhost:8080/api/drivers/${encodeURIComponent(assignment.driver)}/assign-to-bus/${encodeURIComponent(assignment.bus)}`
                )
                .then(() => {
                    return axios.put(
                        `http://localhost:8080/api/buses/${encodeURIComponent(assignment.bus)}/direction`,
                        null,
                        { params: { direction: assignment.direction } }
                    );
                })
                .then(() => {
                    return axios.put(
                        `http://localhost:8080/api/buses/${encodeURIComponent(assignment.bus)}/status`,
                        null,
                        { params: { status: assignment.status } }
                    );
                });
            });

            await Promise.all(promises);
            alert("All assignments successful!");
            setAssignments([]);
            // Refresh data
            fetchDrivers();
            fetchInactiveBuses();
            fetchActiveBuses();
        } catch (err) {
            console.error("Error assigning:", err);
            alert("An error occurred during assignment. Check console.");
        }
    };

    // Bulk action: Unassign all drivers, inactivate all active buses, reset seats
    const unassignAndInactivateAll = async () => {
        if (!activeBuses.length) {
            alert("No active buses to process.");
            return;
        }
        try {
            // 1. Unassign all drivers (call once)
            await axios.put("http://localhost:8080/api/drivers/unassign");
            console.log("All drivers unassigned from buses.");

            // 2. Set all active buses to INACTIVE in parallel
            await Promise.all(activeBuses.map(bus =>
                axios.put(
                    `http://localhost:8080/api/buses/${encodeURIComponent(bus.name)}/status`,
                    null,
                    { params: { status: "INACTIVE" } }
                )
            ));
            console.log("All active buses set to INACTIVE.");

            // 3. Reset occupied seats
            await axios.put("http://localhost:8080/api/buses/reset-occupied-seats");
            console.log("All buses' occupied seats reset.");

            alert("Drivers unassigned and buses inactivated (seats reset).");
            // Refresh data
            fetchDrivers();
            fetchInactiveBuses();
            fetchActiveBuses();
        } catch (err) {
            console.error("Error during unassignAndInactivateAll:", err);
            alert("Error during bulk reset. Check console.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Assign Driver to Bus</h1>

            {/* Assignment section */}
            <div style={styles.inputSection}>
                <label style={styles.label}>Select Bus:</label>
                <select
                    style={styles.select}
                    value={selectedBus}
                    onChange={e => setSelectedBus(e.target.value)}
                >
                    <option value="">--Select Bus--</option>
                    {buses.map(bus => (
                        <option key={bus.name} value={bus.name}>{bus.name}</option>
                    ))}
                </select>

                <label style={styles.label}>Select Driver:</label>
                <select
                    style={styles.select}
                    value={selectedDriver}
                    onChange={e => setSelectedDriver(e.target.value)}
                >
                    <option value="">--Select Driver--</option>
                    {drivers.map(driver => (
                        <option key={driver.driverId} value={driver.driverId}>{driver.name}</option>
                    ))}
                </select>

                <label style={styles.label}>Select Direction:</label>
                <select
                    style={styles.select}
                    value={selectedDirection}
                    onChange={e => setSelectedDirection(e.target.value)}
                >
                    <option value="">--Select Direction--</option>
                    <option value="TO_CUET">To CUET</option>
                    <option value="FROM_CUET">From CUET</option>
                </select>

                <button onClick={handleAssign} style={styles.button}>
                    Add to Assignment List
                </button>
            </div>

            {/* Pending assignments */}
            {assignments.length > 0 && (
                <div style={styles.assignmentList}>
                    <h3>Assignments:</h3>
                    <ul>
                        {assignments.map((a, i) => (
                            <li key={i}>
                                Bus: {a.bus}, Driver: {a.driver}, Direction: {a.direction}, Status: {a.status}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmitAssignments} style={styles.confirmButton}>
                        Confirm All Assignments
                    </button>
                </div>
            )}

            <hr style={styles.divider} />

            {/* Dashboard: active buses */}
            <h2 style={styles.subheading}>Active Buses with Drivers (Dashboard)</h2>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={fetchActiveBuses} style={styles.refreshButton}>
                    Refresh
                </button>
                <button
                    onClick={unassignAndInactivateAll}
                    style={{ ...styles.refreshButton, backgroundColor: "#f44336", marginLeft: "10px" }}
                >
                    Unassign Drivers & Inactivate All
                </button>
            </div>

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
                            {activeBuses.map(bus => (
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
