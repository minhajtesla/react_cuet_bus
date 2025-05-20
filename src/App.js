import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Homepage from './components/Homepage';  
import StudentLoginPanel from './components/StudentLoginPanel';
import StudentProfilePage from './components/StudentProfilePage'; 
import DriverLoginPanel from './components/DriverLoginPanel';
import Navbar from './components/Navbar';
import DriverProfilePage from './components/DriverProfilePage';
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
      {/* Add other routes here */}
      </Routes>
      </Router>
      
      </div>
  );
}

export default App;
