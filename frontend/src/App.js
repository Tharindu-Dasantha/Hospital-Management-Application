import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="app-title">Colombo National Hospital - Hospital Management App</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/appointments" end>Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/doctors">Doctors</NavLink>
            </li>
            <li>
              <NavLink to="/patients">Patients</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
