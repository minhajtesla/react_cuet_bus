import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Homepage from './components/Homepage';  

import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Homepage />} /> 
      </Routes>
      </Router>
      
      </div>
  );
}

export default App;
