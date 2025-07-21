import React from 'react';
import './BusSchedule.css';

const BusSchedule = () => {
  const handlePrint = () => {
    window.print();
  };

  const scheduleData = [
    {
      day: "Day 1",
      date: "12/12/2024",
      dayName: "Thursday",
      vehicles: [
        {
          type: "Bus",
          cityToCampus: {
            times: ["7:30 AM", "7:35 AM", "7:35 AM", "7:45 AM", "7:50 AM", "7:50 AM", "8:00 AM", "8:10 AM", "8:40 AM"],
            stops: [
              "Old Rail Station (Starting Point)",
              "Tigerpass",
              "Lalkhan Bazar GEC Circle 2 No. Gate",
              "Muradpur",
              "Bahaddarhat Moar Kaptai Rastar Matha",
              "CUET Campus (Ending Point)"
            ]
          },
          campusToCity: "Departure at 5:45 PM from CUET Campus, final stop at Old Rail Station.",
          contacts: [
            { name: "Mr. Jushan Abdullah", phone: "01722072079" },
            { name: "Mr. Md Rakibul Hoque", phone: "01891648452" }
          ]
        }
      ]
    },
    {
      day: "Day 2",
      date: "13/12/2024",
      dayName: "Friday",
      vehicles: [
        {
          type: "Bus",
          cityToCampus: {
            times: ["7:30 AM", "7:35 AM", "7:35 AM", "7:45 AM", "7:50 AM", "7:50 AM", "8:00 AM", "8:10 AM", "8:40 AM"],
            stops: [
              "Old Rail Station",
              "Tigerpass",
              "Lalkhan Bazar GEC Circle 2 No. Gate",
              "Muradpur",
              "Bahaddarhat Moar Kaptai Rastar Matha",
              "CUET Campus"
            ]
          },
          campusToCity: "Departure after dinner from CUET Campus, final stop at Old Rail Station.",
          contacts: [
            { name: "Mr. Jushan Abdullah", phone: "01722072079" }
          ]
        },
        {
          type: "Mini Bus",
          cityToCampus: {
            times: ["8:00 AM", "8:05 AM", "8:05 AM", "8:15 AM", "8:20 AM", "8:20 AM", "8:30 AM", "8:40 AM", "9:10 AM"],
            stops: [
              "Old Rail Station",
              "Tigerpass",
              "Lalkhan Bazar GEC Circle 2 No. Gate",
              "Muradpur",
              "Bahaddarhat Moar Kaptai Rastar Matha",
              "CUET Campus"
            ]
          },
          campusToCity: "Departure after dinner from CUET Campus, final stop at Old Rail Station.",
          contacts: [
            { name: "Mr. Md Rakibul Hoque", phone: "01891648452" },
            { name: "Mr. Debajit Das Gupta", phone: "01714471560" }
          ]
        }
      ]
    }
  ];

  const emergencyContact = { name: "Mr. Zubair", phone: "01628313327" };

  return (
    <div className="bus-schedule-container">
      <div className="schedule-header">
        <h1>CUET Transport Schedule</h1>
        <div className="header-actions">
          <button className="print-btn" onClick={handlePrint}>
            🖨️ Print Schedule
          </button>
        </div>
      </div>

      <div className="schedule-content">
        {scheduleData.map((daySchedule, dayIndex) => (
          <div key={dayIndex} className="day-schedule">
            <div className="day-header">
              <h2>{daySchedule.day}: {daySchedule.date}, {daySchedule.dayName}</h2>
            </div>

            {daySchedule.vehicles.map((vehicle, vehicleIndex) => (
              <div key={vehicleIndex} className="vehicle-schedule">
                <h3 className="vehicle-type">
                  {vehicle.type} - Chattogram City to CUET Campus
                </h3>

                {/* City to Campus Schedule Table */}
                <div className="schedule-table-container">
                  <h4>Time (City to Campus)</h4>
                  <div className="schedule-table">
                    <div className="table-header">
                      <div className="header-cell">Stop Point</div>
                      <div className="header-cell">Time</div>
                    </div>
                    {vehicle.cityToCampus.stops.map((stop, stopIndex) => (
                      <div key={stopIndex} className="table-row">
                        <div className="cell stop-name">{stop}</div>
                        <div className="cell time">
                          {vehicle.cityToCampus.times[stopIndex] || "---"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campus to City Info */}
                <div className="return-info">
                  <h4>CUET Campus to Chattogram City</h4>
                  <p>{vehicle.campusToCity}</p>
                </div>

                {/* Contact Information */}
                <div className="contact-info">
                  <h4>Contact Persons:</h4>
                  <div className="contacts-list">
                    {vehicle.contacts.map((contact, contactIndex) => (
                      <span key={contactIndex} className="contact-item">
                        {contact.name}: {contact.phone}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="schedule-note">
                  <p><strong>Note:</strong> The times listed above are the last departure times from each stop for the City to Campus route.</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Emergency Contact */}
        <div className="emergency-contact">
          <h3>🚨 Emergency Contact</h3>
          <p>{emergencyContact.name}: {emergencyContact.phone}</p>
        </div>

        {/* Additional Information */}
        <div className="additional-info">
          <h3>Important Information</h3>
          <ul>
            <li>Please arrive at your stop 5 minutes before the scheduled departure time</li>
            <li>Schedule may vary during holidays and special occasions</li>
            <li>For any schedule changes or updates, contact the respective contact persons</li>
            <li>Students are advised to carry their ID cards while traveling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusSchedule;