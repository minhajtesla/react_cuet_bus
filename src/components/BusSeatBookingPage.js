import React, { useState } from "react";
import './BusSeatBookingPage.css';

function BusSeatBookingPage() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Handle seat selection
    const handleSeatClick = (seatIndex) => {
        // Only allow selection of vacant seats
        if (seatIndex >= 10) { // Vacant seats start from index 10
            if (selectedSeats.includes(seatIndex)) {
                // Deselect seat if already selected
                setSelectedSeats(selectedSeats.filter(seat => seat !== seatIndex));
            } else {
                // Select seat if not already selected
                setSelectedSeats([...selectedSeats, seatIndex]);
            }
        }
    };

    // Handle seat confirmation
    const handleConfirmSeats = () => {
        if (selectedSeats.length > 0) {
            setShowConfirmation(true);
            // Auto-hide popup after 3 seconds
            setTimeout(() => {
                setShowConfirmation(false);
            }, 3000);
        }
    };

    // Get seat class based on status
    const getSeatClass = (index) => {
        if (index < 5) return 'occupied';
        if (index < 10) return 'booked';
        if (selectedSeats.includes(index)) return 'selected';
        return 'vacant';
    };

    return (
        <div className="booking-page">
            <div className="main-content">
                <h3 className="booking-window">Booking Window (Bus Name)</h3>
                <p>Time for response ends in: ...</p>

                {/* Seat Layout */}
                <div className="seat-layout">
                    <div className="seat-indicator">
                        <div className="occupied-seat">Occupied</div>
                        <div className="booked-seat">Booked</div>
                        <div className="vacant-seat">Vacant</div>
                        <div className="selected-seat">Selected</div>
                    </div>

                    <div className="seats">
                        {/* Dynamically render seats with different statuses */}
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className={`seat ${getSeatClass(i)}`}
                                onClick={() => handleSeatClick(i)}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Selected seats info */}
                    {selectedSeats.length > 0 && (
                        <div className="selected-seats-info">
                            <p>Selected Seats: {selectedSeats.map(seat => seat + 1).join(', ')}</p>
                            <p>Total Seats: {selectedSeats.length}</p>
                        </div>
                    )}

                    <button
                        className="confirm-button"
                        onClick={handleConfirmSeats}
                        disabled={selectedSeats.length === 0}
                    >
                        Confirm Seats
                    </button>
                </div>

                {/* Confirmation Popup */}
                {showConfirmation && (
                    <div className="confirmation-popup">
                        <div className="popup-content">
                            <h4>Seats Confirmed!</h4>
                            <p>You have successfully confirmed seat numbers: {selectedSeats.map(seat => seat + 1).join(', ')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BusSeatBookingPage;