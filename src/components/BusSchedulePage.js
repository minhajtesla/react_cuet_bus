import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BusSchedulePage.css";

function BusSchedulePage() {
    const [buses, setBuses] = useState([]);
    const [busStopages, setBusStopages] = useState({});
    const [selectedBusStop, setSelectedBusStop] = useState("");
    const [isBusStopConfirmed, setIsBusStopConfirmed] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [selectedBusName, setSelectedBusName] = useState("");
    const [message, setMessage] = useState("");
    const [busStops, setBusStops] = useState([]);
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch logged-in student data from localStorage
        const storedData = localStorage.getItem("studentData");
        if (storedData) {
            setStudentData(JSON.parse(storedData));
        }

        // Fetch bus stops and active buses
        axios
            .get("http://localhost:8080/api/busstopages")
            .then((response) => setBusStops(response.data))
            .catch((error) => console.error("Error fetching bus stops:", error));

        axios
            .get("http://localhost:8080/api/buses/active")
            .then((response) => {
                const buses = Array.isArray(response.data) ? response.data : [];
                setBuses(buses);

                // Fetch stopage names for each bus
                buses.forEach(bus => {
                    axios.get(`http://localhost:8080/api/buses/${bus.name}/stopage`)
                        .then(response => {
                            setBusStopages(prevState => ({
                                ...prevState,
                                [bus.name]: response.data
                            }));
                        })
                        .catch(error => console.error(`Error fetching stopage for bus ${bus.name}:`, error));
                });
            })
            .catch((error) => console.error("Error fetching buses:", error));
    }, []);

    const handleBusStopChange = (event) => {
        setSelectedBusStop(event.target.value);
        setIsBusStopConfirmed(false); // Reset confirmation when selection changes
        setSelectedBusName(""); // Reset bus selection when bus stop changes
    };

    const handleBusChange = (event) => {
        setSelectedBusName(event.target.value);
    };

    const handleConfirmBusStop = () => {
        if (!selectedBusStop) {
            alert("Please select a bus stop to confirm!");
            return;
        }
        setIsBusStopConfirmed(true); // Confirm the selection
        alert(`Bus stop '${selectedBusStop}' confirmed. You can now select a bus.`);
    };

    const handleAssignBusStopToStudent = () => {
        if (!selectedBusStop || !isBusStopConfirmed || !studentData) {
            alert("Please confirm the bus stop!");
            return;
        }

        axios
            .put(
                `http://localhost:8080/api/busstopages/assign/${studentData.studentId}`,
                null,
                {
                    params: { stopageName: selectedBusStop },
                }
            )
            .then((response) => {
                alert(
                    `Bus stop '${selectedBusStop}' assigned to '${studentData.name}'.`
                );
            })
            .catch((error) => {
                console.error("Error assigning bus stop:", error);
                alert("Failed to assign the bus stop.");
            });
    };

    const handleAssignBusToStudent = async () => {
        if (!studentData || !selectedBusName) {
            alert("Please select a bus!");
            return;
        }
        if (!isBusStopConfirmed) {
            alert("Please confirm your bus stop first!");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:8080/api/students/assign-bus/${studentData.studentId}`,
                null,
                { params: { busName: selectedBusName } }
            );
            setMessage(response.data);
            alert(`Bus '${selectedBusName}' assigned to '${studentData.name}'.`);
        } catch (error) {
            setMessage(error.response?.data || "Error assigning bus");
            alert("Failed to assign the bus.");
        }
    };

    const handleBusSeatBooking = () => {
        if (!isBusStopConfirmed || !selectedBusName) {
            alert("Please confirm your bus stop and select a bus first!");
            return;
        }
        navigate('/bus-seat-booking');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🚌 Bus Schedule & Seat Booking</h1>
                
                {studentData && (
                    <div style={styles.studentInfo}>
                        <div style={styles.studentCard}>
                            <h3>👤 Student Information</h3>
                            <p><strong>Name:</strong> {studentData.name}</p>
                            <p><strong>ID:</strong> {studentData.studentId}</p>
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.selectionContainer}>
                {/* Step 1: Select Bus Stop */}
                <div style={styles.stepCard}>
                    <div style={styles.stepHeader}>
                        <span style={styles.stepNumber}>1</span>
                        <h3 style={styles.stepTitle}>Select Your Bus Stop</h3>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label htmlFor="bus-stop" style={styles.label}>Choose Bus Stop:</label>
                        <select
                            id="bus-stop"
                            value={selectedBusStop}
                            onChange={handleBusStopChange}
                            style={styles.dropdown}
                        >
                            <option value="">-- Select Bus Stop --</option>
                            {busStops.map((busStop) => (
                                <option key={busStop.stopageName} value={busStop.stopageName}>
                                    {busStop.stopageName}
                                </option>
                            ))}
                        </select>
                        
                        <button
                            style={selectedBusStop ? styles.confirmButton : styles.disabledButton}
                            onClick={handleConfirmBusStop}
                            disabled={!selectedBusStop}
                            onMouseEnter={(e) => {
                                if (!selectedBusStop) return;
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 16px rgba(34, 197, 94, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                if (!selectedBusStop) return;
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
                            }}
                        >
                            {isBusStopConfirmed ? "✓ Confirmed" : "Confirm Bus Stop"}
                        </button>
                    </div>

                    <button
                        style={isBusStopConfirmed ? styles.assignButton : styles.disabledButton}
                        onClick={handleAssignBusStopToStudent}
                        disabled={!isBusStopConfirmed}
                        onMouseEnter={(e) => {
                            if (!isBusStopConfirmed) return;
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 16px rgba(0, 85, 164, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            if (!isBusStopConfirmed) return;
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0, 85, 164, 0.3)";
                        }}
                    >
                        Assign Bus Stop to Student
                    </button>
                </div>

                {/* Step 2: Select Bus (Only available after bus stop is confirmed) */}
                <div style={{...styles.stepCard, opacity: isBusStopConfirmed ? 1 : 0.5}}>
                    <div style={styles.stepHeader}>
                        <span style={styles.stepNumber}>2</span>
                        <h3 style={styles.stepTitle}>Select Your Bus</h3>
                        {!isBusStopConfirmed && <span style={styles.disabledText}>(Complete Step 1 first)</span>}
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label htmlFor="active-buses" style={styles.label}>Choose Bus:</label>
                        <select
                            id="active-buses"
                            value={selectedBusName}
                            onChange={handleBusChange}
                            style={styles.dropdown}
                            disabled={!isBusStopConfirmed}
                        >
                            <option value="">-- Select Bus --</option>
                            {buses.map((bus) => (
                                <option key={bus.name} value={bus.name}>
                                    {bus.name} {bus.femaleOnly ? "(Female Only)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            style={isBusStopConfirmed && selectedBusName ? styles.assignButton : styles.disabledButton}
                            onClick={handleAssignBusToStudent}
                            disabled={!isBusStopConfirmed || !selectedBusName}
                            onMouseEnter={(e) => {
                                if (!isBusStopConfirmed || !selectedBusName) return;
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 16px rgba(0, 85, 164, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                if (!isBusStopConfirmed || !selectedBusName) return;
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(0, 85, 164, 0.3)";
                            }}
                        >
                            Assign Bus to Student
                        </button>
                        
                        <button
                            style={isBusStopConfirmed && selectedBusName ? styles.bookButton : styles.disabledButton}
                            onClick={handleBusSeatBooking}
                            disabled={!isBusStopConfirmed || !selectedBusName}
                            onMouseEnter={(e) => {
                                if (!isBusStopConfirmed || !selectedBusName) return;
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 16px rgba(255, 194, 14, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                if (!isBusStopConfirmed || !selectedBusName) return;
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(255, 194, 14, 0.3)";
                            }}
                        >
                            📍 Book Seat
                        </button>
                    </div>
                </div>
            </div>

            {/* Bus Information Cards */}
            <div style={styles.busListContainer}>
                <h2 style={styles.busListTitle}>🚌 Available Buses</h2>
                <div style={styles.busList}>
                    {buses.map((bus, index) => (
                        <div
                            key={bus.name}
                            style={{
                                ...styles.busCard,
                                backgroundColor: bus.femaleOnly ? "#fce7f3" : "var(--bg-frost)",
                                border: selectedBusName === bus.name ? "3px solid var(--primary-color)" : "1px solid #e5e7eb",
                                transform: selectedBusName === bus.name ? "scale(1.02)" : "scale(1)",
                                animationDelay: `${0.6 + (index * 0.1)}s`
                            }}
                            onMouseEnter={(e) => {
                                if (selectedBusName !== bus.name) {
                                    e.target.style.transform = "translateY(-4px) scale(1.01)";
                                    e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedBusName !== bus.name) {
                                    e.target.style.transform = "translateY(0) scale(1)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                                }
                            }}
                        >
                            <div style={styles.busCardHeader}>
                                <h3 style={styles.busName}>{bus.name}</h3>
                                {bus.femaleOnly && <span style={styles.femaleOnlyBadge}>♀ Female Only</span>}
                            </div>
                            
                            <div style={styles.busStats}>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Occupied:</span>
                                    <span style={styles.statValue}>{bus.occupiedSeats}</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Booked:</span>
                                    <span style={styles.statValue}>{bus.booked}</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Available:</span>
                                    <span style={{...styles.statValue, color: "#52c41a"}}>{bus.totalSeats - bus.occupiedSeats}</span>
                                </div>
                            </div>
                            
                            <div style={styles.busLocation}>
                                <span style={styles.locationLabel}>📍 Current Location:</span>
                                <span style={styles.locationValue}>{busStopages[bus.name] || "Loading..."}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        padding: "var(--gutter)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
    },
    header: {
        textAlign: "center",
        marginBottom: "var(--container-gap)",
        animation: "fadeIn 1s ease-out forwards"
    },
    title: {
        fontSize: "2.5rem",
        color: "var(--text-color)",
        marginBottom: "1.5rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        fontWeight: "700"
    },
    studentInfo: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "var(--container-gap)"
    },
    studentCard: {
        background: "var(--bg-frost)",
        padding: "1.5rem",
        borderRadius: "var(--border-radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "left",
        minWidth: "300px",
        color: "#333",
        animation: "fadeIn 1s ease-out 0.2s forwards",
        opacity: 0
    },
    selectionContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--container-gap)",
        maxWidth: "var(--container-max)",
        margin: "0 auto var(--container-gap) auto"
    },
    stepCard: {
        background: "var(--bg-frost)",
        padding: "2rem",
        borderRadius: "var(--border-radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "var(--transition)",
        color: "#333",
        animation: "fadeIn 1s ease-out forwards",
        opacity: 0
    },
    stepHeader: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1.5rem",
        gap: "1rem"
    },
    stepNumber: {
        width: "40px",
        height: "40px",
        backgroundColor: "var(--primary-color)",
        color: "var(--text-color)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        fontWeight: "bold"
    },
    stepTitle: {
        margin: 0,
        color: "#333",
        fontSize: "1.5rem"
    },
    disabledText: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        fontStyle: "italic"
    },
    inputGroup: {
        marginBottom: "1.5rem"
    },
    label: {
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "600",
        color: "#333",
        fontSize: "1.1rem"
    },
    dropdown: {
        width: "100%",
        padding: "0.75rem 1rem",
        border: "2px solid #e0e0e0",
        borderRadius: "var(--border-radius)",
        fontSize: "1rem",
        marginBottom: "1rem",
        backgroundColor: "white",
        transition: "var(--transition)",
        outline: "none",
        color: "#333"
    },
    confirmButton: {
        background: "#22c55e",
        color: "var(--text-color)",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "var(--border-radius)",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform var(--transition), box-shadow var(--transition)",
        boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
    },
    assignButton: {
        background: "var(--primary-color)",
        color: "var(--text-color)",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "var(--border-radius)",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform var(--transition), box-shadow var(--transition)",
        boxShadow: "0 4px 12px rgba(0, 85, 164, 0.3)",
        marginRight: "1rem"
    },
    bookButton: {
        background: "var(--accent-color)",
        color: "#333",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "var(--border-radius)",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform var(--transition), box-shadow var(--transition)",
        boxShadow: "0 4px 12px rgba(255, 194, 14, 0.3)"
    },
    disabledButton: {
        backgroundColor: "#d1d5db",
        color: "#9ca3af",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "var(--border-radius)",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "not-allowed",
        marginRight: "1rem"
    },
    buttonGroup: {
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap"
    },
    busListContainer: {
        maxWidth: "var(--container-max)",
        margin: "0 auto"
    },
    busListTitle: {
        color: "var(--text-color)",
        textAlign: "center",
        marginBottom: "var(--container-gap)",
        fontSize: "2rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        animation: "fadeIn 1s ease-out 0.4s forwards",
        opacity: 0
    },
    busList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "1.5rem",
        padding: "1rem 0"
    },
    busCard: {
        padding: "1.5rem",
        borderRadius: "var(--border-radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "var(--transition)",
        cursor: "pointer",
        animation: "fadeIn 1s ease-out forwards",
        opacity: 0
    },
    busCardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
    },
    busName: {
        margin: 0,
        color: "#333",
        fontSize: "1.4rem",
        fontWeight: "700"
    },
    femaleOnlyBadge: {
        backgroundColor: "#ec4899",
        color: "var(--text-color)",
        padding: "0.25rem 0.75rem",
        borderRadius: "1rem",
        fontSize: "0.8rem",
        fontWeight: "600"
    },
    busStats: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem"
    },
    statItem: {
        textAlign: "center"
    },
    statLabel: {
        display: "block",
        fontSize: "0.9rem",
        color: "#666",
        marginBottom: "0.25rem"
    },
    statValue: {
        display: "block",
        fontSize: "1.2rem",
        fontWeight: "700",
        color: "var(--primary-color)"
    },
    busLocation: {
        backgroundColor: "rgba(0, 85, 164, 0.1)",
        padding: "0.75rem",
        borderRadius: "var(--border-radius)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    },
    locationLabel: {
        fontWeight: "600",
        color: "#333"
    },
    locationValue: {
        color: "var(--primary-color)",
        fontWeight: "600"
    }
};

export default BusSchedulePage;