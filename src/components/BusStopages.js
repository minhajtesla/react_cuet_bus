import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BusStopages.css';

const busStopages = [
  {
    id: 1,
    name: 'CUET Main Gate',
    location: 'University Main Entrance',
    image: '/images/stations/cuet-main.jpg',
    coordinates: '22.4619°N, 91.9710°E',
    facilities: ['Digital Display', 'Shelter', 'Security', 'WiFi'],
    routes: ['Route A', 'Route B', 'Route C'],
    nextBus: '8 mins',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Reservoir Stop',
    location: 'Near Campus Water Reservoir',
    image: '/images/stations/reservoir.jpg',
    coordinates: '22.4605°N, 91.9687°E',
    facilities: ['Bench Seating', 'Lighting'],
    routes: ['Route A', 'Route C'],
    nextBus: '12 mins',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Faculty Dorms',
    location: 'Faculty Residential Area',
    image: '/images/stations/dorms.jpg',
    coordinates: '22.4592°N, 91.9701°E',
    facilities: ['Covered Waiting', 'Information Board'],
    routes: ['Route B', 'Route C'],
    nextBus: '15 mins',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Library Roundabout',
    location: 'Central Library Area',
    image: '/images/stations/library.jpg',
    coordinates: '22.4623°N, 91.9690°E',
    facilities: ['Digital Display', 'Seating', 'Shade'],
    routes: ['Route A', 'Route B'],
    nextBus: '5 mins',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Engineering Building',
    location: 'Academic Complex',
    image: '/images/stations/engineering.jpg',
    coordinates: '22.4601°N, 91.9675°E',
    facilities: ['WiFi', 'Digital Display', 'Food Court'],
    routes: ['Route A', 'Route B', 'Route C'],
    nextBus: '3 mins',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Student Cafeteria',
    location: 'Main Dining Area',
    image: '/images/stations/cafeteria.jpg',
    coordinates: '22.4615°N, 91.9705°E',
    facilities: ['ATM', 'Restrooms', 'Food Court'],
    routes: ['Route B', 'Route C'],
    nextBus: '7 mins',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Sports Complex',
    location: 'Athletic Facilities',
    image: '/images/stations/sports.jpg',
    coordinates: '22.4580°N, 91.9720°E',
    facilities: ['Lockers', 'Water Station'],
    routes: ['Route A'],
    nextBus: '20 mins',
    status: 'Maintenance'
  },
  {
    id: 8,
    name: 'Research Center',
    location: 'Innovation Hub',
    image: '/images/stations/research.jpg',
    coordinates: '22.4635°N, 91.9665°E',
    facilities: ['Conference Room', 'WiFi', 'Digital Display'],
    routes: ['Route C'],
    nextBus: '10 mins',
    status: 'Active'
  }
];

export default function BusStopages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const navigate = useNavigate();

  const filteredStopages = busStopages.filter(stopage => {
    const matchesSearch = stopage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stopage.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoute = selectedRoute === 'all' || stopage.routes.includes(selectedRoute);
    return matchesSearch && matchesRoute;
  });

  const handleScheduleClick = (stopageId) => {
    navigate(`/bus-schedule/${stopageId}`);
  };

  return (
    <div className="bus-stopages-container">
      {/* Header */}
      <div className="stopages-header">
        <div className="header-content">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Bus Stopages</span>
          </div>
          <h1 className="page-title">Bus Stopages</h1>
          <p className="page-description">
            Explore all CUET campus bus stops with real-time information and schedules
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-container">
          <div className="search-box">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search stopages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-container">
          <select 
            value={selectedRoute} 
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="route-filter"
          >
            <option value="all">All Routes</option>
            <option value="Route A">Route A</option>
            <option value="Route B">Route B</option>
            <option value="Route C">Route C</option>
          </select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{filteredStopages.length}</span>
          <span className="stat-label">Stopages</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredStopages.filter(s => s.status === 'Active').length}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">3</span>
          <span className="stat-label">Routes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">7AM-7PM</span>
          <span className="stat-label">Service Hours</span>
        </div>
      </div>

      {/* Stopages Grid */}
      <div className="stopages-grid">
        {filteredStopages.map(stopage => (
          <div key={stopage.id} className={`stopage-card ${stopage.status.toLowerCase()}`}>
            <div className="card-header">
              <div className="stopage-image">
                <img src={stopage.image} alt={stopage.name} />
                <div className="status-badge">
                  <span className={`status-dot ${stopage.status.toLowerCase()}`}></span>
                  {stopage.status}
                </div>
              </div>
            </div>
            
            <div className="card-content">
              <div className="stopage-info">
                <h3 className="stopage-name">{stopage.name}</h3>
                <p className="stopage-location">
                  <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {stopage.location}
                </p>
                <p className="stopage-coordinates">{stopage.coordinates}</p>
              </div>

              <div className="next-bus-info">
                <span className="next-bus-label">Next Bus</span>
                <span className="next-bus-time">{stopage.nextBus}</span>
              </div>

              <div className="routes-section">
                <span className="routes-label">Routes:</span>
                <div className="route-badges">
                  {stopage.routes.map(route => (
                    <span key={route} className="route-badge">{route}</span>
                  ))}
                </div>
              </div>

              <div className="facilities-section">
                <span className="facilities-label">Facilities:</span>
                <div className="facilities-grid">
                  {stopage.facilities.map(facility => (
                    <span key={facility} className="facility-tag">{facility}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button 
                onClick={() => handleScheduleClick(stopage.id)}
                className="schedule-btn"
                disabled={stopage.status !== 'Active'}
              >
                <svg className="schedule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Schedule
              </button>
              
              <button className="location-btn">
                <svg className="location-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                Map View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStopages.length === 0 && (
        <div className="empty-state">
          <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V9a2 2 0 01-2 2H9a2 2 0 01-2-2V6.306" />
          </svg>
          <h3>No stopages found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}