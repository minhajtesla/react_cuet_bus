import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveBusesWithDrivers = () => {
    const [activeBuses, setActiveBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/buses/active")
            .then((response) => {
                setActiveBuses(Array.isArray(response.data) ? response.data : []); // Fallback to empty array
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching active buses with drivers:", error);
                setError("Failed to fetch active buses. Please try again.");
                setLoading(false);
            });
    }, []);

    // Function to make all buses inactive
    const makeAllBusesInactive = () => {
        activeBuses.forEach((bus) => {
            axios
                .put(`http://localhost:8080/api/buses/${bus.name}/status?status=INACTIVE`)
                .then(() => {
                    console.log(`Bus ${bus.name} status updated to INACTIVE.`);
                })
                .catch((error) => {
                    console.error(`Error updating status for bus ${bus.name}:`, error);
                });
        });
            axios.put('http://localhost:8080/api/buses/reset-occupied-seats')
            .then(()=>{
                console.log("All buses' occupied seats have been reset.");
            })
            .catch((error)=>{
                console.error("Error resetting occupied seats:", error);
            });
    };
    
    // Function to make all buses active and unassign drivers
    const makeAllBusesActiveAndUnassignDrivers = () => {
        activeBuses.forEach((bus) => {
            axios
                .put(`http://localhost:8080/api/buses/${bus.name}/status?status=ACTIVE`)
                .then(() => {
                    console.log(`Bus ${bus.name} status updated to ACTIVE.`);
                })
                .catch((error) => {
                    console.error(`Error updating status for bus ${bus.name}:`, error);
                });

                axios
                .put(`http://localhost:8080/api/drivers/unassign`)
                .then(() => {
                    console.log("All drivers have been unassigned from buses.");
                })
                .catch((error) => {
                    console.error("Error unassigning all drivers from buses:", error);
                });
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Active Buses with Drivers</h1>
            {activeBuses.length > 0 ? (
                <>
                    <button
                        onClick={makeAllBusesInactive}
                        style={{ ...styles.inactiveButton, backgroundColor: "#f44336" }}
                    >
                        Make All Buses Inactive
                    </button>
                    <button
                        onClick={makeAllBusesActiveAndUnassignDrivers}
                        style={{ ...styles.inactiveButton, backgroundColor: "#4CAF50" }}
                    >
                        Make All Buses Active & Unassign Drivers
                    </button>
                    <table
                        border="1"
                        cellPadding="10"
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>Driver Name</th>
                                <th>Driver ID</th>
                                <th>Bus Status</th>
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
                </>
            ) : (
                <p>No active buses found.</p>
            )}
        </div>
    );
};

const styles = {
    inactiveButton: {
        padding: "10px 20px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px",
    },
};

export default ActiveBusesWithDrivers;

//dashboard