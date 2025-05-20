import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Homepage from './components/Homepage';  
import StudentLoginPanel from './components/StudentLoginPanel';
import StudentProfilePage from './components/StudentProfilePage'; 

import Navbar from './components/Navbar';
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
      {/* Add other routes here */}
      </Routes>
      </Router>
      
      </div>
  );
}

export default App;
