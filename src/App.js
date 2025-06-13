import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Homepage from './components/Homepage';  
import StudentLoginPanel from './components/StudentLoginPanel';
import StudentProfilePage from './components/StudentProfilePage'; 
import DriverLoginPanel from './components/DriverLoginPanel';
import Navbar from './components/Navbar';
import DriverProfilePage from './components/DriverProfilePage';
import AdminProfilePage from './components/AdminProfilePage';
import BusSchedulePage from './components/BusSchedulePage';
import AssignDriverToBus from "./components/AssignDriverToBus";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/student-login" element={<StudentLoginPanel />} /> 
      {/* Add other routes here */}
      <Route path="/student-register" element={<StudentLoginPanel />} />
      <Route path="/student-profile" element={<StudentProfilePage />} />
      <Route path="/driver-profile" element={<DriverProfilePage />} />
      <Route path="/admin-profile" element={<AdminProfilePage />} />
      <Route path="/assign-driver" element={<AssignDriverToBus />} />
      <Route path="/bus-schedule" element={<BusSchedulePage />} />
      {/* Add other routes here */}
      </Routes>
      </Router>
      
      </div>
  );
}

export default App;
