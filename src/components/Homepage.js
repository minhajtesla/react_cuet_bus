import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './Homepage.css';
import Feedback from '../components/Feedback';
import StudentLoginPanel from '../components/StudentLoginPanel';
import AdminLoginPanel from '../components/AdminLoginPanel';
import StudentRegistrationPanel from './StudentRegistrationPanel';
import DriverLoginPanel from '../components/DriverLoginPanel';
import DriverRegistrationPanel from './DriverRegistrationPanel'; // Make sure this import is correct

const busStations = [
  { id: 1, name: 'CUET Main Gate', position: { lat: 22.4619433, lng: 91.9710592 }, image: '/images/stations/cuet-main.jpg' },
  { id: 2, name: 'Reservoir Stop', position: { lat: 22.4605, lng: 91.9687 }, image: '/images/stations/reservoir.jpg' },
  { id: 3, name: 'Faculty Dorms', position: { lat: 22.4592, lng: 91.9701 }, image: '/images/stations/dorms.jpg' },
  { id: 4, name: 'Library Roundabout', position: { lat: 22.4623, lng: 91.9690 }, image: '/images/stations/library.jpg' },
];

const mapContainerStyle = { width: '100%', height: '400px' };

export default function Homepage() {
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [selectedStation, setSelectedStation] = useState(busStations[0]);
  const onStationChange = useCallback(e => {
    const station = busStations.find(s => s.id === parseInt(e.target.value));
    setSelectedStation(station);
  }, []);

  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const navigate = useNavigate();
  
  if (loadError) return <div className="map-loading">Error loading map</div>;
  if (!isLoaded) return <div className="map-loading">Loading map...</div>;

  const features = [
    { title: 'Our Mission', desc: 'Learn about our vision and roadmap.', link: '/mission' },
    { title: 'Bus Fleet', desc: 'Explore our latest models and specs.', link: '/buses' },
    { title: 'Notices', desc: 'Stay updated with the latest announcements.', link: '/notice' },
  ];

  const handleRegisterClick = () => {
    // This explicitly changes the panel from login to register
    setShowLoginPanel('register');
  };

  return (
    <main className="homepage">
      {/* Hero Carousel */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content fade-in">
          <h1>Welcome to CUET Transport</h1>
          <p>Reliable schedules and seat booking, right at your fingertips.</p>
          <Link to="/bus-stopages">
            <button className="button">Explore Stopages</button>
          </Link>
        </div>
      </section>

      {/* Login / Register Toggle Button */}
      <div className="login-toggle">
        <section className="login-toggle-section fade-in">
          <button className="button" onClick={() => setShowLoginPanel(true)}>
            Login / Register
          </button>
        </section>
      </div> 

      {/* Identity Selection Modal */}
      {showLoginPanel === true && (
        <div className="identity-panel-overlay">
          <div className="identity-panel card">
            <h2>Choose Your Identity</h2>
            <button className="identity-button" onClick={() => setShowLoginPanel('student')}>Student</button>
            <button className="identity-button" onClick={() => setShowLoginPanel('admin')}>Bus Admin</button>
            <button className="identity-button" onClick={() => setShowLoginPanel('driver')}>Bus Staff</button>
            <button className="close-button" onClick={() => setShowLoginPanel(false)}>Close</button>
          </div>
        </div>
      )}
      
      {/* Student Login Panel */}
      {showLoginPanel === 'student' && (
        <StudentLoginPanel
          onClose={() => setShowLoginPanel(false)}
          onRegisterClick={handleRegisterClick} 
        />
      )}

      {/* Admin Login Panel */}
      {showLoginPanel === 'admin' && (
        <AdminLoginPanel onClose={() => setShowLoginPanel(false)} />
      )}

      {/* Driver Login Panel */}
      {showLoginPanel === 'driver' && (
        <DriverLoginPanel onClose={() => setShowLoginPanel(false)} />
      )}

      {/* Student Registration Panel */}
      {showLoginPanel === 'register' && (
        <StudentRegistrationPanel onClose={() => setShowLoginPanel(false)} />
      )}

     {/* Driver Login Panel */}
{showLoginPanel === 'driver' && (
  <DriverLoginPanel
    onClose={() => setShowLoginPanel(false)}
    onRegisterClick={() => setShowLoginPanel('driver-register')}
  />
)}

{/* Driver Registration Panel */}
{showLoginPanel === 'driver-register' && (
  <DriverRegistrationPanel onClose={() => setShowLoginPanel(false)} />
)}


      {/* Feature Grid */}
      <section className="features container fade-in">
        {features.map((f) => (
          <Link to={f.link} key={f.title} className="card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Link>
        ))}
      </section>

      {/* Map Section */}
      <section className="homepage-map card fade-in">
        <h2>Select a Bus Station</h2>
        <select className="station-dropdown" onChange={onStationChange} value={selectedStation.id}>
          {busStations.map(station => (
            <option key={station.id} value={station.id}>{station.name}</option>
          ))}
        </select>
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedStation.position}
            zoom={16}
          >
            <Marker position={selectedStation.position} />
          </GoogleMap>
        </div>
        <div className="station-info">
          <h3>{selectedStation.name}</h3>
          <img src={selectedStation.image} alt={selectedStation.name} className="station-image" />
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section container fade-in">
        <Feedback />
      </section>

      {/* About & Contact */}
      <section className="info container fade-in">
        <div className="about">
          <h2>About CUET</h2>
          <p>
            CUET is a premier institution dedicated to engineering excellence,
            fostering innovation and community engagement.
          </p>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <p>Email: info@cuet.ac.bd</p>
          <p>Phone: +880 31 710236</p>
        </div>
      </section>
    </main>
  );
}